import React, { HTMLProps } from 'react';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

export interface ValidatedInputProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'>,
    ReturnType<typeof useValidatedInput> {
  label?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = (props) => {
  const { className, maxLength, label, value, errorMessage, onChange, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <label className="flex w-full flex-col gap-2">
        <span>{label}</span>
        <input
          className="w-full rounded border border-gray-400 px-3 py-2"
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
