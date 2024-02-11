'use client';

import { Form } from '@/app/form/Form';
import { FormProvider } from '@/app/form/useForm';

const FormPage = () => {
  return (
    <div>
      <h1 className="py-4 text-lg">Form Page</h1>
      <p className="pb-8 leading-4 text-gray-600">This form includes several custom components.</p>
      <FormProvider>
        <Form />
      </FormProvider>
    </div>
  );
};

export default FormPage;
