import { Gamepad2, Github, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand"><span className="brand-icon"><Gamepad2 size={24} /></span><span>Gaming<span className="accent">Store</span></span></Link>
          <p>Інтернет-магазин для справжніх геймерів.</p>
        </div>
        <div className="footer-links"><strong>Навігація</strong><Link to="/products">Каталог</Link><Link to="/favorites">Обране</Link><Link to="/orders">Замовлення</Link></div>
        <div className="footer-links"><strong>Інформація</strong><a href="mailto:support@gamingstore.example">Контакти</a><span>Доставка та оплата</span><span>Підтримка</span></div>
        <div className="socials"><strong>Ми в мережі</strong><div><a href="https://github.com" aria-label="GitHub"><Github /></a><a href="https://instagram.com" aria-label="Instagram"><Instagram /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube /></a></div></div>
      </div>
      <div className="footer-bottom">© 2026 GamingStore. Усі права захищено.</div>
    </footer>
  );
}
