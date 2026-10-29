import { useState } from 'react';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { createOrder } from '../features/orders/ordersSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', address: '' });
  const [error, setError] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (!items.length) { setError('Кошик порожній. Додайте товари перед оформленням.'); return; }
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) { setError('Заповніть усі поля.'); return; }
    const order = { id: `GS-${Date.now().toString().slice(-8)}`, createdAt: new Date().toISOString(), customer: form, items, total };
    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate('/orders', { state: { success: order.id } });
  };
  if (!items.length) return <section className="container page-section"><div className="empty-state large-empty"><h2>Немає товарів для оформлення</h2><Link className="button button-primary" to="/products">Перейти до каталогу</Link></div></section>;
  return <section className="container page-section checkout-page"><div className="page-title"><span className="eyebrow">ЩЕ ОДИН КРОК</span><h1>Оформлення замовлення</h1><p>Заповніть контактні дані. Це демонстраційне оформлення без реальної оплати.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Контактна інформація</h2>{error && <div className="form-error">{error}</div>}<label>Ім'я та прізвище<input name="name" value={form.name} onChange={update} placeholder="Ваше ім'я" /></label><label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" /></label><label>Адреса доставки<input name="address" value={form.address} onChange={update} placeholder="Місто, вулиця, будинок" /></label><button className="button button-primary full-button" type="submit"><CreditCard size={18} /> Підтвердити замовлення</button></form><aside className="order-summary"><h2>Ваше замовлення</h2>{items.map((item) => <div className="checkout-line" key={item.id}><span>{item.title} × {item.quantity}</span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}<hr /><div className="summary-total"><span>Разом</span><strong>${total.toFixed(2)}</strong></div><p className="secure-note"><CheckCircle2 size={17} /> Безпечне демонстраційне оформлення</p></aside></div></section>;
}
