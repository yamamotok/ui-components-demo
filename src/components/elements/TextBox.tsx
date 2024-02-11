import React, { HTMLProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (v: string) => void;
}

export const TextBox: React.FC<Props> = (props) => {
  const { className, onChange, value, label, placeholder, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <label className="flex w-full flex-col gap-2">
        <span>{label}</span>
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={twMerge(clsx('rounded border border-gray-400 px-3 py-2', className))}
        />
      </label>
    </div>
  );
};
