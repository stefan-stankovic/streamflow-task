import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';
import React from 'react';
import { Spinner } from './spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white shadow hover:bg-primary/70',
        secondary: 'bg-white text-primary shadow-sm hover:bg-primary/20',
      },
      size: {
        default: 'h-7 px-4 py-2',
        sm: 'h-5 rounded-md px-3 text-xs',
        lg: 'h-8 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, icon, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner size='sm' className='text-current' />}
        {!isLoading && icon && <span className='mr-2'>{icon}</span>}
        <span className='mx-2'>{children}</span>
      </button>
    );
  }
);
