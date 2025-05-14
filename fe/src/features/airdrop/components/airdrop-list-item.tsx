import { Button } from '@/app/components/ui/button';

type AirdropListItemProps = {
  label: string;
  onClick: () => void;
};

export const AirdropListItem = ({ label, onClick }: AirdropListItemProps) => {
  return (
    <div className='rounded-lg w-full flex flex-row items-center justify-between py-2 px-6 bg-white hover:bg-primary/20'>
      <h3>{label}</h3>
      <Button onClick={onClick}>See details</Button>
    </div>
  );
};
