'use client';

import React, { useState } from 'react';
import { AnimatedSignal } from '@/components/elements/AnimatedSignal';

const AnimatedSignalSection: React.FC = () => {
  const [color, setColor] = useState<'green' | 'red' | 'yellow'>('green');

  return (
    <section>
      <h2 className="mb-2 text-xl">AnimatedSignal as a Compound Widget</h2>
      <div className="flex gap-2">
        <AnimatedSignal color={color} />
        <button className="underline" onClick={() => setColor('green')}>
          Green{color === 'green' ? '✓' : ''}
        </button>
        <button className="underline" onClick={() => setColor('yellow')}>
          Yellow{color === 'yellow' ? '✓' : ''}
        </button>
        <button className="underline" onClick={() => setColor('red')}>
          Red{color === 'red' ? '✓' : ''}
        </button>
      </div>
    </section>
  );
};

export default AnimatedSignalSection;
