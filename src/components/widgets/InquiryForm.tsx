'use client';
import React from 'react';

import { Button } from '@/components/elements/Button';
import { TextInput } from '@/components/elements/TextInput';
import { ProductCodeInput } from '@/components/widgets/ProductCodeInput';
import { useInquiry } from '@/hooks/useInquiry';

export const InquiryForm: React.FC = () => {
  const { update, reset, inquiry, submit } = useInquiry();

  const handleSubmit = () => {
    if (inquiry) {
      submit();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">Inquiry Form</h1>
      <ProductCodeInput onChange={(productCode) => update({ productCode })} />
      <div>
        <TextInput
          placeholder="Your name"
          maxLength={100}
          className="w-full"
          value={inquiry ? inquiry.customerName : ''}
          onChange={(customerName) => update({ customerName })}
        />
      </div>
      <div className="flex gap-1.5">
        <Button onClick={handleSubmit} disabled={!inquiry}>
          Submit
        </Button>
        <Button variant="secondary" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
