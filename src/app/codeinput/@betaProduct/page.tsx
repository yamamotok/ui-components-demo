'use client';

import React from 'react';

import {
  BetaProductCodeInput,
  useBetaProductCodeInput,
} from '@/components/widgets/BetaProductCodeInput';

const BetaProductCodeInputSection: React.FC = () => {
  const betaProductCodeInput = useBetaProductCodeInput('123-1122333');

  return (
    <section>
      <h2 className="mb-2 text-xl">BetaProductCodeInput as a Widget (hooks pattern)</h2>
      <div className="flex gap-2">
        <BetaProductCodeInput className="w-full" betaProductCodeInput={betaProductCodeInput} />
        <button onClick={() => betaProductCodeInput.setValue('')}>Reset</button>
      </div>
    </section>
  );
};

export default BetaProductCodeInputSection;
