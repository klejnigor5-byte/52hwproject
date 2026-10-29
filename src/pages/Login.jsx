import { useState } from 'react';
import { LogIn, LogOut, UserRound } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) { setError("Введіть ім'я та email."); return; }
    dispatch(login({ name: name.trim(), email: email.trim() }));
    setError('');
  };
  return <section className="container page-section login-section"><div className="login-card"><div className="login-icon"><UserRound size={30} /></div>{isAuthenticated ? <><span className="eyebrow">ТВІЙ ПРОФІЛЬ</span><h1>Привіт, {user.name}!</h1><p>Ви увійшли як {user.email}. Це демонстраційний профіль, без серверної авторизації.</p><button className="button button-ghost full-button" onClick={() => dispatch(logout())}><LogOut size={18} /> Вийти</button></> : <><span className="eyebrow">ЛАСКАВО ПРОСИМО</span><h1>Увійти до GamingStore</h1><p>Введіть ім'я та email, щоб створити демонстраційний профіль.</p><form onSubmit={submit} className="login-form">{error && <div className="form-error">{error}</div>}<label>Ім'я<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше ім'я" /></label><label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label><button className="button button-primary full-button" type="submit"><LogIn size={18} /> Увійти</button></form></>}</div></section>;
}
