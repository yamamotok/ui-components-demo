import React from 'react';
import { NumberInput } from '@/components/elements/NumberInput';

const NumberInputSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-2 text-xl">NumberInput as an Element</h2>
      <div className="flex gap-2">
        <NumberInput className="w-full" maxLength={100} />
      </div>
    </section>
  );
};

export default NumberInputSection;
