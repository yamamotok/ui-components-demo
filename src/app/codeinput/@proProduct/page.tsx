import React from 'react';
import { ProProductCodeInput } from '@/components/widgets/ProProductCodeInput';

const ProProductCodeInputSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-2 text-xl">ProProductCodeInput as a Widget</h2>
      <div className="flex gap-2">
        <ProProductCodeInput className="w-full" />
      </div>
    </section>
  );
};

export default ProProductCodeInputSection;
