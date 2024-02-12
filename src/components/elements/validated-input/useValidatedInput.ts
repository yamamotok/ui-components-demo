import { ReactNode, useEffect, useMemo, useState } from 'react';

const ErrorTypes = ['VALIDATION_ERROR', 'REQUIRED'] as const;

interface ValidatedInputState {
  readonly value: string;
  readonly error: null | (typeof ErrorTypes)[number];
  readonly errorMessage: string | ReactNode;
  readonly onChange: (value: string) => void;
}

interface ValidatedInputInitParams {
  value?: string;
  required?: boolean;
  test?: (value: string) => boolean;
  errorMessage?: { [key in (typeof ErrorTypes)[number]]?: ReactNode };
}

export function useValidatedInput(initParams?: ValidatedInputInitParams): ValidatedInputState {
  const {
    value: initValue = '',
    test = () => true,
    required = false,
    errorMessage: errorMessageMap = {},
  } = initParams ?? {};
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState<ValidatedInputState['error']>(null);

  useEffect(() => {
    if (required && !value) {
      setError('REQUIRED');
    } else if (value && !test(value)) {
      setError('VALIDATION_ERROR');
    } else {
      setError(null);
    }
  }, [required, test, value]);

  const errorMessage = useMemo(() => {
    if (!error) {
      return '';
    }
    return errorMessageMap[error] ?? error;
  }, [error, errorMessageMap]);

  return {
    value,
    error,
    errorMessage,
    onChange: (v: string) => setValue(v),
  };
}
