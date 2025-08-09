// TODO: Whole page 😅.

"use client";

import { useEffect, useRef, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { io, Socket } from "socket.io-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Smile,
  Edit2,
  Trash2,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Channel, Message } from "@/lib/types";
import PageTitle from "@/components/custom/PageTitle";

export default function Messages() {
  //   const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:4000", {
      auth: {
        token: localStorage.getItem("auth_token"),
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    newSocket.on("message_updated", (message: Message) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? message : m))
      );
    });

    // BACKEND: This change needs to be reflected in the backend too!
    newSocket.on("message_deleted", (messageId: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, deleted: true } : m))
      );
    });

    newSocket.on("typing_start", (userId: string) => {
      setTypingUsers((prev) => new Set([...prev, userId]));
    });

    newSocket.on("typing_stop", (userId: string) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    setSocket(newSocket);

    // Fetch initial data
    fetchChannels();
    fetchMessages();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      fetchMessages();
    }
  }, [selectedChannel]);

  const fetchChannels = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/channels", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch channels");
      const data = await res.json();
      setChannels(data);
      if (data.length > 0) {
        setSelectedChannel(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChannel) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/messages?channel_id=${selectedChannel}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleTyping = () => {
    if (!socket || !selectedChannel) return;

    socket.emit("typing_start", selectedChannel);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", selectedChannel);
    }, 2000);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !socket || !selectedChannel) return;

    try {
      if (editingMessage) {
        socket.emit("edit_message", {
          messageId: editingMessage,
          content: newMessage,
          channelId: selectedChannel,
        });
        setEditingMessage(null);
      } else {
        socket.emit("send_message", {
          content: newMessage,
          channelId: selectedChannel,
        });
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = (messageId: string) => {
    if (!socket || !selectedChannel) return;
    socket.emit("delete_message", {
      messageId,
      channelId: selectedChannel,
    });
  };

  const addReaction = (messageId: string, emoji: string) => {
    if (!socket || !selectedChannel) return;
    socket.emit("add_reaction", {
      messageId,
      emoji,
      channelId: selectedChannel,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Bookmarks" icon={<MessageSquare />} />
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a channel" />
          </SelectTrigger>
          <SelectContent>
            {channels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id}>
                {channel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg shadow-sm border flex flex-col grow">
        <ScrollArea
          className="grow h-full flex items-center justify-center"
          ref={scrollRef}
        >
          {loading ? (
            <div className="flex items-center justify-center mt-4">
              Loading messages...
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender_id === user?.id ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${message.sender.email}`}
                    />
                    <AvatarFallback>
                      {message.sender.user_metadata.name?.[0] ||
                        message.sender.email[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${
                        message.sender_id === user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-medium">
                          {message.sender.user_metadata.name ||
                            message.sender.email}
                        </div>
                        {message.sender_id === user?.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingMessage(message.id);
                                  setNewMessage(message.content);
                                }}
                              >
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                      <div className="text-sm">{message.content}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs opacity-70">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                        {message.updated_at !== message.created_at && (
                          <span className="text-xs opacity-70">(edited)</span>
                        )}
                        {message.sender_id === user?.id && (
                          <Badge variant="outline" className="text-xs">
                            {message.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {Object.entries(message.reactions || {}).length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {Object.entries(message.reactions).map(
                          ([emoji, userIds]) => (
                            <Badge
                              key={emoji}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => addReaction(message.id, emoji)}
                            >
                              {emoji} {userIds.length}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typingUsers.size > 0 && (
                <div className="text-sm text-muted-foreground">
                  {Array.from(typingUsers).join(", ")} typing...
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              {editingMessage ? "Edit" : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
