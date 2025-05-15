import { solanaClient } from '@/api/solana-client';
import type {
  SignerWalletAdapter,
  WalletAdapter,
} from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

const claimAirdrop = async (
  airdropId: string,
  adapter: WalletAdapter,
  proof: number[][],
  amountUnlocked: number,
  amountLocked: number
) => {
  const solanaParams = {
    invoker: adapter as SignerWalletAdapter,
  };

  return solanaClient.claim(
    {
      id: airdropId,
      proof,
      amountUnlocked,
      amountLocked,
    },
    solanaParams
  );
};

export const useClaimAirdropMutation = (
  airdropId: string | undefined,
  proof: number[][] | undefined,
  amountUnlocked: number,
  amountLocked: number
) => {
  const { wallet } = useWallet();
  const adapter = wallet?.adapter;
  return useMutation({
    mutationFn: () =>
      claimAirdrop(
        airdropId || '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        adapter || ({} as any),
        proof || [[]],
        amountUnlocked,
        amountLocked
      ),
  });
};
