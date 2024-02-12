import React, { HTMLProps } from 'react';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

export interface ValidatedInputProps
  extends Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'value'>,
    ReturnType<typeof useValidatedInput> {
  showError?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = (props) => {
  const {
    className,
    maxLength,
    label,
    placeholder,
    value,
    errorMessage,
    onChange,
    showError = true,
    ...rest
  } = props;

  return (
    <div {...rest} className={className}>
      <label className="flex w-full flex-col gap-2">
        <span>{label}</span>
        <input
          className="w-full rounded border border-gray-400 px-3 py-2"
          type="text"
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {showError && errorMessage && (
          <span role="alert" className="-mt-1 text-sm text-red-500">
            {errorMessage}
          </span>
        )}
      </label>
    </div>
  );
};
