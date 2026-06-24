# Design System — numerokod.ru

Единый источник дизайн-токенов для статического сайта numerokod.ru.

## Цвета

| Token | Hex | Назначение |
|-------|-----|------------|
| `--bg-page` | `#0f0c1a` | Фон страницы |
| `--bg-block` | `#1a1530` | Фон блоков |
| `--accent-gold` | `#c8a96e` | Основной акцент, CTA, числа |
| `--accent-muted` | `#9a8b6e` | Вторичные заголовки |
| `--text-primary` | `#e8e0f0` | Основной текст |
| `--text-secondary` | `#9985b0` | Второстепенный текст |
| `--border-color` | `#2d2550` | Границы карточек и полей |

Дополнительно в компонентах:

- Кнопка hover: `#e0c992`
- Градиент кнопки: `linear-gradient(135deg, #c8a96e, #a07840)`
- Ошибка формы: `#e57373`
- Header backdrop: `rgba(15, 12, 26, 0.92)`
- Card background: `rgba(26, 21, 48, 0.7)` + `backdrop-filter: blur(10px)`

## Типографика

| Роль | Шрифт | Вес |
|------|-------|-----|
| Заголовки (h1–h4) | Playfair Display | 600–700 |
| Body, UI | DM Sans | 400–600 |

Размеры:

- h1: `2.5rem`
- h2: `1.8rem`
- h3: `1.3rem` (карточки: `1.2rem` / `1.15rem`)
- body: `1rem`, line-height `1.7`
- small: `0.85rem`

Google Fonts import: `DM Sans` (400, 500, 600) + `Playfair Display` (600, 700).

## Spacing & Layout

- Container max-width: `1100px`, padding `0 1.25rem`
- Section padding: `2.5rem 0`
- Hero padding: `3rem 0 2rem` (desktop: `4rem 0 2.5rem`)
- Grid gap: `1.5rem`
- Card padding: `1.5rem`

## Radius & Motion

- `--radius`: `12px`
- `--transition`: `0.3s ease`
- Letter-item radius: `8px`
- Progress bar radius: `6px`

## Breakpoints

| Min-width | Изменения |
|-----------|-----------|
| `768px` | Горизонтальное меню, grid 2–3 колонки, hero 2 колонки |
| `992px` | Grid статей: 4 колонки |

## Компоненты

### `.card`

Стеклянная карточка: полупрозрачный фон, blur, border, hover `translateY(-3px)`.

### `.btn`

Золотой градиент, тёмный текст, hover с тенью. Модификатор `.btn-block` — на всю ширину.

### `.form-control`

Тёмное поле, border `--border-color`, focus border gold. Ошибка: `.form-control-error` + `.form-error`.

### `.result-block`

Скрыт по умолчанию, класс `.visible` показывает результат. Число: `.result-number` (Playfair, 4rem, gold glow).

### Header

Sticky, blur, гамбургер до 768px. Кнопка меню: `aria-expanded`, `aria-controls="main-nav"`.

## Доступность

- `:focus-visible` — золотое кольцо `2px`, offset `2px` на ссылках, кнопках, полях
- `@media (prefers-reduced-motion: reduce)` — без twinkle, hover-transform, count-up анимаций
- Семантика: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

## Визуальный характер

- Тёмная «космическая» тема со звёздным фоном (CSS radial-gradient + twinkle)
- Золото как символ нумерологии, без generic purple-blue AI gradients
- Кастомные SVG-иконки калькуляторов
- Реальный русскоязычный контент, без lorem ipsum

## Файлы

- Стили: `css/style.css`
- Логика UI: `js/calculators.js`
- Логотип: `images/logo-symbol.svg` (золотая звезда)
