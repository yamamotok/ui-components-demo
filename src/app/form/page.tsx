'use client';

import { Form } from '@/app/form/Form';

const FormPage = () => {
  return (
    <div>
      <h1 className="py-4 text-lg">Form Page</h1>
      <p className="pb-8 leading-4 text-gray-600">This form includes several custom components.</p>
      <Form />
    </div>
  );
};

export default FormPage;
