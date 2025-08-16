"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { useParams, useRouter } from "next/navigation";
import { MessagesSquare, Mic, MicOff, Users } from "lucide-react";
import PageTitle from "@/components/custom/PageTitle";
// import { useVoiceChannel, useVoiceChannelActions } from "@/lib/hooks/useVoiceChannels";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";

const SIGNALING_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:4000";

interface VoiceUser {
  userId: string;
  isMuted: boolean;
}

interface PeerConnection {
  userId: string;
  connection: RTCPeerConnection;
  stream?: MediaStream;
}

const VoiceChannelRoom = () => {
  const params = useParams();
  const channelId = params.id as string;
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data: channel, isLoading } = useQuery({
    queryKey: ['voice-channel', channelId],
    queryFn: () => apiClient.getVoiceChannel(channelId),
    enabled: !!channelId && !!user,
  });
  
  const [isJoining, setIsJoining] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [inVoice, setInVoice] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceUsers, setVoiceUsers] = useState<VoiceUser[]>([]);
  const [connectingVoice, setConnectingVoice] = useState(false);
  
  const socketRef = useRef<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, PeerConnection>>(new Map());
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  
  const [isChannelMember, setIsChannelMember] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      handleLeaveVoice();
    };
  }, []);

  const handleJoinChannel = async () => {
    if (!user || !channelId) return;
    setIsJoining(true);
    try {
      await apiClient.joinVoiceChannel(channelId, user.id);
      setIsChannelMember(true);
    } catch (err: any) {
      setError(err.message || "Failed to join channel");
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveChannel = async () => {
    if (!user || !channelId) return;
    try {
      await apiClient.leaveVoiceChannel(channelId, user.id);
      setIsChannelMember(false);
      handleLeaveVoice();
    } catch (err: any) {
      setError(err.message || "Failed to leave channel");
    }
  };

  const createPeerConnection = (targetUserId: string): RTCPeerConnection => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle remote stream
    peer.ontrack = (event) => {
      const remoteStream = event.streams[0];
      let audioElement = audioElementsRef.current.get(targetUserId);
      
      if (!audioElement) {
        audioElement = new Audio();
        audioElement.autoplay = true;
        audioElementsRef.current.set(targetUserId, audioElement);
      }
      
      audioElement.srcObject = remoteStream;
    };

    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("ice-candidate", {
          channelId,
          targetUserId,
          candidate: event.candidate,
        });
      }
    };

    return peer;
  };

  const handleJoinVoice = async () => {
    if (!user || !channelId) {
      console.log('Missing user or channelId:', { user: !!user, channelId });
      return;
    }
    
    console.log('Attempting to join voice chat...');
    setConnectingVoice(true);
    
    try {
      console.log('Requesting microphone access...');
      // Get user media
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log('Microphone access granted');
      localStreamRef.current = localStream;

      // Connect to signaling server
      const socket = io(SIGNALING_URL, {
        auth: { token: localStorage.getItem("token") },
      });
      socketRef.current = socket;

      // Join channel room
      socket.emit("join-channel", channelId);

      // Socket event handlers
      socket.on("voice-users-updated", (data: { users: VoiceUser[] }) => {
        setVoiceUsers(data.users);
      });

      socket.on("user-joined-voice", async (data: { userId: string }) => {
        if (data.userId !== user.id) {
          // Create peer connection for new user
          const peer = createPeerConnection(data.userId);
          peersRef.current.set(data.userId, { userId: data.userId, connection: peer });
          
          // Create and send offer
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit("offer", { channelId, targetUserId: data.userId, offer });
        }
      });

      socket.on("user-left-voice", (data: { userId: string }) => {
        const peerData = peersRef.current.get(data.userId);
        if (peerData) {
          peerData.connection.close();
          peersRef.current.delete(data.userId);
        }
        
        const audioElement = audioElementsRef.current.get(data.userId);
        if (audioElement) {
          audioElement.srcObject = null;
          audioElementsRef.current.delete(data.userId);
        }
      });

      socket.on("offer", async (data: { fromUserId: string; offer: RTCSessionDescriptionInit }) => {
        const peer = createPeerConnection(data.fromUserId);
        peersRef.current.set(data.fromUserId, { userId: data.fromUserId, connection: peer });
        
        await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        
        socket.emit("answer", { channelId, targetUserId: data.fromUserId, answer });
      });

      socket.on("answer", async (data: { fromUserId: string; answer: RTCSessionDescriptionInit }) => {
        const peerData = peersRef.current.get(data.fromUserId);
        if (peerData) {
          await peerData.connection.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });

      socket.on("ice-candidate", async (data: { fromUserId: string; candidate: RTCIceCandidateInit }) => {
        const peerData = peersRef.current.get(data.fromUserId);
        if (peerData) {
          try {
            await peerData.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
        }
      });

      socket.on("user-mute-changed", (data: { userId: string; isMuted: boolean }) => {
        setVoiceUsers(prev => 
          prev.map(user => 
            user.userId === data.userId 
              ? { ...user, isMuted: data.isMuted }
              : user
          )
        );
      });

      // Announce voice connect
      socket.emit("voice-connect", channelId);
      setInVoice(true);
    } catch (err: any) {
      setError(err.message || "Failed to join voice chat");
    } finally {
      setConnectingVoice(false);
    }
  };

  const handleLeaveVoice = () => {
    setInVoice(false);
    
    if (socketRef.current && channelId) {
      socketRef.current.emit("voice-disconnect", channelId);
      socketRef.current.disconnect();
    }
    
    // Close all peer connections
    peersRef.current.forEach(({ connection }) => {
      connection.close();
    });
    peersRef.current.clear();
    
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    
    // Clean up audio elements
    audioElementsRef.current.forEach((audio) => {
      audio.srcObject = null;
    });
    audioElementsRef.current.clear();
    
    setVoiceUsers([]);
    setIsMuted(false);
  };

  const handleToggleMute = () => {
    if (!localStreamRef.current || !socketRef.current) return;
    
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      const newMutedState = !audioTrack.enabled;
      setIsMuted(newMutedState);
      
      socketRef.current.emit("toggle-mute", {
        channelId,
        isMuted: newMutedState
      });
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!user) return null;
  if (isLoading) return <div>Loading channel...</div>;
  if (!channel) return <div>Channel not found</div>;

  return (
    <>
      <PageTitle title="Voice Channel" icon={<MessagesSquare />} />

      <div className="space-y-6">
        {/* Channel Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{channel.name}</h2>
          {channel.description && (
            <p className="text-gray-600 mt-1">{channel.description}</p>
          )}
          
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {isChannelMember ? '1' : '0'} members
            </span>
            <span className="flex items-center gap-1">
              <Mic className="w-4 h-4" />
              {inVoice ? '1' : '0'} in voice
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Channel Actions */}
        {!isChannelMember ? (
          <Button onClick={handleJoinChannel} disabled={isJoining || !user}>
            {isJoining ? "Joining..." : "Join Channel"}
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Voice Controls */}
            {!inVoice ? (
              <div className="flex gap-2">
                <Button onClick={handleJoinVoice} disabled={connectingVoice}>
                  {connectingVoice ? "Connecting..." : "Join Voice Chat"}
                </Button>
                <Button variant="outline" onClick={handleLeaveChannel}>
                  Leave Channel
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={handleToggleMute}
                    variant={isMuted ? "destructive" : "outline"}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button variant="destructive" onClick={handleLeaveVoice}>
                    Leave Voice Chat
                  </Button>
                  <Button variant="outline" onClick={handleLeaveChannel}>
                    Leave Channel
                  </Button>
                </div>

                {/* Voice Users List */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Voice Participants ({voiceUsers.length})</h3>
                  <div className="space-y-2">
                    {voiceUsers.map((voiceUser) => (
                      <div key={voiceUser.userId} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {voiceUser.isMuted ? (
                            <MicOff className="w-4 h-4 text-red-500" />
                          ) : (
                            <Mic className="w-4 h-4 text-green-500" />
                          )}
                          <span className="text-sm">
                            {voiceUser.userId === user?.id ? "You" : voiceUser.userId}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceChannelRoom;
