import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProductGrid from '../components/ProductGrid';
import { clearFavorites } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.favorites.items);
  return <section className="container page-section"><div className="page-title"><span className="eyebrow">ТВОЯ КОЛЕКЦІЯ</span><h1><Heart className="inline-icon" /> Обране</h1><p>Товари, які ти зберіг на потім.</p></div>{items.length ? <><div className="list-toolbar"><span>{items.length} товар(ів)</span><button className="button button-ghost button-small" onClick={() => dispatch(clearFavorites())}>Очистити обране</button></div><ProductGrid products={items} /></> : <div className="empty-state large-empty"><Heart size={42} /><h3>Поки що тут порожньо</h3><p>Додавай товари в обране, натискаючи на сердечко.</p><Link to="/products" className="button button-primary">Переглянути каталог</Link></div>}</section>;
}
