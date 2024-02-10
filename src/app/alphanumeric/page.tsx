'use client';

import { AlphaNumericInput } from '@/components/elements/alpha-numeric-input/AlphaNumericInput';
import { useAlphaNumericInput } from '@/components/elements/alpha-numeric-input/useAlphaNumericInput';

const AlphaNumericPage = () => {
  const state1 = useAlphaNumericInput({ value: 'input1' });
  const state2 = useAlphaNumericInput({ value: 'input2' });

  const errorMessage = () => {
    if (state1.error || state2.error) {
      return <div className="text-purple-700">Something wrong.</div>;
    }
    return null;
  };

  return (
    <div>
      <h1 className="py-4 text-lg">AlphaNumeric Page</h1>
      <p className="pb-8 leading-4 text-gray-600">
        Lifting the state up to the parent(page) component.
      </p>
      <div className="flex flex-col gap-8">
        <AlphaNumericInput label="alpha-numeric 1" {...state1} />
        <AlphaNumericInput label="alpha-numeric 2" {...state2} />
        {errorMessage()}
      </div>
    </div>
  );
};

export default AlphaNumericPage;
