import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router';
import { Navbar } from './app/components/layout/navbar';

const App = () => {
  const endpoint = 'https://api.devnet.solana.com';

  const wallets = useMemo(() => [new PhantomWalletAdapter({})], []);

  const client = new QueryClient();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <QueryClientProvider client={client}>
          <WalletModalProvider>
            <Navbar />
            <Outlet />
          </WalletModalProvider>
        </QueryClientProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
