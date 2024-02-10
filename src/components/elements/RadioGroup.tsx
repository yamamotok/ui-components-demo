'use client';

import React, { HTMLProps, useCallback, useState } from 'react';
import clsx from 'clsx';

interface Props<T extends string> extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  options: { label: string; value: T }[];
  defaultValue: T;
  onChange?: (value: T) => void;
}

export const RadioGroup = <T extends string>(props: Props<T>) => {
  const { options, onChange, className, ...rest } = props;
  const [selected, setSelected] = useState(props.defaultValue);

  const handleChange = useCallback(
    (selected: T) => {
      setSelected(selected);
      onChange?.(selected);
    },
    [onChange]
  );

  return (
    <div {...rest} className={clsx('flex gap-4', className)}>
      {options.map(({ label, value }, i) => (
        <label key={i}>
          <input
            type="radio"
            value={value}
            checked={selected === value}
            onChange={(e) => handleChange(e.target.value as T)}
          />
          <span className="pl-0.5">{label}</span>
        </label>
      ))}
    </div>
  );
};
