import { act, renderHook, waitFor } from '@testing-library/react';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';

describe('useValidatedInput', () => {
  const correctValue = '123456789';
  const errorMessage = {
    VALIDATION_ERROR: 'Custom validation error',
    REQUIRED: 'Custom required',
  };
  const testMock = jest.fn((str) => str === correctValue);

  describe.each([true, false, undefined])('when "required" is %s', (required) => {
    it('shows VALIDATION_ERROR if an incorrect value is initially given', () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue + '0',
          required,
          errorMessage: errorMessage,
        })
      ).result;
      expect(result.current.error).toBe('VALIDATION_ERROR');
      expect(result.current.errorMessage).toBe(errorMessage.VALIDATION_ERROR);
    });

    it('does not show VALIDATION_ERROR after the value is corrected', async () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue + '0',
          required,
          errorMessage: errorMessage,
        })
      ).result;
      act(() => result.current.onChange(correctValue));
      await waitFor(() => {
        expect(result.current.error).toBeNull();
        expect(result.current.errorMessage).toBe('');
      });
    });

    it('does not show VALIDATION_ERROR if a correct value is initially given', () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue,
          required,
          errorMessage: errorMessage,
        })
      ).result;
      expect(result.current.error).toBeNull();
      expect(result.current.errorMessage).toBe('');
    });

    it('shows VALIDATION_ERROR after the value is wrongly modified', async () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue,
          required,
          errorMessage: errorMessage,
        })
      ).result;
      act(() => result.current.onChange(correctValue + '0'));
      await waitFor(() => {
        expect(result.current.error).toBe('VALIDATION_ERROR');
        expect(result.current.errorMessage).toBe(errorMessage.VALIDATION_ERROR);
      });
    });
  });

  describe.each([true])('when "required" is %s', (required) => {
    it('shows REQUIRED error if an empty value is initially given', () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: '',
          required,
          errorMessage: errorMessage,
        })
      ).result;
      expect(result.current.error).toBe('REQUIRED');
      expect(result.current.errorMessage).toBe(errorMessage.REQUIRED);
    });

    it('does not show REQUIRED error after any value is input', async () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: '',
          required,
          errorMessage: errorMessage,
        })
      ).result;
      act(() => result.current.onChange('123'));
      await waitFor(() => {
        expect(result.current.error).not.toBe('REQUIRED');
        expect(result.current.errorMessage).not.toBe(errorMessage.REQUIRED);
      });
    });

    it('shows REQUIRED error after the value becomes empty', async () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue,
          required,
          errorMessage: errorMessage,
        })
      ).result;
      act(() => result.current.onChange(''));
      await waitFor(() => {
        expect(result.current.error).toBe('REQUIRED');
        expect(result.current.errorMessage).toBe(errorMessage.REQUIRED);
      });
    });
  });

  describe.each([false, undefined])('when "required" is %s', (required) => {
    it('does not shows REQUIRED error even if an empty value is initially given', () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: '',
          required,
          errorMessage: errorMessage,
        })
      ).result;
      expect(result.current.error).not.toBe('REQUIRED');
      expect(result.current.errorMessage).not.toBe(errorMessage.REQUIRED);
    });

    it('does not shows REQUIRED error after the value becomes empty', async () => {
      const result = renderHook(() =>
        useValidatedInput({
          test: testMock,
          value: correctValue,
          required,
          errorMessage: errorMessage,
        })
      ).result;
      act(() => result.current.onChange(''));
      await waitFor(() => {
        expect(result.current.error).not.toBe('REQUIRED');
        expect(result.current.errorMessage).not.toBe(errorMessage.REQUIRED);
      });
    });
  });
});
