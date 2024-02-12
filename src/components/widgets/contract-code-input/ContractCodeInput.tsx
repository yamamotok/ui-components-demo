import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  ValidatedInput,
  ValidatedInputProps,
} from '@/components/elements/validated-input/ValidatedInput';

type Props = Omit<ValidatedInputProps, 'label' | 'maxLength'>;

export const ContractCodeInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ValidatedInput
      {...rest}
      ref={ref}
      label="Contract Code"
      className={twMerge(clsx('', className))}
      placeholder="a20110203"
      maxLength={9}
    />
  );
});

ContractCodeInput.displayName = 'ContractCodeInput';
