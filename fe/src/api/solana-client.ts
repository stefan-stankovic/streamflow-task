import { ICluster } from '@streamflow/common';
import { SolanaDistributorClient } from '@streamflow/distributor/solana';

export const solanaClient = new SolanaDistributorClient({
  clusterUrl: 'https://api.devnet.solana.com',
  cluster: ICluster.Devnet,
});
