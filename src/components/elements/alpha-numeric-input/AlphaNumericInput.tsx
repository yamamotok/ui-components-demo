import React, { HTMLProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { AlphaNumericInputState } from '@/components/elements/alpha-numeric-input/useAlphaNumericInput';

export interface AlphaNumericInputProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'>,
    AlphaNumericInputState {
  label?: string;
}

export const AlphaNumericInput: React.FC<AlphaNumericInputProps> = (props) => {
  const { className, maxLength, label, value, error, onChange, ...rest } = props;

  const errorMessage = () => {
    if (error === 'VALIDATION_ERROR') {
      return (
        <span className="-mt-1 text-sm text-red-500">
          Only alpha-numeric characters are allowed.
        </span>
      );
    }
    if (error === 'REQUIRED') {
      return <span className="-mt-1 text-sm text-red-500">This field is required.</span>;
    }
    return null;
  };

  return (
    <div {...rest} className={twMerge(clsx('', className))}>
      <label className="flex flex-col gap-2">
        <span>{label}</span>
        <input
          className="rounded border border-gray-400 px-3 py-2"
          type="text"
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {errorMessage()}
      </label>
    </div>
  );
};
