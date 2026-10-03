import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes (prevents immediate refetching)
      staleTime: 1000 * 60 * 5, 
      // Do not refetch immediately when window gains focus
      refetchOnWindowFocus: false,
      // Retry failed requests once before throwing error
      retry: 1,
    },
  },
});