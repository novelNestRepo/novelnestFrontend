import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api';

export const useVoiceChannels = () => {
  return useQuery({
    queryKey: ['voice-channels'],
    queryFn: () => apiClient.getVoiceChannels(),
  });
};

export const useVoiceChannel = (channelId: string) => {
  return useQuery({
    queryKey: ['voice-channel', channelId],
    queryFn: () => apiClient.getVoiceChannel(channelId),
    enabled: !!channelId,
  });
};

export const useVoiceChannelActions = () => {
  const queryClient = useQueryClient();

  const joinChannelMutation = useMutation({
    mutationFn: ({ channelId, userId }: { channelId: string; userId: string }) =>
      apiClient.joinVoiceChannel(channelId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voice-channels'] });
    },
  });

  const leaveChannelMutation = useMutation({
    mutationFn: ({ channelId, userId }: { channelId: string; userId: string }) =>
      apiClient.leaveVoiceChannel(channelId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voice-channels'] });
    },
  });

  return {
    joinChannel: joinChannelMutation.mutateAsync,
    leaveChannel: leaveChannelMutation.mutateAsync,
    isJoining: joinChannelMutation.isPending,
    isLeaving: leaveChannelMutation.isPending,
  };
};