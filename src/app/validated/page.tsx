'use client';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';
import { ValidatedInput } from '@/components/elements/validated-input/ValidatedInput';

const ValidatedInputPage = () => {
  const state = useValidatedInput({
    required: true,
    test: (v) => v.length > 3,
    errorMessage: {
      VALIDATION_ERROR: 'Must input 4 characters at least.',
      REQUIRED: 'This field is required.',
    },
  });

  const errorMessage = () => {
    if (state.error) {
      return <div className="text-purple-700">Something wrong.</div>;
    }
    return null;
  };

  return (
    <div>
      <h1 className="py-4 text-lg">Validated Input Page</h1>
      <p className="pb-8 leading-4 text-gray-600">
        ValidatedInput is a compound component that includes a label, input, and error message with
        validation.
      </p>
      <div className="flex flex-col gap-8">
        <ValidatedInput label="ValidatedInput" {...state} />
        {errorMessage()}
      </div>
    </div>
  );
};

export default ValidatedInputPage;
