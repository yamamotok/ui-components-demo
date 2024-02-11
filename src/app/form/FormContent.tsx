import React from 'react';

import { useFormContext } from '@/app/form/useFormContext';
import { Button } from '@/components/elements/Button';
import { TextBox } from '@/components/elements/TextBox';
import { ContractCodeInput } from '@/components/widgets/contract-code-input/ContractCodeInput';
import { CustomerCodeInput } from '@/components/widgets/customer-code-input/CustomerCodeInput';

export const FormContent: React.FC = () => {
  const { customerCode, contractCode, comment, validInput, reset, submit } = useFormContext();

  return (
    <form className="flex flex-col gap-8">
      <CustomerCodeInput {...customerCode} />
      <ContractCodeInput {...contractCode} />
      <TextBox placeholder="Comment" label="Comment" {...comment} />
      <div className="mt-4 flex gap-4">
        <Button
          type="submit"
          disabled={!validInput}
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Submit
        </Button>
        <Button
          type="reset"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
