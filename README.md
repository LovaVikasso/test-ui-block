# Test UI Block

Небольшая витрина компонентов на React + TypeScript (Vite) с вниманием к UX деталей: кастомное выделение текста в инпутах/текст-области, адаптивная верстка блока с индикатором количества, аккуратные стили и линтинг.

## Технологии

- React 19 + TypeScript 5
- Vite 5
- Radix UI Themes (TextField, TextArea)
- SCSS-модули
- ESLint + Prettier (строгие правила, автоформат)

## Быстрый старт

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Линтинг и форматирование

- `npm run lint` — проверить код
- `npm run lint:fix` — исправить автофиксируемые ошибки
- `npm run format` — форматировать Prettier'ом
- `npm run format:check` — проверить форматирование

Настроены плагины: React, React Hooks, jsx-a11y, import, prettier. Импорты сортируются и группируются автоматически, строгие правила по типам и JSX.

## Структура проекта

```
src/
├── assets/
│   ├── images/
│   └── styles/
│       └── reset.scss
├── components/
│   ├── Block/
│   │   ├── Block.module.scss
│   │   └── index.tsx
│   ├── Icons/
│   │   ├── IconOptions.tsx
│   │   └── index.ts
│   ├── Indicator/
│   │   ├── ActiveButton.tsx
│   │   ├── Indicator.module.scss
│   │   └── index.tsx
│   ├── Input/
│   │   ├── Input.module.scss
│   │   └── index.tsx
│   └── TextArea/
│       ├── TextArea.module.scss
│       └── index.tsx
├── types/
│   └── index.ts
├── utils/
│   └── useLineCount.tsx
├── App.module.scss
├── App.tsx
├── main.tsx
└── index.css
```

## Компоненты

### Input
Обертка над `@radix-ui/themes` `TextField.Root` с единым стилем, лейблом и поддержкой нативных пропсов `input`.

API:

```ts
interface InputProps extends Omit<
  ComponentProps<'input'>,
  'color' | 'size' | 'value' | 'defaultValue' | 'slot'
> {
  value?: string | number;
  placeholder?: string;
  label?: string;
  className?: string;
  type?: 'number' | 'text';
}
```

Использование:

```tsx
import { Input } from './components/Input';

<Input
  label="Text"
  placeholder="Your text"
  value={value}
  onChange={e => setValue(e.currentTarget.value)}
/>
```

Особенности стилей:
- В `src/components/Input/Input.module.scss` добавлены правила `::selection` и `::-moz-selection` для подсветки выделенного текста в `input` и `textarea` (синий фон, белый текст).
- Убраны лишние контуры `outline/box-shadow` у Radix `TextField.Root` через селектор `[data-radix-text-field-root]`.

### TextArea
Обертка над `@radix-ui/themes` `TextArea` с поддержкой лейбла и единым стилем (переиспользует `Input.module.scss`).

API:

```ts
interface CustomTextAreaProps
  extends Omit<ComponentProps<typeof RadixTextArea>, 'size' | 'variant'> {
  label?: string;
  error?: string;
  className?: string;
}
```

Использование:

```tsx
import { TextArea } from './components/TextArea';

<TextArea
  label="Description"
  placeholder="Type here..."
  value={text}
  onChange={e => setText(e.currentTarget.value)}
/>
```

Подсветка выделенного текста также работает за счет общих правил в `Input.module.scss`.

### Block
Контейнер, отображающий текст или карточку с изображением и индикатором количества. Умно резервирует место под индикатор, чтобы последний не наезжал на текст последней строки.

API:

```ts
export type BlockVariant = 'text' | 'image';

type Props = {
  variant?: BlockVariant;      // 'text' (по умолчанию) или 'image'
  text: string;                // текст контента
  imageSrc?: string;           // картинка для variant='image'
  count?: number;              // число для индикатора (отображается > 0)
  activeIndicator?: boolean;   // активное состояние индикатора ('+' перед числом)
};
```

Поведение:
- Хук `useLineCount(text)` измеряет количество строк текста внутри контейнера по `scrollHeight/lineHeight` и возвращает `{ ref, lines }`.
- Вычисляется `indicatorReserve` (в пикселях) в зависимости от `count`, чтобы зарезервировать ширину под индикатор справа. Резерв задается через CSS-переменную `--indicatorReserve` на корневом `div` контента.
- Если текст в одну строку и индикатор не помещается — добавляется «бамп» высоты, чтобы не происходил наезд.
- Для `variant="image"` рендерится миниатюра через `<picture>`; выравнивание контента корректируется при малом числе строк.

Использование:

```tsx
import { Block } from './components/Block';

<Block text={text} count={count} activeIndicator={active} />
<Block text={text} count={count} activeIndicator={active} variant="image" imageSrc="/images/001.jpg" />
```

### Indicator
Компактный индикатор количества. Если `active=true`, добавляет префикс `+`. При больших значениях ограничивает показ до `9999`.

```tsx
<Indicator count={count} active={active} />
```

### ActiveButton
Кнопка-переключатель состояния индикатора (демо в `App.tsx`).

```tsx
<ActiveButton active={active} toggle={toggleActive} />
```

## Утилиты

### useLineCount(text: string)
Возвращает ref для контейнера и количество строк текста внутри него.

```ts
const { ref, lines } = useLineCount(text);
```

- Основан на `getComputedStyle(line-height)` и `scrollHeight`.
- Пересчет происходит при изменении `text`.

## Стили и UX-детали

- Подсветка выделенного текста в `input/textarea` реализована в `src/components/Input/Input.module.scss`:
  - `::selection` (все браузеры)
  - `::-moz-selection` (Firefox)
  - Цвета по умолчанию: фон `#007aff`, текст `#fff`. Можно заменить на свои.
- Для `TextArea` переиспользуются стили `Input.module.scss` — единый визуальный язык.
- В `Indicator` предусмотрены классы для активного состояния и non-absolute варианта для кнопки.

## Кастомизация

- Изменить цвет выделения текста: правьте в `src/components/Input/Input.module.scss` правила `::selection`.
- Переопределить размеры полей: селекторы `.input input, textarea` и `.input textarea` в том же файле.
- Поменять алгоритм резерва под индикатор: переменные `base`, `perDigit`, `gap` в `components/Block/index.tsx`.
- Ограничение индикатора `9999`: правится в `components/Indicator/index.tsx`.

## Известные ограничения

- Подсчет строк (`useLineCount`) зависит от реального рендера и `line-height`; при динамическом ресайзе контейнера без изменения текста может потребоваться расширить список зависимостей эффекта.
- Для Radix-компонентов применяется проп-спрединг ради прозрачной прокидки нативных атрибутов — линтер помечает это как предупреждение (ожидаемо).
- `TextArea.module.scss` сейчас пуст — стили берет из `Input.module.scss`.

## Пример из `App.tsx`

```tsx
import { type ChangeEvent, useState } from 'react';
import s from './App.module.scss';
import './assets/styles/reset.scss';
import { Block } from './components/Block';
import { ActiveButton } from './components/Indicator/ActiveButton.tsx';
import { Input } from './components/Input';
import { TextArea } from './components/TextArea';

function App() {
  const [text, setText] = useState('Простой начальный текст');
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(true);

  return (
    <div className={s.container}>
      <div className={s.control}>
        <Input label="Text" placeholder="Text" value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)} />
      </div>
      <div className={s.control}>
        <Input label="Indicator" placeholder="Indicator" type="number" value={count} onChange={(e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.currentTarget.value))} />
        <ActiveButton active={active} toggle={() => setActive(!active)} />
      </div>
      <div className={s.control}>
        <TextArea value={text} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.currentTarget.value)} />
      </div>
      <div className={s.list}>
        <Block text={text} count={count} activeIndicator={active} />
      </div>
    </div>
  );
}

export default App;
```

## Разработка

- Следите за порядком импортов — он автоматически проверяется и фиксируется (`import/order`).
- Избегайте `any` — включены строгие правила TypeScript.
- Перед коммитом рекомендуем: `npm run lint:fix && npm run format`.

## Лицензия

MIT
