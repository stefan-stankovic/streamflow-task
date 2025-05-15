import BN from 'bignumber.js';

export function formatTokenAmount(
  amount: string | undefined | null,
  decimals: number
): string {
  if (!amount) return '0';
  return new BN(amount).div(new BN(10).pow(decimals)).toString();
}
