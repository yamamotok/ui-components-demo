import { act, renderHook, waitFor } from '@testing-library/react';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

describe('useSerialNumberInput', () => {
  const correctValue = '123456789';
  const testMock = jest.fn((str) => str === correctValue);

  describe.each([true, false])('"required" option is %s', (required) => {
    let result: { current: ReturnType<typeof useValidatedInput> };
    const errorMessage = {
      VALIDATION_ERROR: 'Custom validation error',
      REQUIRED: 'Custom required',
    };

    beforeEach(() => {
      result = renderHook(() =>
        useValidatedInput({ test: testMock, value: '', required, errorMessage })
      ).result;
    });

    it('should not return REQUIRED error even if the value is empty, unless something has not yet been entered', () => {
      expect(result.current.error).toBe(null);
    });

    it('should validate the value and return VALIDATION_ERROR if necessary', async () => {
      const incorrectValue = `${correctValue}0`;
      act(() => result.current.onChange(incorrectValue));
      await waitFor(() => result.current.value === incorrectValue);
      expect(result.current.error).toBe('VALIDATION_ERROR');
      expect(result.current.errorMessage).toBe(errorMessage.VALIDATION_ERROR);

      act(() => result.current.onChange(correctValue));
      await waitFor(() => result.current.value === correctValue);
      expect(result.current.error).toBeNull();
      expect(result.current.errorMessage).toBe('');
    });
  });

  describe('"required" option is true', () => {
    let result: { current: ReturnType<typeof useValidatedInput> };
    const errorMessage = {
      VALIDATION_ERROR: 'Custom validation error',
      REQUIRED: 'Custom required',
    };

    beforeEach(() => {
      result = renderHook(() =>
        useValidatedInput({ test: testMock, value: '', required: true, errorMessage })
      ).result;
    });

    it('should return REQUIRED error after something is entered and it becomes empty again', async () => {
      act(() => result.current.onChange('123'));
      await waitFor(() => result.current.value === '123');
      act(() => result.current.onChange(''));
      await waitFor(() => result.current.value === '');
      expect(result.current.error).toBe('REQUIRED');
      expect(result.current.errorMessage).toBe(errorMessage.REQUIRED);
    });
  });

  describe('"required" option is false', () => {
    let result: { current: ReturnType<typeof useValidatedInput> };

    beforeEach(() => {
      result = renderHook(() => useValidatedInput({ test: testMock, value: '' })).result;
    });

    it('should not return REQUIRED error even if the value is empty, unless something has not yet been entered', () => {
      expect(result.current.error).toBe(null);
    });
  });
});
