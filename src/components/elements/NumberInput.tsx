'use client';

import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (value: string) => void;
}

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { value, onChange, className, maxLength, ...rest } = props;

  const handleChange = (str?: string) => {
    str = str ?? '';
    if (!/^\d*$/.test(str)) {
      return;
    }
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
