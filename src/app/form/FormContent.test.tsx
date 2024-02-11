import { ComponentProps, ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';

import { FormContent } from '@/app/form/FormContent';
import { FormContextProvider } from '@/app/form/useFormContext';

function createWrapper(initParams?: Omit<ComponentProps<typeof FormContextProvider>, 'children'>) {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => (
    <FormContextProvider {...initParams}>{children}</FormContextProvider>
  );
}

describe('FormContent', () => {
  let user: UserEvent;
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    user = userEvent.setup();
    rendered = render(<FormContent />, { wrapper: createWrapper() });
  });

  it('renders a form', () => {
    const { container } = rendered;
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('initially has submit button disabled', () => {
    const { getByRole } = rendered;
    expect(getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('enables submit button after required fields are filled', async () => {
    const { getByRole } = rendered;
    await user.type(getByRole('textbox', { name: /customer/i }), '500-11235');
    await user.type(getByRole('textbox', { name: /contract/i }), 'c20230614');
    await waitFor(() => expect(getByRole('button', { name: /submit/i })).not.toBeDisabled());
  });
});
