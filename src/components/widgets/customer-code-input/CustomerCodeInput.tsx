import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  ValidatedInput,
  ValidatedInputProps,
} from '@/components/elements/validated-input/ValidatedInput';

type Props = Omit<ValidatedInputProps, 'label' | 'maxLength'>;

export const CustomerCodeInput: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <ValidatedInput
      {...rest}
      label="Customer Code"
      className={twMerge(clsx('', className))}
      maxLength={9}
    />
  );
};
