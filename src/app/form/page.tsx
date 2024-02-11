'use client';

import { Form } from '@/app/form/Form';

const FormPage = () => {
  return (
    <>
      <section className="pb-8">
        <h1 className="py-2 text-lg">Sample Inquiry Form</h1>
        <p className="pb-4 leading-relaxed text-gray-600">
          This is a customer support request form. Customer Code and Contract Number are required
          fields.
        </p>
        <h2 className="py-2 text-lg">Technical Background</h2>
        <p className="pb-4 leading-relaxed text-gray-600">
          This form contains multiple compound (stateful and controlled) inputs, each of which
          encapsulates a specific business rule. This is an example to demonstrate a state
          management strategy for the entire form in this situation.
        </p>
      </section>
      <section>
        <Form />
      </section>
    </>
  );
};

export default FormPage;
