import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { MerkleDistributor } from '@streamflow/distributor/solana';
import { useQuery } from '@tanstack/react-query';

const getAccountInfo = async (
  connection: ReturnType<typeof useConnection>['connection'],
  airdropId: string
) => {
  const accountInfo = await connection.getAccountInfo(new PublicKey(airdropId));
  if (!accountInfo) return null;
  return MerkleDistributor.decode(accountInfo.data);
};

export const useGetAccountInfoQuery = (airdropId?: string) => {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ['accountInfo', airdropId],
    queryFn: () => getAccountInfo(connection, airdropId || ''),
    enabled: !!airdropId,
  });
};
