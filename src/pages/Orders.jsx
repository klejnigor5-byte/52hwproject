import { PackageCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Orders() {
  const orders = useSelector((state) => state.orders.items);
  const location = useLocation();
  return <section className="container page-section"><div className="page-title"><span className="eyebrow">ІСТОРІЯ ПОКУПОК</span><h1><PackageCheck className="inline-icon" /> Замовлення</h1><p>Тут зберігаються оформлені замовлення цього браузера.</p></div>{location.state?.success && <div className="success-banner"><PackageCheck size={20} /> Замовлення {location.state.success} успішно оформлено!</div>}{!orders.length ? <div className="empty-state large-empty"><PackageCheck size={44} /><h3>Замовлень ще немає</h3><p>Коли оформите покупку, вона з'явиться тут.</p><Link className="button button-primary" to="/products">Переглянути каталог</Link></div> : <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div className="order-card-head"><div><span className="muted-label">НОМЕР ЗАМОВЛЕННЯ</span><strong>{order.id}</strong></div><div><span className="muted-label">ДАТА</span><strong>{new Date(order.createdAt).toLocaleString('uk-UA')}</strong></div><div><span className="muted-label">СТАТУС</span><span className="status-pill">Прийнято</span></div><strong className="price">${Number(order.total).toFixed(2)}</strong></div><div className="order-products">{order.items.map((item) => <div key={item.id}><img src={item.image} alt={item.title} /><span>{item.title} × {item.quantity}</span></div>)}</div><p className="order-customer">Отримувач: {order.customer.name} · {order.customer.email} · {order.customer.address}</p></article>)}</div>}</section>;
}
