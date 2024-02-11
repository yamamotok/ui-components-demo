import React, { ReactNode } from 'react';

import { useContractCodeInput } from '@/components/widgets/contract-code-input/useContractCodeInput';
import { useCustomerCodeInput } from '@/components/widgets/customer-code-input/useCustomerCodeInput';

interface FormContextValue {
  customerCode: ReturnType<typeof useCustomerCodeInput>;
  contractCode: ReturnType<typeof useContractCodeInput>;
}

const FormContext = React.createContext<FormContextValue | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const customerCode = useCustomerCodeInput({ required: true });
  const contractCode = useContractCodeInput({ required: true });

  const value = {
    customerCode,
    contractCode,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
