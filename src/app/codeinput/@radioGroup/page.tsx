import React from 'react';
import { ProProductCodeInput } from '@/components/widgets/ProProductCodeInput';
import { RadioGroup } from '@/components/elements/RadioGroup';

const RadioGroupSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-2 text-xl">RadioGroup as an Element</h2>
      <div className="flex gap-2">
        <RadioGroup
          className="w-full"
          options={[
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' },
          ]}
          defaultValue="1"
        />
      </div>
    </section>
  );
};

export default RadioGroupSection;
