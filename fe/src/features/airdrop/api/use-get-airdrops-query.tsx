import { solanaClient } from '@/api/solana-client';
import { useQuery } from '@tanstack/react-query';

export const getAirdrops = async () => {
  return solanaClient.searchDistributors({});
};

export const useGetAirdropsQuery = () => {
  return useQuery({
    queryKey: ['airdrops'],
    queryFn: () => getAirdrops(),
    select: (distributors) => distributors.map((d) => d.publicKey.toString()),
  });
};
