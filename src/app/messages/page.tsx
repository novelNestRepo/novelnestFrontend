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

// Mock data for testing
const mockUser = {
  id: "user-1",
  email: "you@example.com",
  user_metadata: { name: "You" },
};

const mockChannels: Channel[] = [
  { id: "channel-1", name: "General", description: "General discussion" },
  { id: "channel-2", name: "Random", description: "Random chat" },
  { id: "channel-3", name: "Tech Talk", description: "Technology discussions" },
];

const mockMessages: Message[] = [
  {
    id: "msg-1",
    content: "Hey everyone! How's it going?",
    sender_id: "user-2",
    created_at: new Date(Date.now() - 300000).toISOString(),
    updated_at: new Date(Date.now() - 300000).toISOString(),
    status: "read",
    reactions: { "👍": ["user-1"], "😄": ["user-3"] },
    sender: {
      email: "alice@example.com",
      user_metadata: { name: "Alice" },
    },
  },
  {
    id: "msg-2",
    content: "Pretty good! Working on some new features.",
    sender_id: "user-1",
    created_at: new Date(Date.now() - 240000).toISOString(),
    updated_at: new Date(Date.now() - 240000).toISOString(),
    status: "read",
    reactions: {},
    sender: mockUser,
  },
  {
    id: "msg-3",
    content: "This message was deleted",
    sender_id: "user-3",
    created_at: new Date(Date.now() - 180000).toISOString(),
    updated_at: new Date(Date.now() - 180000).toISOString(),
    status: "read",
    reactions: {},
    deleted: true,
    sender: {
      email: "bob@example.com",
      user_metadata: { name: "Bob" },
    },
  },
];

export default function Messages() {
  const user = mockUser; // Use mock user instead of useAuth
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [selectedChannel, setSelectedChannel] = useState<string>("channel-1");
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // Mock initialization - no socket needed for testing
    console.log("Mock chat initialized");
    setLoading(false);
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      fetchMessages();
    }
  }, [selectedChannel]);

  // Mock functions - no API calls needed
  const fetchChannels = () => {
    console.log("Mock: Channels already loaded");
  };

  const fetchMessages = () => {
    console.log("Mock: Messages already loaded for channel:", selectedChannel);
    scrollToBottom();
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

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedChannel) return;

    if (editingMessage) {
      // Mock edit message
      setMessages((prev) =>
        prev.map((m) =>
          m.id === editingMessage
            ? {
                ...m,
                content: newMessage,
                updated_at: new Date().toISOString(),
              }
            : m
        )
      );
      setEditingMessage(null);
    } else {
      // Mock send new message
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        content: newMessage,
        sender_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "sent",
        reactions: {},
        sender: user,
      };
      setMessages((prev) => [...prev, newMsg]);
    }
    setNewMessage("");
    scrollToBottom();
  };

  const deleteMessage = (messageId: string) => {
    // Mock delete message
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, deleted: true } : m))
    );
  };

  const addReaction = (messageId: string, emoji: string) => {
    // Mock add reaction
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          const reactions = { ...m.reactions };
          if (reactions[emoji]) {
            if (reactions[emoji].includes(user.id)) {
              reactions[emoji] = reactions[emoji].filter(
                (id) => id !== user.id
              );
              if (reactions[emoji].length === 0) delete reactions[emoji];
            } else {
              reactions[emoji].push(user.id);
            }
          } else {
            reactions[emoji] = [user.id];
          }
          return { ...m, reactions };
        }
        return m;
      })
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Messages" icon={<MessageSquare />} />
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
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
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
                  <div className="flex flex-col gap-1 max-w-[50%]">
                    <div
                      className={`rounded-lg p-2 ${
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
                                className="group"
                              >
                                <Edit2 className="mr-2 h-4 w-4 group-hover:text-background" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteMessage(message.id)}
                                className="group"
                              >
                                <Trash2 className="mr-2 h-4 w-4 group-hover:text-background" />
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
                          <Badge variant="secondary" className="text-xs">
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
