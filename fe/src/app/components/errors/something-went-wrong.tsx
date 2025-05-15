import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
type SomethingWentWrongProps = {
  text?: string;
};
export const SomethingWentWrong = ({ text }: SomethingWentWrongProps) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2 className=' font-semibold text-red-500 text-2xl'>
        Ooops, something went wrong :(
      </h2>
      <div className='flex flex-row items-center justify-start'>
        <h3>An error has occured</h3>
        {text && <b>: {text}</b>}
      </div>
      <Button onClick={() => navigate('/')} variant={'secondary'} size={'lg'}>
        Go back home
      </Button>
    </div>
  );
};
