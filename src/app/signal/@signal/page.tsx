'use client';

import React, { useState } from 'react';

import { Signal } from '@/components/elements/Signal';

const SignalSection: React.FC = () => {
  const [color, setColor] = useState<'green' | 'red' | 'yellow'>('green');

  return (
    <section>
      <h2 className="mb-2 text-xl">Signal as a Compound Widget</h2>
      <div className="flex gap-2">
        <Signal color={color} />
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

export default SignalSection;
