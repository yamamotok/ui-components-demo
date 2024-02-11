import { render, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import { CustomerCodeInput } from '@/components/widgets/customer-code-input/CustomerCodeInput';
import { useCustomerCodeInput } from '@/components/widgets/customer-code-input/useCustomerCodeInput';

const Test = () => {
  const state = useCustomerCodeInput({ value: '' });
  return <CustomerCodeInput {...state} />;
};

describe('CustomerCodeInput', () => {
  let user: UserEvent;
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    user = userEvent.setup();
    rendered = render(<Test />);
  });

  it('accepts a correct code', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, '123-45678');
    await waitFor(() => expect(input.value).toBe('123-45678'));
    await waitFor(() => expect(queryByRole('alert')).toBeNull());
  });

  it('accepts an incorrect code but shows error', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, '12345678-');
    await waitFor(() => expect(queryByRole('alert')).not.toBeNull());
  });
});
