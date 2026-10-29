import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.favorites.items.some((item) => item.id === product.id));
  const rating = product.rating?.rate ?? 4.5;
  return (
    <article className="product-card">
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={() => dispatch(toggleFavorite(product))} aria-label="Додати в обране"><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      <Link to={`/products/${product.id}`} className="product-image-wrap"><img src={product.image} alt={product.title} loading="lazy" /></Link>
      <div className="product-card-body">
        <span className="category-label">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-rating"><Star size={15} fill="currentColor" /> {rating.toFixed(1)} <span>({product.rating?.count ?? 0} відгуків)</span></div>
        <div className="product-card-bottom"><strong className="price">${Number(product.price).toFixed(2)}</strong><button className="add-button" onClick={() => dispatch(addToCart(product))} aria-label="Додати до кошика"><ShoppingCart size={18} /></button></div>
      </div>
    </article>
  );
}
