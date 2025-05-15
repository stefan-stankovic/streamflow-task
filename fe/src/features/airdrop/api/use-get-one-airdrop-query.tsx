import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { AirdropResponse } from './types';

const getOneAirdrop = async (address: string): Promise<AirdropResponse> => {
  const response = await apiClient.get(`/airdrops/${address}`);
  return response.data;
};

export const useGetOneAirdropQuery = (address?: string) => {
  return useQuery({
    queryKey: ['airdrops', address],
    queryFn: () => getOneAirdrop(address || ''),
    enabled: !!address,
  });
};
