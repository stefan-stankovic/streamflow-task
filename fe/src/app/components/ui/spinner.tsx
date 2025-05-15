import cn from 'classnames';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-10 h-10 border-5',
  };

  return (
    <div className={cn('flex justify-center items-center mt-2', className)}>
      <div
        className={cn(
          `${sizeClasses[size]} border-t-transparent border-primary border-solid rounded-full animate-spin`
        )}
      ></div>
    </div>
  );
};
