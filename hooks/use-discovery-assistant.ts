'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { aiApi } from '@/lib/ai-api';
import type { ChatResponse, SemanticSearchResponse } from '@/lib/ai-types';

export function useDiscoveryChat() {
  return useMutation({
    mutationFn: ({ message, sessionId }: { message: string; sessionId?: string }) =>
      aiApi.chat(message, sessionId),
  });
}

export function useSemanticSearch(prompt: string, enabled = false) {
  return useQuery<SemanticSearchResponse>({
    queryKey: ['ai', 'search', prompt],
    queryFn: () => aiApi.search(prompt),
    enabled: enabled && prompt.length > 2,
  });
}

export function useVectorSearch(query: string, enabled = false) {
  return useQuery({
    queryKey: ['ai', 'vectors', query],
    queryFn: () => aiApi.vectors(query),
    enabled: enabled && query.length > 2,
  });
}

export function useAiWorkspace() {
  return useQuery({
    queryKey: ['ai', 'workspace'],
    queryFn: aiApi.workspace,
  });
}

export type { ChatResponse, SemanticSearchResponse };
