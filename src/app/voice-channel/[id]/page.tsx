"use client";

// import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import { useParams } from "next/navigation";
import { MessagesSquare } from "lucide-react";
import PageTitle from "@/components/custom/PageTitle";

const API_URL = "http://localhost:4000/api/channels";
const SIGNALING_URL = "http://localhost:4000";

// Mock User
const mockUser = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

// Mock useAuth
const useAuth = () => ({
  user: mockUser,
  isLoading: false,
  isAuthenticated: true,
});

// Mock channel data
const mockChannels: Record<string, any> = {
  "1": {
    id: "1",
    name: "General Voice Chat",
    description: "General discussion channel",
    members: [],
    createdAt: new Date().toISOString(),
  },
  "2": {
    id: "2",
    name: "Book Club",
    description: "Discuss your favorite books",
    members: [mockUser.id],
    createdAt: new Date().toISOString(),
  },
};

// Mock fetch function
const fetchMockChannel = async (channelId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  if (mockChannels[channelId]) {
    return mockChannels[channelId];
  }
  throw new Error("Channel not found");
};

// Mock API calls
const mockApi = {
  joinChannel: async (channelId: string, userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (mockChannels[channelId]) {
      if (!mockChannels[channelId].members.includes(userId)) {
        mockChannels[channelId].members.push(userId);
      }
      return { success: true };
    }
    throw new Error("Failed to join channel");
  },

  leaveChannel: async (channelId: string, userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (mockChannels[channelId]) {
      mockChannels[channelId].members = mockChannels[channelId].members.filter(
        (id: string) => id !== userId
      );
      return { success: true };
    }
    throw new Error("Failed to leave channel");
  },
};

const VoiceChannelRoom = () => {
  const params = useParams();
  const channelId = params.id as string;
  const { user } = useAuth();
  const [channel, setChannel] = useState<any>(null);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [inVoice, setInVoice] = useState(false);
  const [voiceUsers, setVoiceUsers] = useState<string[]>([]);
  const [connectingVoice, setConnectingVoice] = useState(false);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const socketRef = useRef<any>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // useEffect(() => {
  //   const fetchChannel = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/${channelId}`);
  //       if (!res.ok) throw new Error("Channel not found");
  //       const data = await res.json();
  //       setChannel(data);
  //     } catch (err: any) {
  //       setError(err.message || "Failed to fetch channel");
  //     }
  //   };
  //   if (channelId) fetchChannel();
  // }, [channelId]);

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const data = await fetchMockChannel(channelId);
        setChannel(data);
        // Check if user is already a member
        setJoined(data.members.includes(user?.id));
      } catch (err: any) {
        setError(err.message || "Failed to fetch channel");
      }
    };
    if (channelId) loadChannel();
  }, [channelId, user?.id]);

  // Join channel as member
  // const handleJoinChannel = async () => {
  //   if (!user || !channelId) return;
  //   setJoining(true);
  //   setError(null);
  //   try {
  //     const res = await fetch(`${API_URL}/${channelId}/join`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  //       },
  //       body: JSON.stringify({ user_id: user.id }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Failed to join channel");
  //     setJoined(true);
  //   } catch (err: any) {
  //     setError(err.message || "Failed to join channel");
  //   } finally {
  //     setJoining(false);
  //   }
  // };

  // Leave channel
  // const handleLeaveChannel = async () => {
  //   if (!user || !channelId) return;
  //   setError(null);
  //   try {
  //     const res = await fetch(`${API_URL}/${channelId}/leave`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  //       },
  //       body: JSON.stringify({ user_id: user.id }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Failed to leave channel");
  //     setJoined(false);
  //     setInVoice(false);
  //     handleLeaveVoice(); // Also leave voice chat if active
  //   } catch (err: any) {
  //     setError(err.message || "Failed to leave channel");
  //   }
  // };

  // Mock Functions
  const handleJoinChannel = async () => {
    if (!user || !channelId) return;
    setJoining(true);
    setError(null);
    try {
      await mockApi.joinChannel(channelId, user.id);
      setJoined(true);
    } catch (err: any) {
      setError(err.message || "Failed to join channel");
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveChannel = async () => {
    if (!user || !channelId) return;
    setError(null);
    try {
      await mockApi.leaveChannel(channelId, user.id);
      setJoined(false);
      setInVoice(false);
      handleLeaveVoice();
    } catch (err: any) {
      setError(err.message || "Failed to leave channel");
    }
  };

  // --- WebRTC & Signaling Logic ---
  const handleJoinVoice = async () => {
    if (!user || !channelId) return;
    setConnectingVoice(true);
    try {
      // Get user media
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = localStream;
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = localStream;
      }
      // Connect to signaling server
      const socket = io(SIGNALING_URL, {
        auth: { token: localStorage.getItem("auth_token") },
      });
      socketRef.current = socket;
      // Join channel room
      socket.emit("join-channel", channelId);
      // Listen for voice users update
      socket.on("voice-users-updated", (data: any) => {
        setVoiceUsers(data.users);
      });
      // Announce voice connect
      socket.emit("voice-connect", channelId);
      // WebRTC peer connection setup (simple 1:1 for now)
      const peer = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      peerRef.current = peer;
      // Add local stream to peer
      localStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, localStream));
      // Handle remote stream
      peer.ontrack = (event) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = event.streams[0];
        }
      };
      // Handle ICE candidates
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            channelId,
            candidate: event.candidate,
          });
        }
      };
      // Signaling: offer/answer
      socket.on("offer", async (data: any) => {
        await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("answer", { channelId, answer });
      });
      socket.on("answer", async (data: any) => {
        await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
      });
      socket.on("ice-candidate", async (data: any) => {
        try {
          await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          // ignore
        }
      });
      // If first in channel, create offer
      socket.on("voice-users-updated", async (data: any) => {
        setVoiceUsers(data.users);
        if (data.users.length === 2 && data.users[0] === user.id) {
          // I'm the first, create offer
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit("offer", { channelId, offer });
        }
      });
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
    if (peerRef.current) {
      peerRef.current.close();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setVoiceUsers([]);
  };

  return (
    <>
      <PageTitle title="Voice Channel" icon={<MessagesSquare />} />

      {channel ? (
        <div className="mb-4 p-4 border rounded">
          <div className="font-semibold">{channel.name}</div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="text-sm text-gray-500 mb-2">
            Channel ID: {channelId}
          </div>
          {!joined ? (
            <Button onClick={handleJoinChannel} disabled={joining || !user}>
              {joining ? "Joining..." : "Join Channel"}
            </Button>
          ) : (
            <div className="mt-4">
              <div className="mb-2">You have joined this channel.</div>
              {/* Voice chat UI */}
              {!inVoice ? (
                <div className="space-y-2">
                  <Button onClick={handleJoinVoice} disabled={connectingVoice}>
                    {connectingVoice ? "Connecting..." : "Join Voice Chat"}
                  </Button>
                  <Button variant="destructive" onClick={handleLeaveChannel}>
                    Leave Channel
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="destructive" onClick={handleLeaveVoice}>
                    Leave Voice Chat
                  </Button>
                  <div className="text-sm">
                    Connected users: {voiceUsers.join(", ")}
                  </div>
                  <audio ref={localAudioRef} autoPlay muted />
                  <audio ref={remoteAudioRef} autoPlay />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>Loading channel...</div>
      )}
    </>
  );
};

export default VoiceChannelRoom;
