import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { ClaimantResponse } from './types';

const getClaimantByAddres = async (
  airdropId: string,
  claimantAddress: string
): Promise<ClaimantResponse> => {
  const response = await apiClient.get(
    `/airdrops/${airdropId}/claimants/${claimantAddress}`
  );
  return response.data;
};

export const useGetClaimantByAddressQuery = (
  airdropId?: string,
  claimantAddress?: string
) => {
  return useQuery({
    queryKey: ['airdrops', airdropId, claimantAddress],
    queryFn: () => getClaimantByAddres(airdropId || '', claimantAddress || ''),
    enabled: !!airdropId && !!claimantAddress,
  });
};
