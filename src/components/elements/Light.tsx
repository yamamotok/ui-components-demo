import React, { HTMLProps } from 'react';
import clsx from 'clsx';

export interface LightProps extends HTMLProps<HTMLDivElement> {
  active: boolean;
  radius?: number;
  activeClass?: string;
  inactiveClass?: string;
}

const DefaultActiveClass = 'bg-gray-800';
const DefaultInactiveClass = 'bg-gray-200';

export const Light: React.FC<LightProps> = (props) => {
  const {
    active,
    radius = 40,
    activeClass = DefaultActiveClass,
    inactiveClass = DefaultInactiveClass,
    className,
    ...rest
  } = props;
  return (
    <div
      {...rest}
      className={clsx(className, 'rounded-full', active ? activeClass : inactiveClass)}
      style={{ width: radius, height: radius }}
    ></div>
  );
};
