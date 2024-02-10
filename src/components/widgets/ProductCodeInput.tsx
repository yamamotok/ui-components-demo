'use client';

import React, { HTMLProps, useState } from 'react';
import clsx from 'clsx';

import { RadioGroup } from '@/components/elements/RadioGroup';
import { HomeProductCodeInput } from '@/components/widgets/HomeProductCodeInput';
import { ProProductCodeInput } from '@/components/widgets/ProProductCodeInput';

type ProductSeries = 'home' | 'pro';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  onChange?: (productCode: string) => void;
}

export const ProductCodeInput: React.FC<Props> = (props) => {
  const { onChange, className, ...rest } = props;
  const [series, setSeries] = useState<ProductSeries>('home');
  const resetCatNumber = React.useRef<null | (() => void)>(null);
  const resetProdNumber = React.useRef<null | (() => void)>(null);

  const handleProductCodeChange = (str: string) => {
    onChange?.(str);
  };

  const handleChangeSeries = (value: ProductSeries) => {
    setSeries(value);
    // Reset product code when series changes
    resetCatNumber.current?.();
    resetProdNumber.current?.();
    onChange?.('');
  };

  return (
    <div {...rest} className={clsx('flex flex-col gap-4', className)}>
      <HomeProductCodeInput
        reset={resetCatNumber}
        onChange={handleProductCodeChange}
        className={clsx('w-full', { hidden: series !== 'home' })}
      />
      <ProProductCodeInput
        reset={resetProdNumber}
        onChange={handleProductCodeChange}
        className={clsx('w-full', { hidden: series !== 'pro' })}
      />
      <RadioGroup<ProductSeries>
        options={[
          { label: 'Home series', value: 'home' },
          { label: 'Pro series', value: 'pro' },
        ]}
        defaultValue={series}
        onChange={handleChangeSeries}
      />
    </div>
  );
};
