import { coinGeckoClient } from '@/api/coin-gecko-client';
import { useQuery } from '@tanstack/react-query';
import { coinGeckoRoutes } from './api-routes';

const getMintPrice = async (mintAddress: string) => {
  const response = await coinGeckoClient.get(
    coinGeckoRoutes.getTokenPriceInUsd(mintAddress)
  );
  return response.data;
};

export const useGetMintPrice = (mintAddress?: string) => {
  return useQuery({
    queryKey: ['mintPrice', mintAddress],
    queryFn: () => getMintPrice(mintAddress || ''),
    enabled: !!mintAddress,
  });
};
