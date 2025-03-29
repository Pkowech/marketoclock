// app/promotion/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PromotionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="https://source.unsplash.com/random/1600x900?promotion"
            alt="Promotion"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Big Promotion!</h1>
          <p className="text-xl mb-6">Pay 50% now, 50% later on all orders – limited time offer!</p>
          <Button className="bg-white text-red-500 hover:bg-gray-100">Shop Now</Button>
        </div>
      </section>
    </div>
  );
}
