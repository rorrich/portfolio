# Документация проекта портфолио

## Обзор проекта
Портфолио-сайт с адаптивным дизайном, переключением тем и анимированными элементами. Проект использует CSS Grid для адаптивности на разных breakpoints.

## Структура файлов
```
portfolio_code/
├── index.html          # Основная HTML структура
├── css/
│   └── styles.css      # Все стили (1925 строк)
├── js/
│   └── main.js         # JavaScript функциональность (темы, анимации)
├── images/             # Изображения, SVG, видео
│   ├── burger.svg      # Иконка бургер-меню (fill="currentColor")
│   ├── cat_02.svg      # Кот в hero секции
│   ├── cat_03.svg      # Кот в футере
│   ├── arrow.svg       # Стрелки в skills-animation
│   └── picture*.webp   # Изображения работ
└── INSTRUCTIONS.md     # Базовая инструкция по запуску
```

## Критически важные технические решения

### 1. Предотвращение горизонтального скролла
**Проблема:** На разных breakpoints появлялся горизонтальный скролл из-за элементов, выходящих за границы экрана.

**Решение:**
- Добавлен `overflow-x: hidden` для `html` и `body` на всех breakpoints
- Использование `width: 100%` вместо фиксированных пикселей для адаптивных элементов
- Для fixed элементов (header) используется `left: 0; right: 0` вместо `width: 100vw`
- Все элементы с `box-sizing: border-box`

**Код:**
```css
html, body {
    overflow-x: hidden;
    max-width: 100vw;
}
```

### 2. Динамические темы
**Реализация:** Через атрибут `data-theme` на `body`:
- `default` (без атрибута)
- `dark`
- `green`
- `soft`
- `blue`

**Важно:** Все цвета должны быть определены для каждой темы, включая:
- `background-color` и `color` для `body`
- `border-bottom-color` для `.header`
- `background-color` для `.skills-track` (для динамического `box-shadow`)

### 3. SVG динамическая окраска
**Проблема:** SVG с `fill="black"` не меняли цвет при смене темы.

**Решение:**
- В SVG файлах заменить `fill="black"` на `fill="currentColor"`
- Для `<img>` тегов с SVG использовать CSS `filter` для динамической окраски
- В `main.js` обновлять цвет бургер-меню через фильтры

**Пример для burger.svg:**
```svg
<path fill="currentColor" ... />
```

**CSS для burger:**
```css
.header__burger img {
    filter: brightness(0) saturate(100%) invert(0%);
}
body[data-theme="dark"] .header__burger img {
    filter: brightness(0) saturate(100%) invert(100%);
}
```

### 4. Skills Animation - box-shadow для наклона
**Проблема:** При `transform: rotate(2deg)` на `.skills-track.aa` появлялась дырка справа.

**Решение:** Использовать `box-shadow` для визуального расширения без влияния на layout:
```css
.skills-track.aa {
    box-shadow: 20px 0 0 0 var(--skills-track-bg-color);
}
```

**Важно:** Цвет `box-shadow` должен быть динамическим и соответствовать `background-color` `.skills-track` для каждой темы.

## Breakpoints и сетки

### Desktop (> 1024px)
- **Сетка:** 12 колонок
- **Margin:** 40px
- **Gutter:** 32px
- **Тип:** grid-stretch

### Tablet Landscape (≤ 1024px)
- **Сетка:** 8 колонок
- **Margin:** 24px
- **Gutter:** 20px
- **Тип:** grid-stretch

**Ключевые размеры:**
- `.work-card.large`: 613px (hug), прибито слева
- `.work-card.medium`: 478px (hug), прибито справа
- `.work-card.small`: 478px (hug), прибито слева
- `.picture-container`, `.cat01`: 229px × 137px
- `.cat-fishing`: 229px × 185px (2 колонки)

**Типографика:**
- `h2` (title, works__title): 100px / 124px
- `h4` (work-card__title): 32px / 40px
- `b2` (about__text): 16px / 22px
- `l2` (short descriptions, contacts, header menu): 14px / 20px
- `.header__logo` иконка: 44px ширина (пропорции сохраняются)

**Особенности:**
- Убраны hover эффекты для `.work-card`
- `.header` имеет `border-bottom: 1px solid` (цвет зависит от темы)
- `.contacts` - обычный текст с подчеркиванием (без hover стрелок)
- `.title-text` элементы идут друг за другом без отступов
- `.picture-container` прибит справа (2 колонки сетки)
- Отступ между `.hero` и `.about`: 40px

### Tablet Portrait (≤ 768px)
- **Сетка:** 6 колонок
- **Margin:** 20px
- **Gutter:** 20px
- **Тип:** grid-stretch

**Ключевые размеры:**
- `.work-card.large`: 603px (5 колонок), прибито слева
- `.work-card.medium`: 479px (4 колонки), прибито справа
- `.work-card.small`: 479px (4 колонки), прибито слева
- `.picture-container`, `.cat01`: 152px × 91px (пропорции сохранены)
- `.cat-fishing`: 152px × 123px, `bottom: -38px`
- `.element` (стрелки): 28px × 28px

**Типографика:**
- `h2` (title, works__title): 80px / 100px
- `.works__title-short-desc`: padding-bottom 16px

**Особенности:**
- `.footer__info`: flex-direction: row, justify-content: space-between
- `.footer__description` слева, `.footer__contacts` справа

### Mobile (≤ 360px)
- **Сетка:** 2 колонки
- **Margin:** 12px
- **Gutter:** 20px
- **Тип:** grid-stretch

**Ключевые размеры:**
- `.header__logo`: 44px ширина (hug)
- `.header__burger`: 44px × 44px
- `.logo-picture svg`: 44px × 37px
- `.element` (стрелки): 16px × 16px
- Все `.work-card`: `width: 100%`, `grid-column: span 2`
- `.work-card__picture`: `width: 100%`, `height: auto`, `margin: 0 -12px` (на всю ширину экрана)
- Изображения работ: 336px ширина (360px - 24px), высота 220px

**Типографика:**
- `h2` (title, works__title): 48px / 60px
- `.work-card__title`: 20px / 26px
- `.work-card__type`, `.work-card__year`: 12px / 16px
- `.about__text`: 14px / 20px
- `.footer__description`: 12px / 16px
- `.header__color-changer`: 12px / 16px, padding 4px 8px

**Особенности:**
- `.header__burger` отображается, `.header__menu` скрыт
- `.header__color-changer` по центру, padding 16px по бокам
- `.picture-container` (кот в hero) скрыт
- `.works__title-short-desc` скрыт
- `.cat-fishing` скрыт
- `.contacts` статичен, без hover эффектов
- `.work-card__description` margin-top: 4px
- `.title-frame` фиксированная высота: 60px
- `.cursor` в 2 раза тоньше и на 30% короче
- `.skills-animation` padding: 24px 0
- `.skills-track.aa` margin-bottom: 60px
- `.footer` padding: 24px 0, высота auto
- `.footer__line hr`: `width: 100vw`, `margin: 40px calc(-50vw + 50%)` (на всю ширину экрана)

## Важные CSS паттерны

### Header
```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;  /* НЕ width: 100vw! */
    border-bottom: 1px solid; /* цвет зависит от темы */
}

.header__content {
    padding: 0 24px; /* для desktop */
    width: 100%;
    box-sizing: border-box;
}
```

### Work Cards
```css
/* НЕ использовать фиксированные высоты! */
.work-card__picture {
    height: auto; /* hug по размеру изображения */
}

.work-card__content {
    height: auto; /* hug */
}
```

### Skills Animation
```css
.skills-track.aa {
    transform: rotate(2deg);
    box-shadow: 20px 0 0 0 var(--skills-track-bg-color); /* динамический цвет */
}

.skills-track.bb {
    transform: rotate(-2deg);
}
```

### Container
```css
.container {
    max-width: 1840px;
    margin: 0 auto;
    padding: 0 40px; /* desktop */
}

/* В header НЕТ .container wrapper! */
```

## JavaScript функциональность

### Переключение тем (`main.js`)
- При клике на `.header__color-changer` меняется `data-theme` на `body`
- Обновляется цвет бургер-меню через CSS фильтры
- Все цвета меняются через CSS переменные и селекторы `body[data-theme="..."]`

### Анимации
- Typed text в `.title-frame`
- Skills animation (бесконечная прокрутка)
- Hover эффекты на work cards (только для desktop)

## Частые проблемы и решения

### 1. Горизонтальный скролл
**Причина:** Элементы с фиксированной шириной превышают ширину экрана.
**Решение:** Использовать `width: 100%`, `max-width: 100%`, `overflow-x: hidden` на `html`/`body`.

### 2. Header шире экрана
**Причина:** Конфликт `position: fixed`, `width: 100vw` и padding.
**Решение:** Использовать `left: 0; right: 0` вместо `width: 100vw`.

### 3. SVG не меняет цвет
**Причина:** `fill="black"` в SVG файле.
**Решение:** Заменить на `fill="currentColor"` или использовать CSS `filter` для `<img>`.

### 4. Skills animation дырка справа
**Причина:** `transform: rotate(2deg)` создает визуальную дырку.
**Решение:** Использовать `box-shadow` для визуального расширения.

### 5. Work card фиксированная высота
**Причина:** Явно заданная высота в CSS.
**Решение:** Убрать фиксированную высоту, использовать `height: auto` (hug).

## Запуск проекта

```bash
# Python HTTP Server
python3 -m http.server 8000

# Или другой порт, если 8000 занят
python3 -m http.server 8080
```

Открыть в браузере: `http://localhost:8000`

## Важные замечания

1. **НЕ использовать `width: 100vw`** для fixed элементов - вызывает горизонтальный скролл
2. **НЕ использовать фиксированные высоты** для адаптивных элементов - использовать `height: auto` (hug)
3. **Всегда проверять** отсутствие горизонтального скролла на всех breakpoints
4. **Динамические цвета** должны быть определены для всех тем
5. **SVG файлы** должны использовать `fill="currentColor"` для динамической окраски
6. **Header не имеет `.container` wrapper** - padding применяется напрямую к `.header__content`
7. **На мобильных** убраны все hover эффекты
8. **Skills animation** использует `box-shadow` для визуального расширения при наклоне

## Структура медиа-запросов

```css
/* Desktop (default) */
/* стили без медиа-запроса */

/* Tablet Landscape */
@media (max-width: 1024px) { ... }

/* Tablet Portrait */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 360px) { ... }
```

## Типографическая система

### Desktop
- `h1`, `h2`: clamp(60px, 8vw, 120px)
- `h3`, `h4`: 32px / 40px
- Body: 16px / 22px
- Small: 14px / 20px

### Tablet (1024px)
- `h2`: 100px / 124px
- `h4`: 32px / 40px
- `b2`: 16px / 22px
- `l2`: 14px / 20px

### Tablet Portrait (768px)
- `h2`: 80px / 100px

### Mobile (360px)
- `h2`: 48px / 60px
- `h3`: 20px / 26px
- Body: 14px / 20px
- Small: 12px / 16px

---

**Последнее обновление:** После исправления горизонтального скролла и добавления динамического box-shadow для skills-track



