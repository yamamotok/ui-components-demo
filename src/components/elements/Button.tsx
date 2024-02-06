import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const ButtonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400',
  secondary: 'bg-gray-500 hover:bg-gray-700 disabled:bg-gray-400',
};

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof ButtonVariants;
}

export const Button: React.FC<Props> = (props) => {
  const { children, variant = 'primary', className, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge(
        clsx('min-w-32 rounded-lg px-4 py-2 text-white', ButtonVariants[variant], className)
      )}
    >
      {children}
    </button>
  );
};
