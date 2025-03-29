"use client";

import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('@/components/layout/header'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/layout/footer'), { ssr: false });
const DynamicToaster = dynamic(() => import('sonner').then(mod => mod.Toaster), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicHeader />
      <main className="flex-1">{children}</main>
      <DynamicFooter />
      <DynamicToaster />
    </>
  );
}