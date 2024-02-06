'use client';

import React, { useState } from 'react';
import { SignalLight } from '@/components/elements/SignalLight';

const SignalLightSection: React.FC = () => {
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<'green' | 'red' | 'yellow'>('green');

  return (
    <section>
      <h2 className="mb-2 text-xl">SignalLight as a Widget</h2>
      <div className="flex gap-2">
        <SignalLight active={active} variant={variant} />
        <button className="underline" onClick={() => setActive(!active)}>
          {active ? 'Turn off' : 'Turn on'}
        </button>
        <button className="underline" onClick={() => setVariant('green')}>
          Green{variant === 'green' ? '✓' : ''}
        </button>
        <button className="underline" onClick={() => setVariant('yellow')}>
          Yellow{variant === 'yellow' ? '✓' : ''}
        </button>
        <button className="underline" onClick={() => setVariant('red')}>
          Red{variant === 'red' ? '✓' : ''}
        </button>
      </div>
    </section>
  );
};

export default SignalLightSection;
