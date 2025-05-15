import { Button } from '@/app/components/ui/button';
import { AirdropIdLabel } from './airdrop-id-label';

type AirdropListItemProps = {
  id: string;
  onClick: () => void;
};

export const AirdropListItem = ({ id, onClick }: AirdropListItemProps) => {
  return (
    <div className='rounded-lg w-full flex flex-row items-center justify-between py-2 px-6 bg-white hover:bg-primary/20'>
      <AirdropIdLabel id={id} />
      <Button onClick={onClick}>See details</Button>
    </div>
  );
};
