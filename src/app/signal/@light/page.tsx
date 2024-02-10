'use client';

import React, { useState } from 'react';

import { Light } from '@/components/elements/Light';

const LightSection: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <section>
      <h2 className="mb-2 text-xl">Light as an Element</h2>
      <div className="flex gap-2">
        <Light active={active} />
        <button className="underline" onClick={() => setActive(!active)}>
          {active ? 'Turn off' : 'Turn on'}
        </button>
      </div>
    </section>
  );
};

export default LightSection;
