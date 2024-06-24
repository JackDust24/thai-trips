import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/types';

async function ItemSuspense({
  itemGridFetcher,
}: {
  itemGridFetcher: () => Product[];
}) {
  return itemGridFetcher().map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

export default ItemSuspense;
