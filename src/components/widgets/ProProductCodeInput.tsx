'use client';

import React, { HTMLProps, MutableRefObject, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { NumberInput } from '../elements/NumberInput';

const CatNumberLength = 3;
const ProdNumberLength = 7;
function validateCatCode(value: string) {
  return new RegExp(`^[0-9]{${CatNumberLength}}$`).test(value);
}
function validateProdCode(value: string) {
  return new RegExp(`^[0-9]{${ProdNumberLength}}$`).test(value);
}
function createProductCode(catNumber: string, prodNumber: string) {
  if (!validateCatCode(catNumber) || !validateProdCode(prodNumber)) {
    return '';
  }
  return `${catNumber}-${prodNumber}`;
}
function splitProductCode(value: string) {
  const [catNumber, prodNumber] = value.split('-');
  if (validateCatCode(catNumber) && validateProdCode(prodNumber)) {
    return [catNumber, prodNumber];
  }
  return ['', ''];
}

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  onChange?: (productCode: string) => void;
  defaultValue?: string;
  reset?: MutableRefObject<null | (() => void)>;
}

export const ProProductCodeInput: React.FC<Props> = (props) => {
  const { onChange, className, reset, ...rest } = props;
  const [defaultCatNumber, defaultProdNumber] = splitProductCode(props.defaultValue ?? '');
  const [catNumber, setCatNumber] = useState(defaultCatNumber);
  const [prodNumber, setProdNumber] = useState(defaultProdNumber);

  const resetInputs = useCallback(() => {
    setCatNumber('');
    setProdNumber('');
  }, []);

  useEffect(() => {
    if (!reset) {
      return;
    }
    reset.current = resetInputs;
  }, [reset, resetInputs]);

  const handleCatNumberChange = (str: string) => {
    setCatNumber(str);
    onChange?.(createProductCode(str, prodNumber));
  };

  const handleProdNumberChange = (str: string) => {
    setProdNumber(str);
    onChange?.(createProductCode(catNumber, str));
  };

  return (
    <div className={clsx(className, 'flex items-center gap-2')} {...rest}>
      <NumberInput
        className="max-w-[5rem]"
        maxLength={CatNumberLength}
        placeholder="123"
        value={catNumber}
        onChange={handleCatNumberChange}
      />
      <span>-</span>
      <NumberInput
        className="flex-1"
        maxLength={ProdNumberLength}
        placeholder="1234567"
        value={prodNumber}
        onChange={handleProdNumberChange}
      />
    </div>
  );
};
