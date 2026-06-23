import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'mint' | 'butter' | 'coral' | 'sky';
  size?: 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  href?: string;
}

const variantMap = {
  primary: 'bg-ink-base text-surface-base shadow-raised border-2 border-ink-base active:shadow-none active:translate-y-[var(--press-depth)]',
  secondary: 'bg-surface-base text-ink-base shadow-raised border-2 border-ink-base active:shadow-none active:translate-y-[var(--press-depth)]',
  accent: 'bg-theme-accent text-white shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-theme-accent-hover),0_var(--ui-depth)_0_0_var(--shadow-color)] border-2 border-ink-base active:shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-theme-accent-hover)] active:translate-y-[var(--press-depth)]',
  outline: 'bg-transparent text-ink-base shadow-raised border-2 border-ink-base active:shadow-none active:translate-y-[var(--press-depth)]',
  ghost: 'bg-transparent border-none text-ink-base underline decoration-theme-accent-hover decoration-2 underline-offset-4 hover:decoration-3',
  mint: 'bg-mint text-ink-base shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-mint-deep),0_var(--ui-depth)_0_0_var(--shadow-color)] border-2 border-ink-base active:shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-mint-deep)] active:translate-y-[var(--press-depth)]',
  butter: 'bg-butter text-ink-base shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-butter-deep),0_var(--ui-depth)_0_0_var(--shadow-color)] border-2 border-ink-base active:shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-butter-deep)] active:translate-y-[var(--press-depth)]',
  coral: 'bg-coral text-white shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-coral-deep),0_var(--ui-depth)_0_0_var(--shadow-color)] border-2 border-ink-base active:shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-coral-deep)] active:translate-y-[var(--press-depth)]',
  sky: 'bg-sky text-ink-base shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-sky-deep),0_var(--ui-depth)_0_0_var(--shadow-color)] border-2 border-ink-base active:shadow-[inset_0_calc(var(--ui-depth)*-1)_0_var(--color-sky-deep)] active:translate-y-[var(--press-depth)]',
};

const sizeMap = {
  sm: 'text-sm py-2 px-3',
  md: 'text-[15px] py-3 px-5',
  lg: 'text-base py-4 px-6',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'secondary', 
  size = 'md',
  className = '', 
  as,
  href,
  onClick,
  ...props 
}, ref) => {
  const Component = as || (href ? 'a' : 'button');
  
  // Ghost button overrides padding/shadow for simplicity
  const sizeClasses = variant === 'ghost' ? 'px-1 py-1' : sizeMap[size];
  const interactClasses = variant === 'ghost' ? '' : 'transition-all duration-100 ease-out hover:brightness-95';
  
  return (
    <Component 
      ref={ref as any}
      className={`inline-flex items-center gap-2 font-display font-medium rounded-md select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky ${sizeClasses} ${variantMap[variant]} ${interactClasses} ${className}`}
      href={href}
      onClick={onClick as any}
      {...props}
    >
      {children}
    </Component>
  );
});
Button.displayName = 'Button';
