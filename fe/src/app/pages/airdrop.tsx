import { ContentLayout } from '@/app/components/layout/content-layout';
import { useClaimAirdropMutation } from '@/features/airdrop/api/use-claim-airdrop-mutation';
import { useGetAccountInfoQuery } from '@/features/airdrop/api/use-get-account-info-query';
import { useGetClaimantByAddressQuery } from '@/features/airdrop/api/use-get-claimant-by-address-query';
import { useGetOneAirdropQuery } from '@/features/airdrop/api/use-get-one-airdrop-query';
import { AirdropCard } from '@/features/airdrop/components/airdrop-card';
import { useGetMintPrice } from '@/features/mint/api/use-get-mint-price';
import { useGetMint } from '@/features/mint/api/use-get-mint-query';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { useCheckAirdropClaimedQuery } from '@/features/airdrop/api/use-check-airdrop-claimed-query';
import { formatTokenAmount } from '@/utils/bigNumber';
import BN from 'bignumber.js';
import { useMemo } from 'react';
import { useParams } from 'react-router';

export const Airdrop = () => {
  const { airdropId } = useParams();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const {
    data: airdrop,
    isLoading: airDropLoading,
    error: airdropError,
  } = useGetOneAirdropQuery(airdropId);

  const { data: mint } = useGetMint(connection, airdrop?.mint);
  const mintAddress = mint?.address.toBase58();

  const { data: claimant } = useGetClaimantByAddressQuery(
    airdropId,
    publicKey?.toBase58()
  );

  const { data: mintPrice } = useGetMintPrice(mintAddress);

  const { data: accountInfo } = useGetAccountInfoQuery(airdropId);
  const isInstant = useMemo(() => {
    return BN(accountInfo?.startTs).isEqualTo(accountInfo?.endTs);
  }, [accountInfo]);

  const { data: alreadyClaimed, isLoading: alreadyClaimedLoading } =
    useCheckAirdropClaimedQuery(airdropId, isInstant);

  const { mutateAsync: claim } = useClaimAirdropMutation(
    airdropId,
    claimant?.proof,
    parseInt(claimant?.amountUnlocked || '0'),
    parseInt(claimant?.amountLocked || '0')
  );

  const mintPriceinUSD = useMemo(() => {
    if (mintPrice && mintAddress) {
      const price = mintPrice?.[mintAddress]?.['usd'];
      return price !== undefined ? BN(price) : undefined;
    }
  }, [mintPrice, mintAddress]);

  const userAmount = useMemo(() => {
    if (claimant && mint) {
      return BN(claimant.amountUnlocked)
        .plus(claimant.amountLocked)
        .div(10 ** mint.decimals);
    }
    return BN(0);
  }, [claimant, mint]);

  const onClaimHandler = () => {
    claim();
    // TODO: show toasts when successfully claimed and when error occurs
  };

  return (
    <ContentLayout
      isLoading={airDropLoading || alreadyClaimedLoading}
      showError={!!airdropError}
    >
      {airdropId && mint && (
        <AirdropCard
          id={airdropId}
          type={isInstant ? 'Instant' : 'Vested'}
          recipients={{
            claimed: accountInfo?.numNodesClaimed.toString(),
            total: accountInfo?.maxNumNodes.toString(),
          }}
          tokens={{
            claimed: formatTokenAmount(
              accountInfo?.totalAmountClaimed,
              mint.decimals
            ),
            total: formatTokenAmount(accountInfo?.maxTotalClaim, mint.decimals),
          }}
          dollarPrice={mintPriceinUSD}
          userAmount={userAmount.toString()}
          canClaim={!!claimant && !alreadyClaimed}
          onClaim={() => onClaimHandler()}
        />
      )}
    </ContentLayout>
  );
};
