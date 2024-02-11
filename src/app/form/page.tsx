'use client';

import { ContractCodeInput } from '@/components/widgets/contract-code-input/ContractCodeInput';
import { useContractCodeInput } from '@/components/widgets/contract-code-input/useContractCodeInput';
import { CustomerCodeInput } from '@/components/widgets/customer-code-input/CustomerCodeInput';
import { useCustomerCodeInput } from '@/components/widgets/customer-code-input/useCustomerCodeInput';

const FormPage = () => {
  const customerCode = useCustomerCodeInput();
  const contractCode = useContractCodeInput();

  const errorMessage = () => {
    if (customerCode.error || contractCode.error) {
      return <div className="text-purple-700">Something wrong.</div>;
    }
    return null;
  };

  return (
    <div>
      <h1 className="py-4 text-lg">Form Page</h1>
      <p className="pb-8 leading-4 text-gray-600">This form includes several custom components.</p>
      <div className="flex flex-col gap-8">
        <CustomerCodeInput {...customerCode} />
        <ContractCodeInput {...contractCode} />
        {errorMessage()}
      </div>
    </div>
  );
};

export default FormPage;
