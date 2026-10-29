import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../features/cart/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <section className="container page-section"><div className="page-title"><span className="eyebrow">ТВОЇ ПОКУПКИ</span><h1><ShoppingCart className="inline-icon" /> Кошик</h1><p>Перевір товари перед оформленням замовлення.</p></div>
    {!items.length ? <div className="empty-state large-empty"><ShoppingCart size={44} /><h3>Кошик порожній</h3><p>Час знайти щось цікаве для наступної гри.</p><Link className="button button-primary" to="/products">До каталогу</Link></div> :
    <div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt={item.title} /><div className="cart-item-info"><Link to={`/products/${item.id}`}>{item.title}</Link><span>${Number(item.price).toFixed(2)} за шт.</span><div className="quantity-control"><button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label="Зменшити"><Minus size={15} /></button><strong>{item.quantity}</strong><button onClick={() => dispatch(increaseQuantity(item.id))} aria-label="Збільшити"><Plus size={15} /></button></div></div><div className="cart-item-end"><strong>${(item.price * item.quantity).toFixed(2)}</strong><button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))} aria-label="Видалити"><Trash2 size={17} /></button></div></article>)}</div>
    <aside className="order-summary"><h2>Підсумок</h2><div><span>Товари ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><strong>${total.toFixed(2)}</strong></div><div><span>Доставка</span><strong className="success-text">Безкоштовно</strong></div><hr /><div className="summary-total"><span>Разом</span><strong>${total.toFixed(2)}</strong></div><Link className="button button-primary full-button" to="/checkout">Оформити замовлення</Link><Link className="continue-link" to="/products">Продовжити покупки</Link></aside></div>}
  </section>;
}
