"use client";

import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('@/components/layout/header'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/layout/footer'), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
 return (
 <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 <DynamicHeader />
 <main>{children}</main>
 <DynamicFooter />
 </ThemeProvider>
 );
}