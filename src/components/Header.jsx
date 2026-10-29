import { Gamepad2, Heart, ShoppingCart, UserRound } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.items);
  const user = useSelector((state) => state.auth.user);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link to="/" className="brand"><span className="brand-icon"><Gamepad2 size={25} /></span><span>Gaming<span className="accent">Store</span></span></Link>
        <nav className="main-nav">
          <NavLink to="/" end>Головна</NavLink>
          <NavLink to="/products">Каталог</NavLink>
          <NavLink to="/orders">Замовлення</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="icon-link" to="/favorites" aria-label="Обране"><Heart size={20} /><span className="counter">{favorites.length}</span></Link>
          <Link className="icon-link" to="/cart" aria-label="Кошик"><ShoppingCart size={20} /><span className="counter">{cartCount}</span></Link>
          <Link className="account-link" to="/login"><UserRound size={19} /><span>{user?.name || 'Увійти'}</span></Link>
        </div>
      </div>
    </header>
  );
}
