import React, { useEffect, useRef, useState } from 'react';

import { CommentBox } from '@/app/form/CommentBox';
import { useFormContext } from '@/app/form/useFormContext';
import { Button } from '@/components/elements/Button';
import { ContractCodeInput } from '@/components/widgets/contract-code-input/ContractCodeInput';
import { CustomerCodeInput } from '@/components/widgets/customer-code-input/CustomerCodeInput';

export const FormContent: React.FC = () => {
  const { customerCode, contractCode, comment, validForm, reset, submit } = useFormContext();
  const [inputStarted, setInputStarted] = useState(false);

  const customerCodeRef = useRef<HTMLInputElement>(null);
  const contractCodeRef = useRef<HTMLInputElement>(null);
  const commentBoxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    customerCodeRef.current?.focus();
    customerCodeRef.current && (customerCodeRef.current.onblur = () => setInputStarted(true));
    contractCodeRef.current && (contractCodeRef.current.onblur = () => setInputStarted(true));
    commentBoxRef.current && (commentBoxRef.current.onblur = () => setInputStarted(true));
  }, []);

  return (
    <form className="flex flex-col gap-8">
      <CustomerCodeInput {...customerCode} ref={customerCodeRef} showError={inputStarted} />
      <ContractCodeInput {...contractCode} ref={contractCodeRef} showError={inputStarted} />
      <CommentBox placeholder="Comment" label="Comment" {...comment} ref={commentBoxRef} />
      <div className="mt-4 flex gap-4">
        <Button
          type="submit"
          disabled={!validForm}
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Submit
        </Button>
        <Button
          type="reset"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            setInputStarted(false);
            customerCodeRef.current?.focus();
            reset();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
