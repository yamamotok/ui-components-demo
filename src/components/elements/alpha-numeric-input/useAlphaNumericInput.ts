import { useCallback, useRef, useState } from 'react';

export interface AlphaNumericInputState {
  value: string;
  error: null | 'VALIDATION_ERROR' | 'REQUIRED';
  onChange: (value: string) => void;
}

export function useAlphaNumericInput(initialValue?: { value?: string }): AlphaNumericInputState {
  const [value, setValue] = useState(initialValue?.value || '');
  const [error, setError] = useState<AlphaNumericInputState['error']>(null);
  const changedOnce = useRef(false);

  const handleChange = useCallback((str: string) => {
    setValue(str);
    if (changedOnce.current && !str) {
      setError('REQUIRED');
    } else if (!/^[a-zA-Z0-9]*$/.test(str)) {
      setError('VALIDATION_ERROR');
    } else {
      setError(null);
    }
    changedOnce.current = true;
  }, []);

  return { value, error, onChange: handleChange };
}
