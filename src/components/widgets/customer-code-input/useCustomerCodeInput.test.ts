import { act, renderHook, waitFor } from '@testing-library/react';

import {
  ErrorMessage,
  testCustomerCode,
  useCustomerCodeInput,
} from '@/components/widgets/customer-code-input/useCustomerCodeInput';

describe('testCustomerCode', () => {
  it.each(['123-45678', '000-00000'])(
    'returns true if the customer code is in the format "000-00000" (%s)',
    (str) => {
      expect(testCustomerCode(str)).toBe(true);
    }
  );

  it.each(['123-456789', '0123-45678', 'x23-45678', '123-4567x'])(
    'returns false if the customer code is malformed (%s)',
    (str) => {
      expect(testCustomerCode(str)).toBe(false);
    }
  );
});

describe('useCustomerCodeInput', () => {
  let result: { current: ReturnType<typeof useCustomerCodeInput> };

  beforeEach(() => {
    result = renderHook(() => useCustomerCodeInput()).result;
  });

  it('returns an error if the customer code is not in the format "000-00000"', async () => {
    const incorrectValue = '123456789';
    act(() => result.current.onChange(incorrectValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe(ErrorMessage.VALIDATION_ERROR);
    });
  });

  it('is successful if the customer code is correct.', async () => {
    const incorrectValue = '123456789';
    act(() => result.current.onChange(incorrectValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe(ErrorMessage.VALIDATION_ERROR);
    });

    const correctValue = '123-45678';
    act(() => result.current.onChange(correctValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe('');
    });
  });
});
