import { render, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import { useValidatedInput } from '@/components/elements/validated-input/useValidatedInput';
import { ValidatedInput } from '@/components/elements/validated-input/ValidatedInput';

const correctCode = '123';
const Test = (props: { showError?: boolean }) => {
  const state = useValidatedInput({ value: '', test: (v) => v === correctCode });
  return <ValidatedInput {...props} label="testing" {...state} />;
};

describe('ValidatedInput', () => {
  describe('when "showError" is true', () => {
    let user: UserEvent;
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      user = userEvent.setup();
      rendered = render(<Test showError={true} />);
    });

    it('is labeled by the given label', async () => {
      const { queryByLabelText } = rendered;
      await waitFor(() => expect(queryByLabelText('testing')).toBeInTheDocument());
    });

    it('accepts a correct code without showing an error', async () => {
      const { getByRole, queryByRole } = rendered;
      const input = getByRole('textbox') as HTMLInputElement;
      await user.type(input, correctCode);
      await waitFor(() => {
        expect(input.value).toBe(correctCode);
        expect(queryByRole('alert')).toBeNull();
      });
    });

    it('accepts an incorrect code but shows an error', async () => {
      const { getByRole, queryByRole } = rendered;
      const input = getByRole('textbox') as HTMLInputElement;
      await user.type(input, correctCode + 'x');
      await waitFor(() => expect(queryByRole('alert')).not.toBeNull());
    });
  });

  describe('when "showError" is false', () => {
    let user: UserEvent;
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      user = userEvent.setup();
      rendered = render(<Test showError={false} />);
    });

    it('is labeled by the given label', async () => {
      const { queryByLabelText } = rendered;
      await waitFor(() => expect(queryByLabelText('testing')).toBeInTheDocument());
    });

    it('accepts an incorrect code and does not show an error', async () => {
      const { getByRole, queryByRole } = rendered;
      const input = getByRole('textbox') as HTMLInputElement;
      await user.type(input, correctCode + 'x');
      await waitFor(() => expect(queryByRole('alert')).toBeNull());
    });
  });
});
