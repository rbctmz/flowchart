# Рекомендатор научной фантастики

Интерактивный помощник для выбора научно-фантастической литературы.

🌐 **[Открыть приложение](https://flowchart-six.vercel.app/)**

## О проекте

Это интерактивное дерево решений, которое поможет вам выбрать книгу по вкусу. Проект использует неформальный подход к рекомендациям, учитывая не только жанровые предпочтения, но и отношение читателя к различным аспектам научной фантастики.

### Основные возможности

- Интерактивный диалог с пользователем
- Рекомендации на основе предпочтений
- Подробные описания книг
- Ссылки на Goodreads
- Списки похожих произведений
- Возможность вернуться назад
- Перезапуск диалога

### Жанры

- Твердая научная фантастика
- Космическая опера
- Киберпанк
- Постапокалипсис
- Классическая НФ

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start
```

Откройте <http://localhost:3000> в браузере.

## Технологии

- React
- JavaScript
- CSS modules

## Contributing

Если вы хотите добавить новые книги или улучшить существующие описания, создайте pull request.

## Деплой

Проект развернут на Vercel. Текущая версия доступна по адресу: [https://flowchart-[ваш-id].vercel.app](https://flowchart-[ваш-id].vercel.app)

### Локальный деплой

```bash
# Установка Vercel CLI
npm install -g vercel

# Логин
vercel login

# Деплой
vercel

# Для продакшн деплоя
vercel --prod
```

При создании нового проекта следуйте инструкциям в командной строке.

### GitHub Pages

1. Добавьте в package.json:

```json
{
  "homepage": "https://rbctmz.github.io/flowchart",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

2. Установите gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Деплой:

```bash
npm run deploy
```

### Netlify

1. Создайте аккаунт на netlify.com
2. Установите Netlify CLI:

```bash
npm install netlify-cli -g
```

3. Деплой:

```bash
netlify deploy
```

Все эти платформы предлагают:

- Автоматический деплой при пуше в репозиторий
- SSL-сертификаты
- CDN
- Интеграцию с GitHub
- Бесплатный тир для небольших проектов

Лицензия
MIT


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
