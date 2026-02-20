import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
interface Work {
  id: string;
  title: string;
  slug: string;
  type: "puisi" | "esai" | "cerpen" | "artikel";
  excerpt: string;
  content: string;
  theme: string;
  tags: string | null;
  coverImage: string | null;
  readingTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface DreamLog {
  id: string;
  title: string;
  slug: string;
  content: string;
  symbols: string | null;
  lucidity: "low" | "medium" | "high";
  mood: string | null;
  dreamDate: string;
  isRecurring: boolean;
  isLucid: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Quote {
  id: string;
  text: string;
  source: string | null;
  author: string | null;
  isFeatured: boolean;
  workId: string | null;
  createdAt: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Fetch works
export function useWorks(filters?: {
  type?: string;
  theme?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.type) params.set("type", filters.type);
  if (filters?.theme) params.set("theme", filters.theme);
  if (filters?.featured) params.set("featured", "true");
  if (filters?.limit) params.set("limit", filters.limit.toString());
  if (filters?.page) params.set("page", filters.page.toString());

  return useQuery({
    queryKey: ["works", filters],
    queryFn: async (): Promise<PaginatedResponse<Work>> => {
      const response = await fetch(`/api/works?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch works");
      return response.json();
    },
  });
}

// Fetch single work
export function useWork(id: string) {
  return useQuery({
    queryKey: ["work", id],
    queryFn: async (): Promise<{ success: boolean; data: Work }> => {
      const response = await fetch(`/api/works/${id}`);
      if (!response.ok) throw new Error("Failed to fetch work");
      return response.json();
    },
    enabled: !!id,
  });
}

// Create work mutation
export function useCreateWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Work>) => {
      const response = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create work");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}

// Update work mutation
export function useUpdateWork(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Work>) => {
      const response = await fetch(`/api/works/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update work");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
      queryClient.invalidateQueries({ queryKey: ["work", id] });
    },
  });
}

// Delete work mutation
export function useDeleteWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/works/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete work");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}

// Fetch dream logs
export function useDreamLogs(filters?: {
  lucidity?: string;
  mood?: string;
  limit?: number;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.lucidity) params.set("lucidity", filters.lucidity);
  if (filters?.mood) params.set("mood", filters.mood);
  if (filters?.limit) params.set("limit", filters.limit.toString());
  if (filters?.page) params.set("page", filters.page.toString());

  return useQuery({
    queryKey: ["dreamlogs", filters],
    queryFn: async (): Promise<PaginatedResponse<DreamLog>> => {
      const response = await fetch(`/api/dreamlogs?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch dream logs");
      return response.json();
    },
  });
}

// Create dream log mutation
export function useCreateDreamLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<DreamLog>) => {
      const response = await fetch("/api/dreamlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create dream log");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dreamlogs"] });
    },
  });
}

// Fetch quotes
export function useQuotes(options?: { featured?: boolean; random?: boolean; limit?: number }) {
  const params = new URLSearchParams();
  if (options?.featured) params.set("featured", "true");
  if (options?.random) params.set("random", "true");
  if (options?.limit) params.set("limit", options.limit.toString());

  return useQuery({
    queryKey: ["quotes", options],
    queryFn: async (): Promise<{ success: boolean; data: Quote[] }> => {
      const response = await fetch(`/api/quotes?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch quotes");
      return response.json();
    },
  });
}
