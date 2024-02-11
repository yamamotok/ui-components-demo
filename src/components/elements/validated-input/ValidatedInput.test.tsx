import { render, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';
import { ValidatedInput } from '@/components/elements/validated-input/ValidatedInput';

const Test = () => {
  const state = useValidatedInput({ value: '', test: (v) => v.length === 3 });
  return <ValidatedInput label="testing" {...state} />;
};

describe('ValidatedInput', () => {
  let user: UserEvent;
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    user = userEvent.setup();
    rendered = render(<Test />);
  });

  it('is labeled by the given label', async () => {
    const { queryByLabelText } = rendered;
    await waitFor(() => expect(queryByLabelText('testing')).toBeInTheDocument());
  });

  it('does not initially show an error', async () => {
    const { queryByRole } = rendered;
    await waitFor(() => expect(queryByRole('alert')).toBeNull());
  });

  it('accepts a correct code without showing an error', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, '123');
    await waitFor(() => expect(input.value).toBe('123'));
    await waitFor(() => expect(queryByRole('alert')).toBeNull());
  });

  it('accepts an incorrect code but shows an error', async () => {
    const { getByRole, queryByRole } = rendered;
    const input = getByRole('textbox') as HTMLInputElement;
    await user.type(input, '1');
    await waitFor(() => expect(queryByRole('alert')).not.toBeNull());
  });
});
