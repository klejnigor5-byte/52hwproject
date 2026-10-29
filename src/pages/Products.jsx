import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProductGrid from '../components/ProductGrid';
import StatusMessage from '../components/StatusMessage';
import { fetchProducts } from '../features/products/productsSlice';

export default function Products() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);
  const filtered = useMemo(() => {
    let list = items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') list = list.filter((item) => item.category === category);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return list;
  }, [items, search, category, sort]);

  return <section className="section container page-section"><div className="page-title"><span className="eyebrow">ЗНАЙДИ СВОЄ</span><h1>Каталог товарів</h1><p>Переглядай асортимент, шукай і фільтруй товари.</p></div>
    <div className="catalog-toolbar"><label className="search-box"><Search size={19} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Пошук товарів..." /></label><label className="filter-box"><SlidersHorizontal size={18} /><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Усі категорії</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">За замовчуванням</option><option value="price-asc">Спочатку дешевші</option><option value="price-desc">Спочатку дорожчі</option><option value="rating">За рейтингом</option></select></div>
    <div className="results-line">Знайдено товарів: <strong>{filtered.length}</strong></div>
    {status === 'loading' && <StatusMessage>Завантажуємо каталог…</StatusMessage>}
    {status === 'failed' && <StatusMessage action="Повторити" onAction={() => dispatch(fetchProducts())}>{error}</StatusMessage>}
    {status === 'succeeded' && <ProductGrid products={filtered} />}
  </section>;
}
