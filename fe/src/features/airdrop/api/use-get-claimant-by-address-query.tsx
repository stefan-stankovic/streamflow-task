import { apiClient } from '@/api/client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { airdropApiRoutes } from './api-routes';
import type { ClaimantResponse } from './types';

const getClaimantByAddres = async (
  airdropId: string,
  claimantAddress: string
): Promise<ClaimantResponse> => {
  const response = await apiClient.get(
    airdropApiRoutes.claimant(airdropId, claimantAddress)
  );
  return response.data;
};

export const useGetClaimantByAddressQuery = (airdropId?: string) => {
  const { publicKey } = useWallet();
  const claimantAddress = publicKey?.toBase58();

  return useQuery({
    queryKey: ['airdrops', airdropId, claimantAddress],
    queryFn: () => getClaimantByAddres(airdropId || '', claimantAddress || ''),
    enabled: !!airdropId && !!claimantAddress,
  });
};
