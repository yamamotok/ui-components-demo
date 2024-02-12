import React, { ReactNode, useContext, useMemo, useState } from 'react';

import { useContractCodeInput } from '@/components/widgets/contract-code-input/useContractCodeInput';
import { useCustomerCodeInput } from '@/components/widgets/customer-code-input/useCustomerCodeInput';

interface FormContextValue {
  customerCode: ReturnType<typeof useCustomerCodeInput>;
  contractCode: ReturnType<typeof useContractCodeInput>;
  comment: { value: string; onChange: (v: string) => void };
  validForm: boolean;
  reset: () => void;
  submit: () => void;
}

interface InitParams {
  customerCode?: string;
  contractCode?: string;
  comment?: string;
}

const FormContext = React.createContext<FormContextValue | null>(null);

export const FormContextProvider: React.FC<InitParams & { children: ReactNode }> = (props) => {
  const {
    children,
    customerCode: customerCodeInit = '',
    contractCode: contractCodeInit = '',
    comment: commentInit = '',
  } = props;
  const customerCode = useCustomerCodeInput({ required: true, value: customerCodeInit });
  const contractCode = useContractCodeInput({ required: true, value: contractCodeInit });
  const [comment, setComment] = useState(commentInit);

  const validForm = useMemo(() => {
    return [
      customerCode.value && !customerCode.error,
      contractCode.value && !contractCode.error,
    ].every(Boolean);
  }, [contractCode.error, contractCode.value, customerCode.error, customerCode.value]);

  const reset = () => {
    customerCode.onChange('');
    contractCode.onChange('');
    setComment('');
  };

  const submit = () => {
    console.log('Submit!'); // eslint-disable-line no-console
  };

  const value: FormContextValue = {
    customerCode,
    contractCode,
    comment: { value: comment, onChange: (v: string) => setComment(v) },
    validForm,
    reset,
    submit,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
