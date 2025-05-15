import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { ClaimantResponse } from './types';

const getClaimantByAddres = async (
  address: string,
  claimantAddress: string
): Promise<ClaimantResponse> => {
  const response = await apiClient.get(
    `/airdrops/${address}/claimants/${claimantAddress}`
  );
  return response.data;
};

export const useGetClaimantByAddressQuery = (
  address?: string,
  claimantAddress?: string
) => {
  return useQuery({
    queryKey: ['airdrops', address, claimantAddress],
    queryFn: () => getClaimantByAddres(address || '', claimantAddress || ''),
    enabled: !!address && !!claimantAddress,
  });
};
