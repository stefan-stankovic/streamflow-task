import { type Commitment, Connection, PublicKey } from '@solana/web3.js';
import { getMintAndProgram } from '@streamflow/common/solana';
import { useQuery } from '@tanstack/react-query';

const getMint = async (
  connection: Connection,
  address: PublicKey,
  commitment?: Commitment
) => {
  const mint = await getMintAndProgram(connection, address, commitment);
  return mint.mint;
};

export const useGetMint = (
  connection: Connection,
  mint?: string,
  commitment?: Commitment
) => {
  return useQuery({
    queryKey: ['mint', mint],
    queryFn: () => getMint(connection, new PublicKey(mint || ''), commitment),
    enabled: !!mint && !!connection,
  });
};
