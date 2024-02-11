import React, { HTMLProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { InputState } from '@/components/elements/validated-input/useValidatedInput';

export interface ValidatedInputProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'>,
    InputState {
  label?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = (props) => {
  const { className, maxLength, label, value, errorMessage, onChange, ...rest } = props;

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
        {errorMessage && <span className="-mt-1 text-sm text-red-500">{errorMessage}</span>}
      </label>
    </div>
  );
};
