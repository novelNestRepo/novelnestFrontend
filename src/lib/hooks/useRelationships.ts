import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api';

export const useFollowers = () => {
  return useQuery({
    queryKey: ['followers'],
    queryFn: () => apiClient.getFollowers(),
  });
};

export const useFollowing = () => {
  return useQuery({
    queryKey: ['following'],
    queryFn: () => apiClient.getFollowing(),
  });
};

export const useRelationships = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: (userId: string) => apiClient.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (userId: string) => apiClient.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
    },
  });

  return {
    followUser: followMutation.mutateAsync,
    unfollowUser: unfollowMutation.mutateAsync,
    isFollowing: followMutation.isPending,
    isUnfollowing: unfollowMutation.isPending,
  };
};