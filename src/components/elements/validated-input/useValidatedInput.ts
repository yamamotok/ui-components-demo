import { ReactNode, useCallback, useMemo, useState } from 'react';

export interface InputState {
  value: string;
  error: null | 'VALIDATION_ERROR' | 'REQUIRED';
  errorMessage: string | ReactNode;
  onChange: (value: string) => void;
}

export interface InitParams {
  value?: string;
  required?: boolean;
  test?: (value: string) => boolean;
  errorMessage?: { VALIDATION_ERROR?: string | ReactNode; REQUIRED?: string | ReactNode };
}

export function useValidatedInput(initParams?: InitParams): InputState {
  const {
    value: initValue = '',
    test = () => true,
    required = false,
    errorMessage: errorMessageMap = {},
  } = initParams ?? {};
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState<InputState['error']>(null);
  const [changedOnce, setChangedOnce] = useState(false);

  const errorMessage = useMemo(() => {
    if (!error) {
      return '';
    }
    return errorMessageMap[error] ?? error;
  }, [error, errorMessageMap]);

  const handleChange = useCallback(
    (str: string) => {
      if (changedOnce && !str && required) {
        setError('REQUIRED');
      } else if (str && !test(str)) {
        setError('VALIDATION_ERROR');
      } else {
        setError(null);
      }
      setValue(str);
      setChangedOnce(true);
    },
    [changedOnce, required, test]
  );

  return { value, error, errorMessage, onChange: handleChange };
}
