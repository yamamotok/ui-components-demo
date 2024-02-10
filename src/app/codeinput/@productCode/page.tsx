import React from 'react';

import { ProductCodeInput } from '@/components/widgets/ProductCodeInput';

const ProductCodeInputSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-2 text-xl">ProductCodeInput as a Compound Widget</h2>
      <div className="flex gap-2">
        <ProductCodeInput className="w-full" />
      </div>
    </section>
  );
};

export default ProductCodeInputSection;
