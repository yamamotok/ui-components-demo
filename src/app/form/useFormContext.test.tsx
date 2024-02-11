import { ComponentProps, ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { FormContextProvider, useFormContext } from '@/app/form/useFormContext';

function createWrapper(initParams?: Omit<ComponentProps<typeof FormContextProvider>, 'children'>) {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => (
    <FormContextProvider {...initParams}>{children}</FormContextProvider>
  );
}

describe('useFormContext', () => {
  it('has empty values as default', () => {
    const { result } = renderHook(() => useFormContext(), {
      wrapper: createWrapper(),
    });
    expect(result.current.customerCode.value).toBe('');
    expect(result.current.contractCode.value).toBe('');
    expect(result.current.comment.value).toBe('');
  });

  it('has initial values assigned', () => {
    const { result } = renderHook(() => useFormContext(), {
      wrapper: createWrapper({
        customerCode: '500-11235',
        contractCode: 'c20230614',
      }),
    });
    expect(result.current.customerCode.value).toBe('500-11235');
    expect(result.current.contractCode.value).toBe('c20230614');
  });

  it('becomes valid after required fields are filled', async () => {
    const { result } = renderHook(() => useFormContext(), {
      wrapper: createWrapper(),
    });
    expect(result.current.validInput).toBe(false);
    act(() => {
      result.current.customerCode.onChange('500-11235');
      result.current.contractCode.onChange('c20230614');
    });
    await waitFor(() => expect(result.current.validInput).toBe(true));
  });

  it('reset all fields with empty values ', () => {
    const { result } = renderHook(() => useFormContext(), {
      wrapper: createWrapper({
        customerCode: '500-11235',
        contractCode: 'c20230614',
        comment: 'my test comment',
      }),
    });
    expect(result.current.customerCode.value).toBe('500-11235');
    expect(result.current.contractCode.value).toBe('c20230614');
    expect(result.current.comment.value).toBe('my test comment');
    act(() => {
      result.current.reset();
    });
    expect(result.current.customerCode.value).toBe('');
    expect(result.current.contractCode.value).toBe('');
    expect(result.current.comment.value).toBe('');
  });
});
