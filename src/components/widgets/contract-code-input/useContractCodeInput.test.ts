import { act, renderHook, waitFor } from '@testing-library/react';

import {
  ErrorMessage,
  testContractCode,
  useContractCodeInput,
} from '@/components/widgets/contract-code-input/useContractCodeInput';

describe('testContractCode', () => {
  it.each(['a12345678', 'z01236789'])(
    'returns true if the contract code is in the format "a00000000" (%s)',
    (str) => {
      expect(testContractCode(str)).toBe(true);
    }
  );

  it.each(['A12345678', 'Z01236789', 'xA12345678', 'A12345678x', 'A123456780'])(
    'returns false if the contract code is malformed (%s)',
    (str) => {
      expect(testContractCode(str)).toBe(false);
    }
  );
});

describe('useContractCode', () => {
  let result: { current: ReturnType<typeof useContractCodeInput> };

  beforeEach(() => {
    result = renderHook(() => useContractCodeInput()).result;
  });

  it('returns an error if the contract code is not in the format "a00000000"', async () => {
    const incorrectValue = '012345678';
    act(() => result.current.onChange(incorrectValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe(ErrorMessage.VALIDATION_ERROR);
    });
  });

  it('is successful if the contract code is correct.', async () => {
    const incorrectValue = '012345678';
    act(() => result.current.onChange(incorrectValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe(ErrorMessage.VALIDATION_ERROR);
    });

    const correctValue = 'a12345678';
    act(() => result.current.onChange(correctValue));
    await waitFor(() => {
      expect(result.current.errorMessage).toBe('');
    });
  });
});
