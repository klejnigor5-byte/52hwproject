# GamingStore — курсовий проєкт React + Redux Toolkit

Навчальний інтернет-магазин ігор. Побудований на React, Vite, Redux Toolkit, React Router та Axios.

## Можливості

- Каталог товарів із завантаженням через API та станами loading/error.
- Пошук, фільтрація за категорією та сортування.
- Детальна сторінка товару.
- Кошик: додавання, зміна кількості, видалення та підрахунок суми.
- Обране.
- Оформлення замовлення з простою формою.
- Сторінка замовлень у межах поточної сесії браузера.
- Демонстраційний вхід користувача.
- Redux Toolkit slices і createAsyncThunk.
- Збереження кошика, обраного, користувача та замовлень у localStorage.
- Адаптивний інтерфейс.

## Запуск

Потрібен Node.js LTS.

```bash
npm install
npm run dev
```

Vite покаже локальну адресу, зазвичай `http://localhost:5173`.

Перевірка production-збірки:

```bash
npm run build
npm run preview
```

## Структура

```text
src/
  app/store.js
  components/
  features/
    auth/authSlice.js
    cart/cartSlice.js
    favorites/favoritesSlice.js
    orders/ordersSlice.js
    products/productsSlice.js
  pages/
  services/api/baseApi.js
  App.jsx
  main.jsx
  index.css
```

## Дані API

Каталог завантажується з Fake Store API (`https://fakestoreapi.com/products`). Це демонстраційний API, тому його товари можуть бути не відеоіграми. Назви категорій і картки стилізовано під GamingStore. Якщо API недоступне, сторінка покаже повідомлення про помилку та кнопку повторного завантаження.

## Вхід

Це демонстраційна авторизація без сервера: введіть ім'я та email. Не використовуйте реальні паролі або конфіденційні дані.

## Публікація

Для GitHub створіть репозиторій і виконайте:

```bash
git init
git add .
git commit -m "Create GamingStore React Redux Toolkit project"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГІН/НАЗВА_РЕПОЗИТОРІЮ.git
git push -u origin main
```

Для Vercel/Netlify: build command — `npm run build`, output directory — `dist`.
