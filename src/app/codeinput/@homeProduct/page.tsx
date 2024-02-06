import React from 'react';
import { HomeProductCodeInput } from '@/components/widgets/HomeProductCodeInput';

const HomeProductCodeInputSection: React.FC = () => {
  return (
    <section>
      <h2 className="mb-2 text-xl">HomeProductCodeInput as a Widget</h2>
      <div className="flex gap-2">
        <HomeProductCodeInput className="w-full" />
      </div>
    </section>
  );
};

export default HomeProductCodeInputSection;
