import React, { ComponentProps, forwardRef, useMemo } from 'react';

import { useFormContext } from '@/app/form/useFormContext';
import { TextBox } from '@/components/elements/TextBox';

type Props = ComponentProps<typeof TextBox>;

export const CommentBox = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { placeholder, ...rest } = props;

  // Looking at another component within the form.
  const {
    contractCode: { value: contractCode },
  } = useFormContext();
  const suggestion = useMemo(() => {
    if (contractCode) {
      return `Comment for #${contractCode}`;
    }
    return '';
  }, [contractCode]);

  return <TextBox {...rest} ref={ref} placeholder={suggestion || placeholder} />;
});

CommentBox.displayName = 'CommentBox';
