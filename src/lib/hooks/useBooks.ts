import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api';

export const useBooks = () => {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: () => apiClient.getBooks(),
  });

  const createBookMutation = useMutation({
    mutationFn: (book: any) => apiClient.createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: ({ id, book }: { id: string; book: any }) =>
      apiClient.updateBook(id, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id: string) => apiClient.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return {
    books: booksQuery.data || [],
    isLoading: booksQuery.isLoading,
    error: booksQuery.error,
    createBook: createBookMutation.mutateAsync,
    updateBook: updateBookMutation.mutateAsync,
    deleteBook: deleteBookMutation.mutateAsync,
    isCreating: createBookMutation.isPending,
    isUpdating: updateBookMutation.isPending,
    isDeleting: deleteBookMutation.isPending,
  };
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => apiClient.getBook(id),
    enabled: !!id,
  });
};