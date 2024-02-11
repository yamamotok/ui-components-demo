import React from 'react';

import { useForm } from '@/app/form/useForm';
import { ContractCodeInput } from '@/components/widgets/contract-code-input/ContractCodeInput';
import { CustomerCodeInput } from '@/components/widgets/customer-code-input/CustomerCodeInput';

export const Form: React.FC = () => {
  const { customerCode, contractCode } = useForm();

  const errorMessage = () => {
    if (customerCode.error || contractCode.error) {
      return <div className="text-purple-700">Something wrong.</div>;
    }
    return null;
  };

  return (
    <form className="flex flex-col gap-8">
      <CustomerCodeInput {...customerCode} />
      <ContractCodeInput {...contractCode} />
      {errorMessage()}
    </form>
  );
};
