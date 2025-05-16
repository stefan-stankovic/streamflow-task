import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, type Connection } from '@solana/web3.js';
import {
  constants,
  getClaimantStatusPda,
} from '@streamflow/distributor/solana';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const hasAlreadyClaimed = async (
  connection: Connection,
  pda: PublicKey,
  isInstant: boolean
): Promise<boolean> => {
  const accountData = await connection.getAccountInfo(pda);
  if (!accountData?.data) {
    return false;
  }
  if (isInstant) {
    // claimed already
    return true;
  } // TODO: vested case
  return false;
};

export const useCheckAirdropClaimedQuery = (
  airdropId: string | undefined,
  isInstant: boolean | undefined
) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const pda = useMemo(() => {
    if (!publicKey || !airdropId) return null;
    return getClaimantStatusPda(
      new PublicKey(constants.DISTRIBUTOR_PROGRAM_ID.devnet),
      new PublicKey(airdropId),
      publicKey
    );
  }, [publicKey, airdropId]);

  return useQuery({
    queryKey: ['checkAirdropClaimed', airdropId, publicKey],
    queryFn: () =>
      hasAlreadyClaimed(
        connection,
        pda || new PublicKey(''),
        isInstant || false
      ),
    enabled: !!pda && !!isInstant,
  });
};
