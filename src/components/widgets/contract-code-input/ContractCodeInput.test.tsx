import { render, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import { useContractCodeInput } from '@/components/widgets/contract-code-input/useContractCodeInput';

import { ContractCodeInput } from './ContractCodeInput';

const Test = () => {
  const state = useContractCodeInput({ value: '' });
  return <ContractCodeInput {...state} />;
};

describe('ContractCodeInput', () => {
  let user: UserEvent;
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    user = userEvent.setup();
    rendered = render(<Test />);
  });

  it('accepts a correct code', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'a12345678');
    await waitFor(() => expect(input.value).toBe('a12345678'));
    await waitFor(() => expect(queryByRole('alert')).toBeNull());
  });

  it('accepts an incorrect code but shows error', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'aaa');
    await waitFor(() => expect(queryByRole('alert')).not.toBeNull());
  });
});
