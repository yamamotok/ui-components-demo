'use client';
import React, { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface Props extends Omit<HTMLProps<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: string) => void;
}

export const TextInput: React.FC<Props> = (props) => {
  const { value, onChange, className, maxLength, ...rest } = props;

  const handleChange = (str?: string) => {
    str = str ?? '';
    if (maxLength) {
      str = str.slice(0, maxLength);
    }
    onChange?.(str);
  };

  return (
    <input
      {...rest}
      className={twMerge(clsx('rounded border border-gray-400 px-3 py-2', className))}
      type="text"
      maxLength={maxLength}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
