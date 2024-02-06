import React from 'react';
import { SignalLight } from '@/components/elements/SignalLight';

interface Props {
  color: 'green' | 'red' | 'yellow';
}

export const Signal: React.FC<Props> = (props) => {
  return (
    <div className="flex gap-2">
      <SignalLight variant="green" active={props.color === 'green'} />
      <SignalLight variant="yellow" active={props.color === 'yellow'} />
      <SignalLight variant="red" active={props.color === 'red'} />
    </div>
  );
};
