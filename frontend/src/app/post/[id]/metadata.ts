// app/post/[id]/metadata.ts
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Post ${params.id} - Market O'Clock`,
    description: 'View this market analysis post',
  };
}