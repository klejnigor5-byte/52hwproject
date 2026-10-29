import { useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { fetchProducts } from '../features/products/productsSlice';
import StatusMessage from '../components/StatusMessage';

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const product = items.find((item) => item.id === Number(productId));
  const isFavorite = useSelector((state) => state.favorites.items.some((item) => item.id === Number(productId)));
  useEffect(() => { if (status === 'idle') dispatch(fetchProducts()); }, [status, dispatch]);
  if (status === 'loading' || status === 'idle') return <div className="container page-section"><StatusMessage>Завантажуємо товар…</StatusMessage></div>;
  if (!product) return <div className="container page-section"><StatusMessage>Товар не знайдено.</StatusMessage><Link className="text-link" to="/products"><ArrowLeft size={17} /> Назад до каталогу</Link></div>;
  return <section className="container page-section"><Link className="back-link" to="/products"><ArrowLeft size={17} /> Назад до каталогу</Link><div className="product-detail"><div className="detail-image"><img src={product.image} alt={product.title} /></div><div className="detail-copy"><span className="category-label">{product.category}</span><h1>{product.title}</h1><div className="product-rating"><Star size={16} fill="currentColor" /> {product.rating?.rate ?? '—'} <span>({product.rating?.count ?? 0} відгуків)</span></div><p className="detail-description">{product.description}</p><div className="detail-price">${Number(product.price).toFixed(2)}</div><div className="detail-actions"><button className="button button-primary" onClick={() => dispatch(addToCart(product))}><ShoppingCart size={19} /> Додати до кошика</button><button className={`button button-ghost ${isFavorite ? 'favorite-active' : ''}`} onClick={() => dispatch(toggleFavorite(product))}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'В обраному' : 'В обране'}</button></div><div className="detail-guarantee"><ShieldCheck size={20} /><span><strong>Покупка без зайвих турбот</strong><small>Демонстраційний навчальний магазин</small></span></div></div></div></section>;
}
