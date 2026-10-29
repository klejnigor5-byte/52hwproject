import { ArrowRight, ShieldCheck, Truck, Headphones, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid from '../components/ProductGrid';
import StatusMessage from '../components/StatusMessage';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const featured = items.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy"><span className="eyebrow"><Zap size={15} /> ТВОЯ НАСТУПНА ПРИГОДА ПОЧИНАЄТЬСЯ ТУТ</span><h1>Грай на<br /><span>повну силу.</span></h1><p>Знаходь улюблені ігри та відкривай нові світи. Твій ігровий простір починається з GamingStore.</p><div className="hero-actions"><Link to="/products" className="button button-primary">Перейти до каталогу <ArrowRight size={18} /></Link><Link to="/products" className="button button-ghost">Дослідити</Link></div><div className="hero-stats"><div><strong>1000+</strong><span>щасливих геймерів</span></div><div><strong>24/7</strong><span>онлайн-підтримка</span></div><div><strong>100%</strong><span>любові до ігор</span></div></div></div>
          <div className="hero-art"><div className="hero-glow"></div><div className="hero-controller"><span className="controller-cross">✣</span><span className="controller-dot dot-one"></span><span className="controller-dot dot-two"></span><span className="controller-dot dot-three"></span><span className="controller-dot dot-four"></span><span className="controller-center">GS</span></div><div className="floating-card card-top"> <Zap size={17} /> GAME ON</div><div className="floating-card card-bottom"><span className="online-dot"></span> Готовий до гри?</div></div>
        </div>
      </section>
      <section className="benefits container"><div><Truck /><span><strong>Швидка доставка</strong><small>Отримуй замовлення вчасно</small></span></div><div><ShieldCheck /><span><strong>Безпечна покупка</strong><small>Твої дані під захистом</small></span></div><div><Headphones /><span><strong>Підтримка 24/7</strong><small>Ми завжди на зв'язку</small></span></div></section>
      <section className="section container"><div className="section-heading"><div><span className="eyebrow">ВИБІР ГЕЙМЕРІВ</span><h2>Популярні товари</h2><p>Знайди щось для наступної ігрової сесії.</p></div><Link className="text-link" to="/products">Увесь каталог <ArrowRight size={17} /></Link></div>
        {status === 'loading' && <StatusMessage>Завантажуємо каталог товарів…</StatusMessage>}
        {status === 'failed' && <StatusMessage action="Спробувати ще раз" onAction={() => dispatch(fetchProducts())}>{error}</StatusMessage>}
        {status === 'succeeded' && <ProductGrid products={featured} />}
      </section>
      <section className="promo container"><div><span className="eyebrow">ТВІЙ НАСТУПНИЙ РІВЕНЬ</span><h2>Готовий до нового<br />виклику?</h2><p>Переглянь каталог і знайди свій наступний фаворит.</p><Link to="/products" className="button button-primary">Обрати гру <ArrowRight size={18} /></Link></div><div className="promo-symbol">✦</div></section>
    </>
  );
}
