import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty-state"><h3>Нічого не знайдено</h3><p>Спробуйте змінити пошук або фільтри.</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
