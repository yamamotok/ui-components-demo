import React from 'react';

import { FormContent } from '@/app/form/FormContent';
import { FormContextProvider } from '@/app/form/useFormContext';

export const Form: React.FC = () => {
  return (
    <FormContextProvider customerCode="500-11235" contractCode="c20230614">
      <FormContent />
    </FormContextProvider>
  );
};
