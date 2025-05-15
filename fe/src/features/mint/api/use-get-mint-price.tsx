import { coinGeckoClient } from '@/api/coinGeckoClient';
import { useQuery } from '@tanstack/react-query';

const getMintPrice = async (mintAddress: string) => {
  const response = await coinGeckoClient.get(
    `simple/token_price/solana?contract_addresses=${mintAddress}&vs_currencies=usd`
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
