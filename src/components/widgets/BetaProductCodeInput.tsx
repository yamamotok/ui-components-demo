'use client';

import React, { HTMLProps, useState } from 'react';
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

export function useBetaProductCodeInput(defaultValue: string) {
  const [defaultCatNumber, defaultProdNumber] = splitProductCode(defaultValue ?? '');
  const [catNumber, setCatNumber] = useState(defaultCatNumber);
  const [prodNumber, setProdNumber] = useState(defaultProdNumber);
  const setValue = (value: string) => {
    const [catNumber, prodNumber] = splitProductCode(value);
    setCatNumber(catNumber);
    setProdNumber(prodNumber);
  };
  const getValue = () => {
    return createProductCode(catNumber, prodNumber);
  };
  return { catNumber, setCatNumber, prodNumber, setProdNumber, setValue, getValue };
}

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  onChange?: (productCode: string) => void;
  betaProductCodeInput: ReturnType<typeof useBetaProductCodeInput>;
}

export const BetaProductCodeInput: React.FC<Props> = (props) => {
  const {
    onChange,
    className,
    betaProductCodeInput: { catNumber, setCatNumber, prodNumber, setProdNumber },
    ...rest
  } = props;

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
