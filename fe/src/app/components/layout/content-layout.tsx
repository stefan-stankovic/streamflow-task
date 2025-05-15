import { SomethingWentWrong } from '../errors/something-went-wrong';
import { Spinner } from '../ui/spinner';

type ContentLayoutProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  showError?: boolean;
};

export const ContentLayout = ({
  children,
  isLoading,
  showError,
}: ContentLayoutProps) => {
  if (isLoading) return <Spinner />;

  if (showError) return <SomethingWentWrong />;

  return (
    <div className='h-screen px-6 lg:px-8 py-4 flex justify-start items-center flex-col'>
      {children}
    </div>
  );
};
