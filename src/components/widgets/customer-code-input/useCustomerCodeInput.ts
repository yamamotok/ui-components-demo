import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

interface InitParams {
  value?: string;
  required?: boolean;
}

export function testCustomerCode(str: string) {
  return /^\d{3}-\d{5}$/.test(str);
}

export const ErrorMessage = {
  VALIDATION_ERROR: 'Customer code is in the format "000-00000".',
  REQUIRED: 'Customer code is required.',
} as const;

export function useCustomerCodeInput(initParams?: InitParams) {
  const { value = '', required = false } = initParams ?? {};

  return useValidatedInput({
    value,
    required,
    test: testCustomerCode,
    errorMessage: ErrorMessage,
  });
}
