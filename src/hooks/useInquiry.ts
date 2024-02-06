import * as z from 'zod';
import { useRef, useState } from 'react';
import { ZodError } from 'zod';

const ProductCodeRegex = /^\d{9}$|^\d{3}-\d{7}$/;

const InquirySchema = z.object({
  productCode: z.string().regex(ProductCodeRegex, { message: 'Invalid product code' }),
  customerName: z
    .string()
    .min(1, { message: 'Customer name is required' })
    .max(100, { message: 'Customer name is too long' }),
});

export type Inquiry = z.infer<typeof InquirySchema>;

export const useInquiry = () => {
  const pending = useRef<Partial<Inquiry>>({});
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [error, setError] = useState<ZodError | null>(null);

  const update = (data: Partial<Inquiry>) => {
    const newPending = { ...pending.current, ...data };
    try {
      const parsed = InquirySchema.parse(newPending);
      setInquiry(parsed);
      setError(null);
    } catch (e) {
      setInquiry(null);
      if (e instanceof z.ZodError) {
        setError(e);
      } else {
        throw e;
      }
    } finally {
      pending.current = newPending;
    }
  };

  const reset = () => {
    update({ productCode: '', customerName: '' });
  };

  const submit = () => {
    if (!inquiry) {
      return;
    }
    console.log('submit inquiry', inquiry);
  };

  return {
    update,
    reset,
    error,
    inquiry,
    submit,
  };
};
