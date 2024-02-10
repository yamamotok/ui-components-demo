import React, { useEffect, useRef, useState } from 'react';

import { SignalLight } from '@/components/elements/SignalLight';

interface Props {
  color: 'green' | 'red' | 'yellow';
}

export const AnimatedSignal: React.FC<Props> = (props) => {
  const [color, setColor] = useState<'green' | 'red' | 'yellow'>(props.color);
  const [prevColor, setPrevColor] = useState<'green' | 'red' | 'yellow'>(props.color);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const newColor = props.color;
    if (color === newColor) {
      return;
    }
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    setPrevColor(newColor);
    timerRef.current = window.setTimeout(() => {
      setPrevColor(newColor);
      setColor(newColor);
    }, 240);
  }, [color, props.color]);

  return (
    <div className="flex gap-2">
      <SignalLight
        className="transition-colors"
        variant="green"
        active={color === 'green' || prevColor === 'green'}
      />
      <SignalLight
        className="transition-colors"
        variant="yellow"
        active={color === 'yellow' || prevColor === 'yellow'}
      />
      <SignalLight
        className="transition-colors"
        variant="red"
        active={color === 'red' || prevColor === 'red'}
      />
    </div>
  );
};
