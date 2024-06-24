import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { Suspense } from 'react';
import data from '@/app/_mocks/mockItemData.json';
import { Product } from '@/types/types';

// const getProducts = cache(() => {
//     return db.product.findMany({
//       where: { isAvailableForPurchase: true },
//       orderBy: { name: 'asc' },
//     });
//   }, ['/products', 'getProducts']);

const getProducts = (): Product[] => {
  return data.products.filter((product) => {
    product.isAvailableForPurchase === true;
  }) satisfies Product[];
};

export default function ProductsPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

function ProductsSuspense() {
  const products = getProducts();

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
