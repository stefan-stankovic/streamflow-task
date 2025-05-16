export const airdropApiRoutes = {
  one: (id: string) => `/airdrops/${id}`,
  claimant: (airdropId: string, walletAddress: string) =>
    `/airdrops/${airdropId}/claimants/${walletAddress}`,
};
