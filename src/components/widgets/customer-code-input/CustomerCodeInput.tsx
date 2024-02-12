import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  ValidatedInput,
  ValidatedInputProps,
} from '@/components/elements/validated-input/ValidatedInput';

type Props = Omit<ValidatedInputProps, 'label' | 'maxLength'>;

export const CustomerCodeInput: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <ValidatedInput
        {...rest}
        ref={ref}
        label="Customer Code"
        className={twMerge(clsx('', className))}
        placeholder="000-12345"
        maxLength={9}
      />
    );
  }
);

CustomerCodeInput.displayName = 'CustomerCodeInput';
