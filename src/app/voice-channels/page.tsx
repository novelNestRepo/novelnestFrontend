"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/custom/PageTitle";
import { MessagesSquare, Plus, Users, Mic } from "lucide-react";
// import { useVoiceChannels } from "@/lib/hooks/useVoiceChannels";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";

const VoiceChannels = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const { data: channels, isLoading, refetch } = useQuery({
    queryKey: ['voice-channels'],
    queryFn: () => apiClient.getVoiceChannels(),
    enabled: !!user,
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: "", description: "" });
  const [creating, setCreating] = useState(false);

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.name.trim()) return;
    
    setCreating(true);
    try {
      await apiClient.createVoiceChannel(newChannel);
      setNewChannel({ name: "", description: "" });
      setShowCreateForm(false);
      refetch();
    } catch (error) {
      console.error('Failed to create channel:', error);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return null;
  if (isLoading) return <div>Loading channels...</div>;

  return (
    <>
      <PageTitle title="Voice Channels" icon={<MessagesSquare />} />
      
      <div className="mb-4">
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Channel
        </Button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateChannel} className="mb-6 p-4 border rounded-lg">
          <div className="space-y-4">
            <Input
              placeholder="Channel name"
              value={newChannel.name}
              onChange={(e) => setNewChannel(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              placeholder="Description (optional)"
              value={newChannel.description}
              onChange={(e) => setNewChannel(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {channels?.map((channel: any) => (
          <div
            key={channel.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{channel.name}</h3>
                {channel.description && (
                  <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    0 members
                  </span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-4 h-4" />
                    0 in voice
                  </span>
                </div>
              </div>
              <Button>
                <Link href={`/voice-channel/${channel.id}`}>Join Channel</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VoiceChannels;
