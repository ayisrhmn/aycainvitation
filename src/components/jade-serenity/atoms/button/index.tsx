import { cn } from '@/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'default' | 'outlined';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={cn(
          'py-2 px-6 rounded-lg flex flex-row items-center gap-2 transition duration-300',
          variant === 'default'
            ? 'text-green-900 bg-white hover:bg-slate-300'
            : 'border text-white hover:text-green-900 bg-transparent hover:bg-white',
          className,
          props.disabled ? 'opacity-30' : ''
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
