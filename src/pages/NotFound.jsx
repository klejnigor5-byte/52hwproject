import { Link } from 'react-router-dom';
export default function NotFound() {
  return <section className="container page-section not-found"><strong>404</strong><h1>Сторінку не знайдено</h1><p>Можливо, посилання застаріло або сторінка не існує.</p><Link to="/" className="button button-primary">На головну</Link></section>;
}
