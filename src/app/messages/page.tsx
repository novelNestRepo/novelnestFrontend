// TODO: Whole page 😅.

"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
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
import { useChannels, useChannelMessages, useMessages } from "@/lib/hooks/useMessages";

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const { data: channels = [], isLoading: channelsLoading } = useChannels();
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  
  const { data: messages = [], isLoading: messagesLoading } = useChannelMessages(selectedChannel);
  const { sendMessage, editMessage, deleteMessage, addReaction, isSending } = useMessages(selectedChannel);

  // Set first channel as default when channels load
  useEffect(() => {
    if (channels.length > 0 && !selectedChannel) {
      setSelectedChannel(channels[0].id);
    }
  }, [channels, selectedChannel]);

  if (!isAuthenticated) {
    return (
      <>
        <PageTitle title="Messages" icon={<MessageSquare />} />
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Please log in to view messages</div>
        </div>
      </>
    );
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedChannel) return;

    try {
      if (editingMessage) {
        await editMessage({ messageId: editingMessage, content: newMessage });
        setEditingMessage(null);
      } else {
        await sendMessage(newMessage);
      }
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleAddReaction = async (messageId: string, emoji: string) => {
    try {
      await addReaction({ messageId, emoji });
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
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
          {messagesLoading ? (
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
                                onClick={() => handleDeleteMessage(message.id)}
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
                              onClick={() => handleAddReaction(message.id, emoji)}
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
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isSending}
            />
            <Button type="submit" disabled={!newMessage.trim() || isSending}>
              {isSending ? "Sending..." : editingMessage ? "Edit" : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
