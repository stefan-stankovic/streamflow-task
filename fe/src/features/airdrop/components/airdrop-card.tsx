import { Button } from '@/app/components/ui/button';
import BN from 'bignumber.js';
import React from 'react';
import { AirdropIdLabel } from './airdrop-id-label';

type AirdropCardProps = {
  id: string;
  type: 'Instant' | 'Vested';
  recipients: { claimed: string; total: string };
  tokens: { claimed: string; total: string };
  userAmount: string;
  canClaim: boolean;
  onClaim: () => void;
  alreadyClaimed?: boolean;
  dollarPrice?: BN;
};

export const AirdropCard: React.FC<AirdropCardProps> = ({
  id,
  type,
  recipients,
  tokens,
  userAmount,
  canClaim,
  onClaim,
  alreadyClaimed,
  dollarPrice,
}) => {
  const nothingToClaim = userAmount === '0';
  const showUserAmountInDollars =
    typeof dollarPrice === 'object' && !nothingToClaim;
  return (
    <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 w-full '>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>
          Airdrop: <AirdropIdLabel id={id} />
        </h2>

        <span
          className={`text-sm px-2 py-1 rounded-full ${
            type === 'Instant'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {type}
        </span>
      </div>

      <div className='space-y-2 text-sm text-gray-700 dark:text-gray-300'>
        <div className='flex justify-between'>
          <span>Recipients</span>
          <span>
            {recipients.claimed} / {recipients.total}
          </span>
        </div>

        <div className='flex justify-between'>
          <span>Tokens Claimed</span>
          <span>
            {tokens.claimed} / {tokens.total}
          </span>
        </div>

        <div className='flex justify-between font-medium'>
          <span>Your Allocation</span>
          <div className='flex flex-row items-center justify-start gap-2'>
            <span className='font-semibold text-primary'>
              {nothingToClaim ? '/' : userAmount}
            </span>
            {showUserAmountInDollars && (
              <span>~(${BN(userAmount).times(dollarPrice).toString()})</span>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={onClaim}
        className='w-full mt-4'
        size={'lg'}
        disabled={!canClaim}
      >
        <span className='font-semibold uppercase'>Claim Tokens</span>
      </Button>
      {type === 'Vested' && (
        <span>
          <b>NOTE: </b>There is a possibility that 'CLAIM TOKENS' button is
          <b> enabled</b> even if you already claimed vested airdrop. By
          clicking on it your transaction is going to be started but soon after
          that it will be rejected. We are working on it!
        </span>
      )}
      {alreadyClaimed && <p>You have already claimed this airdrop.</p>}
    </div>
  );
};
