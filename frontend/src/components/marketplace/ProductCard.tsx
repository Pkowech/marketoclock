// components/marketplace/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    supplierName: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/marketplace/${product.id}`}>
      <Card className="h-full overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-square">
          <Image 
            src={product.imageUrl || '/api/placeholder/400/400'} 
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
            <Badge variant="outline" className="ml-2 shrink-0">
              {product.category}
            </Badge>
          </div>
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">{product.description}</p>
          <div className="text-sm text-gray-500">By {product.supplierName}</div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-4">
          <div className="font-bold text-lg">
            ${product.price.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}