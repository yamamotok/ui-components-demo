import React from 'react';
import { Light, LightProps } from '@/components/elements/Light';

type ColorVariant = 'green' | 'red' | 'yellow';

interface Props extends Omit<LightProps, 'activeClass'> {
  variant: ColorVariant;
}

const ActiveClasses: Record<ColorVariant, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
};

export const SignalLight: React.FC<Props> = (props) => {
  const { active, radius, variant, ...rest } = props;
  return <Light {...rest} active={active} radius={radius} activeClass={ActiveClasses[variant]} />;
};
