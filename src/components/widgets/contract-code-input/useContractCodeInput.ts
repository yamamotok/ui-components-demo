import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

interface InitParams {
  value?: string;
  required?: boolean;
}

export function testContractCode(str: string) {
  return /^[a-z]\d{8}$/.test(str);
}

export const ErrorMessage = {
  VALIDATION_ERROR: 'Contract code is in the format "a00000000".',
  REQUIRED: 'Contract code is required.',
} as const;

export function useContractCodeInput(initParams?: InitParams) {
  const { value = '', required = false } = initParams ?? {};

  return useValidatedInput({
    value,
    required,
    test: testContractCode,
    errorMessage: ErrorMessage,
  });
}
