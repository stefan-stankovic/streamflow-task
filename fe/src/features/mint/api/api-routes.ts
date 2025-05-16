export const coinGeckoRoutes = {
  getTokenPriceInUsd: (mintAddress: string) =>
    `simple/token_price/solana?contract_addresses=${mintAddress}&vs_currencies=usd`,
};
