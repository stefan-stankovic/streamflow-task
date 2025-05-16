import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import { airdropApiRoutes } from './api-routes';
import type { AirdropResponse } from './types';

const getOneAirdrop = async (airdropId: string): Promise<AirdropResponse> => {
  const response = await apiClient.get(airdropApiRoutes.one(airdropId));
  return response.data;
};

export const useGetOneAirdropQuery = (airdropId?: string) => {
  return useQuery({
    queryKey: ['airdrops', airdropId],
    queryFn: () => getOneAirdrop(airdropId || ''),
    enabled: !!airdropId,
  });
};
