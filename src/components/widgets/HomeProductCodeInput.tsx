'use client';

import React, {
  HTMLProps,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { NumberInput, NumberInputProps } from '@/components/elements/NumberInput';

const ProductCodeLength = 9;
function validateCode(value: string) {
  return new RegExp(`^[0-9]{${ProductCodeLength}}$`).test(value);
}

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  onChange?: (productCode: string) => void;
  defaultValue?: string;
  reset?: MutableRefObject<null | (() => void)>;
}

export const HomeProductCodeInput: React.FC<Props> = (props) => {
  const { onChange, reset, ...rest } = props;
  const [value, setValue] = useState(props.defaultValue ?? '');

  const resetInputs = useCallback(() => {
    setValue('');
  }, []);

  useEffect(() => {
    if (!reset) {
      return;
    }
    reset.current = resetInputs;
  }, [reset, resetInputs]);

  const handleChange = (str: string) => {
    setValue(str);
    if (validateCode(str)) {
      onChange?.(str);
    }
  };

  return (
    <div {...rest}>
      <NumberInput
        className="w-full"
        placeholder="123456789"
        maxLength={ProductCodeLength}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
