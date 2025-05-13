import logo from '@/assets/logo.png';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <nav className='bg-white border-b border-b-purple-300 inset-0 w-full sticky flex items-center justify-between px-6 lg:px-8 py-3'>
      <Link to='/'>
        <img src={logo} className='w-10 h-10' />
      </Link>
      <WalletMultiButton />
    </nav>
  );
};
