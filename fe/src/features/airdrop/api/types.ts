export type AirdropResponse = {
  chain: 'SOLANA' | 'APTOS' | 'ETHEREUM' | 'BNB' | 'POLYGON' | 'SUI';
  mint: string;
  version: number;
  address: string;
  sender: string;
  name: string;
  maxNumNodes: string;
  maxTotalClaim: string;
  isActive: boolean;
  isOnChain: boolean;
  clawbackDt: string | null; // RFC 3339 format or null
  totalAmountUnlocked: string;
  totalAmountLocked: string;
  isAligned: boolean;
  isVerified: boolean;
  merkleRoot: number[];
};

export type ClaimantResponse = {
  chain: 'SOLANA' | 'APTOS' | 'ETHEREUM' | 'BNB' | 'POLYGON' | 'SUI';
  distributorAddress: string;
  address: string;
  amountUnlocked: string;
  amountLocked: string;
  amountClaimed: string; // with default value "0" if not set
  proof: number[][];
};
