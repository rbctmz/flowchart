import React, { useState, useEffect, useCallback } from 'react';
import './Flowchart.css';
import { placeholderCover } from './assets/placeholder';
// Импортируем обложки
import catch22Cover from './covers/catch22.jpg';
// import flowerscover from './covers/flowers.jpg'; // Добавляем импорт обложки

// ...добавьте другие импорты обложек по необходимости

const Flowchart = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);

  // Обновляем useEffect с правильными зависимостями
  useEffect(() => {
    const current = decisionTree[currentNode];
    if (current?.type === 'timer') {
      const timer = setTimeout(() => {
        goToNode(current.next);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentNode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Функция для перехода вперед
  const goToNode = useCallback((nextNode) => {
    setHistory(prev => [...prev, currentNode]);
    setCurrentNode(nextNode);
  }, [currentNode]);

  // Функция для перехода назад
  const goBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentNode(previousNode);
    }
  };

  const decisionTree = {
    start: {
      type: 'question',
      text: 'Итак, хочешь почитать научной фантастики?',
      options: [
        { text: 'Ну штож, давай', next: 'wantSciFi' },
        { text: 'Нет', next: 'whatAreYouDoingHere' }
      ]
    },
    whatAreYouDoingHere: {
      type: 'question',
      text: 'Ну и что ты тут делаешь?',
      options: [
        { text: 'Да хз', next: 'catch22' }
      ]
    },
    catch22: {
      type: 'result',
      text: 'Уловка 22',
      author: 'Джозеф Хеллер',
      description: 'Абсурд, чёрный юмор, не совсем фантастика, но заходит',
      cover: catch22Cover, // Используем импортированное изображение
      tags: ['классика', 'чёрный юмор', 'сатира'],
      rating: 4.8,
      yearPublished: 1961,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/168668.Catch_22',
      },
      similarBooks: ['slaughterhouse-five', 'mash']
    },
    dune: {
      type: 'result',
      text: 'Дюна',
      author: 'Фрэнк Герберт',
      description: 'Эпическая сага о пустынной планете, где сплетаются политика, религия и экология. Один из важнейших романов в истории научной фантастики.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'космическая опера', 'политика', 'философия'],
      rating: 4.8,
      yearPublished: 1965,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/44767458-dune',
      },
      similarBooks: ['Основание', 'Гиперион', 'Звезда Пандоры']
    },
    wantSciFi: {
      type: 'question',
      text: 'А ты хоть фантастику любишь?',
      options: [
        { text: 'Да!', next: 'hardSciFi' },
        { text: 'Да хз ваще', next: 'longerBooks' },
        { text: 'Да так себе', next: 'fantasy' }
      ]
    },
    tedChiang: {
      type: 'result',
      text: 'Тед Чан - История твоей жизни (наука, мозговзрыв)'
    },
    fantasy: {
      type: 'question',
      text: 'Фэнтези?',
      options: [
        { text: 'Ну может.', next: 'epicSagas' },
        { text: 'Неа', next: 'flowers' }
      ]
    },
    strugatsky: {
      type: 'result',
      text: 'Трудно быть богом',
      author: 'Аркадий и Борис Стругацкие',
      description: 'Историк с Земли под прикрытием изучает феодальное общество на другой планете. Мечи есть, драконов нет, зато много размышлений о том, можно ли изменить ход истории.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'социальная фантастика', 'средневековье', 'философия'],
      rating: 4.7,
      yearPublished: 1964,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/1853461.Hard_to_Be_a_God',
      },
      similarBooks: ['Обитаемый остров', 'За миллиард лет до конца света', 'Пикник на обочине']
    },
    epicSagas: {
      type: 'question',
      text: 'Эпичные саги и всё такое?',
      options: [
        { text: 'Ага', next: 'epicSagasExplanation' },
        { text: 'Ну это там где мечи и средневековье', next: 'strugatsky' } // Меняем путь с enderGame на strugatsky
      ]
    },
    epicSagasExplanation: {
      type: 'timer',
      text: 'Ну, космические оперы это в общем-то фэнтези в космосе',
      next: 'dune'
    },
    bookLength: {
      type: 'question',
      text: 'Две книги по 800 страниц или четыре по 400?',
      options: [
        { text: 'Две по 800', next: 'hyperion' },
        { text: 'Четыре по 400', next: 'pandoraStar' },
        { text: 'А покороче можно?', next: 'shorterBooks' }
      ]
    },
    hyperion: {
      type: 'result',
      text: 'Гиперион',
      author: 'Дэн Симмонс',
      description: 'Эпическая космическая опера о семи паломниках, отправляющихся на загадочную планету Гиперион, где их ждет встреча с полумифическим Шрайком.',
      cover: placeholderCover,
      tags: ['космическая опера', 'научная фантастика', 'ворлдбилдинг'],
      rating: 4.7,
      yearPublished: 1989,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/77566.Hyperion'
      },
      similarBooks: ['Падение Гипериона', 'Дюна', 'Основание']
    },
    pandoraStar: {
      type: 'result',
      text: 'Звезда Пандоры',
      author: 'Питер Гамильтон',
      description: 'Масштабная космическая опера о человечестве будущего, столкнувшемся с древней и могущественной угрозой из глубин космоса.',
      cover: placeholderCover,
      tags: ['космическая опера', 'научная фантастика', 'ворлдбилдинг'],
      rating: 4.5,
      yearPublished: 2004,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/45252.Pandora_s_Star'
      },
      similarBooks: ['Иуда освобожденный', 'Гиперион', 'Пространство Откровения']
    },
    windup: {
        type: 'result',
        text: 'Заводная',
        author: 'Паоло Бачигалупи',
        description: 'Ближайшее будущее, где экологические катастрофы и биотехнологии изменили мир. Истории о выживании, справедливости и надежде на лучшее.',
        cover: placeholderCover,
        tags: ['научная фантастика', 'экология', 'биотехнологии', 'приключения'],
        rating: 3.75,
        yearPublished: 2009,
        links: {
          goodreads: 'https://www.goodreads.com/book/show/6597651',
        },
        similarBooks: ['pandoraStar', 'hyperion']
    },
    longerBooks: {
      type: 'question',
      text: 'Попробуем по-другому. Хочешь подлиннее?',
      options: [
        { text: 'Можно и подлиннее', next: 'foundation' }, // Меняем путь с epicSagas на foundation
        { text: 'Нет, покороче', next: 'tedChiang' },
        { text: 'Никаких саг, одну книгу и спатки.', next: 'dystopia' }
      ]
    },
    foundation: {
      type: 'result',
      text: 'Основание',
      author: 'Айзек Азимов',
      description: 'Галактическая империя на грани краха. Математик Хари Селдон создает науку психоисторию, способную предсказать будущее человечества, и план спасения цивилизации. Первая часть масштабной саги.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'космическая опера', 'социальная фантастика', 'психоистория'],
      rating: 4.7,
      yearPublished: 1951,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/29579.Foundation',
      },
      similarBooks: ['Второе основание', 'Дюна', 'Гиперион']
    },
    hardSciFiExplanation: {
      type: 'timer',
      text: 'Это когда наука, ВЕЗДЕ НАУКА',
      next: 'hardSciFi'
    },
    hardSciFi: {
      type: 'question',
      text: 'Твёрдую НФ?',
      options: [
        { text: 'Ага', next: 'physicsBooks' },
        { text: 'Это как?', next: 'hardSciFiExplanation' }, // Изменяем путь на новый таймер
        { text: 'Не очень', next: 'future' }
      ]
    },
    physicsBooks: {
      type: 'question',
      text: 'Любишь читать учебники по квантовой физике и абстрактной?',
      options: [
        { text: 'Да, люблю мозгоеблю', next: 'egan' },
        { text: 'Не, космоса хватит', next: 'vampiresInSpace' }
      ]
    },
    egan: {
      type: 'result',
      text: 'Диаспора',
      author: 'Грег Иган',
      description: 'Постчеловеческое будущее, где сознание существует в цифровой форме. Исследование природы реальности, математики и искусственного интеллекта. Одна из самых сложных и амбициозных книг в жанре твёрдой научной фантастики.',
      cover: placeholderCover,
      tags: ['твёрдая научная фантастика', 'постчеловечество', 'математика', 'физика', 'философия'],
      rating: 4.7,
      yearPublished: 1997,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/156785.Diaspora',
      },
      similarBooks: ['Пермутационный город', 'Карантин', 'Вавилонские башни']
    },
    action: {
      type: 'question',
      text: 'Экшн?',
      options: [
        { text: 'Why not?', next: 'haldeman' },
        { text: 'Нет, хочу именно космос', next: 'directors' }  // Изменили путь
      ]
    },
    haldeman: {
      type: 'result',
      text: 'Джо Холдеман - Вечная война (война, космос, время)'
    },
    retroFuturism: {
      type: 'question',
      text: 'Ретро-футуризм!',
      options: [
        { text: 'Продолжай', next: 'nearFuture' },
        { text: 'Не, давай другое', next: 'postApocalypse' }
      ]
    },
    nearFuture: {
      type: 'question',
      text: 'Близкое будущее?',
      options: [
        { text: 'Да', next: 'dickFlow' },
        { text: 'Нет', next: 'claustrophobia' }
      ]
    },
    claustrophobia: {
      type: 'question',
      text: 'Клаустрофобия вместо космоса?',
      options: [
        { text: 'Да', next: 'wattsStarfish' },
        { text: 'Нет', next: 'postApocalypse' }
      ]
    },
    postApocalypse: {
      type: 'question',
      text: 'Мир после конца?',
      options: [
        { text: 'Валяй', next: 'orwell' },
        { text: 'Не, что-то другое', next: 'glassHalfFull' }
      ]
    },
    glassHalfFull: {
      type: 'question',
      text: 'Стакан наполовину пуст или полон?',
      options: [
        { text: 'Пуст', next: 'clarke' },
        { text: 'Полон', next: 'weir' }
      ]
    },
    clarke: {
      type: 'result',
      text: 'Артур Кларк - Свидание с Рамой (инопланетяне не как в кино)'
    },
    timerWeir: {
        type: 'timer',
        text: 'Это была ловушка. Правильный ответ всегда «Чужой».',
        next: 'weir' // куда переходим после таймера
    },
    weir: {
      type: 'result',
      text: 'Марсианин',
      author: 'Андрей Вейр',
      description: 'Выживание на Марсе',
      cover: placeholderCover, // Используем импортированное изображение
      tags: ['фантастика', 'космос', 'выживание'],
      rating: 4.5,
      yearPublished: 1966,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/18007564-the-martian',
      },
      similarBooks: ['Мозг Донны', 'Пробуждение']
    },
    flowers: {
      type: 'result',
      text: 'Цветы для Элджернона',
      author: 'Дэниел Киз',
      description: 'Научный эксперимент, эмоциональное путешествие, размышления об интеллекте и человечности',
      cover: placeholderCover, // Используем импортированное изображение
      tags: ['научная фантастика', 'психология', 'драма'],
      rating: 4.9,
      yearPublished: 1966,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/36576608-flowers-for-algernon',
      },
      similarBooks: ['Мозг Донны', 'Пробуждение']
    },
    vampiresInSpace: {
      type: 'question',
      text: 'А что если... ВАМПИРЫ... В KOCMOCE?',
      options: [
        { text: 'Охуеть. Давай!', next: 'watts' },
        { text: 'Эммм... нет', next: 'action' }
      ]
    },
    watts: {
      type: 'result',
      text: 'Ложная слепота',
      author: 'Питер Уоттс',
      description: 'Первый контакт с инопланетянами, генетически модифицированные вампиры и глубокие размышления о природе сознания. Одна из самых научных книг о вампирах в космосе.',
      cover: placeholderCover,
      tags: ['твёрдая научная фантастика', 'вампиры', 'космос', 'first contact', 'нейробиология'],
      rating: 4.6,
      yearPublished: 2006,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/48484.Blindsight',
      },
      similarBooks: ['Эхопраксия', 'Морские звёзды', 'Диаспора']
    },
    directors: {
      type: 'question',
      text: 'Ридли Скотт или Стэнли Кубрик?',
      options: [
        { text: 'Кубрик', next: 'clarke' },
        { text: 'Ридли Скотт. Гладиатор круто!', next: 'timerTest' }  // Изменили путь
      ]
    },
    scifiMovies: {
      type: 'question',
      text: '«Чужой» или «Марсианин»?',
      options: [
        { text: 'Конечно «Чужой»!', next: 'alienClaustrophobia' }, // Изменяем путь
        { text: '«Марсианин»', next: 'timerWeir' },
        { text: '«Бегущий по лезвию»!', next: 'bladeRunner' }  // Изменяем путь
      ]
    },
    alienClaustrophobia: {
      type: 'question',
      text: 'Может немного клаустрофобии вместо космоса?',
      options: [
        { text: 'Ну давай', next: 'wattsStarfish' },
        { text: 'Нет, КОСМОС!', next: 'watts' }
      ]
    },
    wattsStarfish: {
      type: 'result',
      text: 'Морские звёзды',
      author: 'Питер Уоттс',
      description: 'Научная фантастика под водой. Клаустрофобия, безумие и рифтия на глубине 3 километра.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'хоррор', 'биология', 'психологический триллер'],
      rating: 4.3,
      yearPublished: 1999,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/66479.Starfish',
      },
      similarBooks: ['Ложная слепота', 'Пандем', 'Слепое пятно']
    },
    bladeRunner: {
      type: 'question',
      text: 'Это не твердая НФ, и там даже космоса нет',
      options: [
        { text: 'Ну ладно', next: 'timerTest' },
        { text: 'Похуй', next: 'androidsDream' } 
      ]
    },

    androidsDream: {
      type: 'result',
      text: 'Мечтают ли андроиды об электроовцах?',
      author: 'Филип К. Дик',
      description: 'Постапокалиптическое будущее, где андроиды неотличимы от людей, а настоящие животные стали роскошью. История охотника за головами, который начинает сомневаться в собственной человечности.',
      cover: placeholderCover,
      tags: ['киберпанк', 'андроиды', 'постапокалипсис', 'философия'],
      rating: 4.5,
      yearPublished: 1968,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/7082.Do_Androids_Dream_of_Electric_Sheep_',
      },
      similarBooks: ['Убик', 'ВАЛИС', 'Помутнение']
    },
    timerTest: {
      type: 'timer',
      text: 'Так. Подожди.',
      next: 'scifiMovies' // куда переходим после таймера
    },
    future: {
      type: 'question',
      text: 'Хочешь про будущее?',
      options: [
        { text: 'Да', next: 'futureType' },
        { text: 'Не знаю/похуй', next: 'futureType' }
      ]
    },

    futureType: {
      type: 'question',
      text: 'Какое будущее?',
      options: [
        { text: 'Продолжай', next: 'leatherJackets' },
        { text: 'Чем дальше тем лучше', next: 'farFuture' },
        { text: 'Ретро-футуризм!', next: 'retroFutureTimer' }
      ]
    },

    leatherJackets: {
      type: 'question',
      text: 'Кожаные куртки?',
      options: [
        { text: 'Круто', next: 'gibson' },
        { text: 'Не', next: 'dickFlow' }
      ]
    },

    farFuture: {
        type: 'question',
        text: 'Как насчет пост-апокалипсиса?',
        options: [
          { text: 'Валяй', next: 'falloutQuestion' },
          { text: 'Как насчет пре-апокалипсиса?', next: 'foundation' },
          { text: 'Не очень', next: 'spaceQuestion' }
        ]
      },

    falloutQuestion: {
      type: 'question',
      text: 'Любишь Fallout?',
      options: [
        { text: 'Ага', next: 'deusIrae' },
        { text: 'Фол-что?', next: 'postman' },
        { text: 'Нет, я люблю только пост-советские шутеры', next: 'sovietTimer' }
      ]
    },

    deusIrae: {
      type: 'result',
      text: 'Господь гнева',
      author: 'Филип К. Дик и Роджер Желязны',
      description: 'Постапокалиптическая Америка после ядерной войны, где художник отправляется на поиски вдохновения для фрески. В пути он встречает воплощение бога войны и других божеств, переживших апокалипсис.',
      cover: placeholderCover,
      tags: ['постапокалипсис', 'религия', 'мифология', 'философия'],
      rating: 4.3,
      yearPublished: 1976,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/13821.Deus_Irae'
      },
      similarBooks: ['Князь Света', 'ВАЛИС', 'Убик']
    },

    sovietTimer: {
      type: 'timer',
      text: 'Специфичненько.',
      next: 'openWorld'
    },

    openWorld: {
      type: 'question',
      text: 'Open world?',
      options: [
        { text: 'Da', next: 'picnic' },
        { text: 'Niet', next: 'metro2033' }
      ]
    },

    picnic: {
      type: 'result',
      text: 'Пикник на обочине',
      author: 'Аркадий и Борис Стругацкие',
      description: 'Зона с аномалиями и артефактами, в которую ходят сталкеры. Книга, вдохновившая серию игр S.T.A.L.K.E.R.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'постапокалипсис', 'философия', 'сталкеры'],
      rating: 4.6,
      yearPublished: 1972,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/331256.Roadside_Picnic',
      },
      similarBooks: ['Трудно быть богом', 'За миллиард лет до конца света', 'Метро 2033']
    },

    metro2033: {
      type: 'result',
      text: 'Метро 2033',
      author: 'Дмитрий Глуховский',
      description: 'Постапокалиптическое метро, мутанты, аномалии и последние очаги человеческой цивилизации под землёй Москвы.',
      cover: placeholderCover,
      tags: ['постапокалипсис', 'русская фантастика', 'хоррор', 'мутанты'],
      rating: 4.5,
      yearPublished: 2005,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/17274667-metro-2033',
      },
      similarBooks: ['Метро 2034', 'Пикник на обочине', 'Хаос на пороге']
    },

    postman: {
      type: 'result',
      text: 'Почтальон',
      author: 'Дэвид Брин',
      description: 'Постапокалиптическая Америка, где одинокий странник находит старую почтовую форму и начинает восстанавливать связи между изолированными поселениями, давая людям надежду на возрождение цивилизации.',
      cover: placeholderCover,
      tags: ['постапокалипсис', 'научная фантастика', 'приключения'],
      rating: 4.1,
      yearPublished: 1985,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/889284.The_Postman',
      },
      similarBooks: ['Дорога', 'Метро 2033', 'Хаос на пороге']
    },

    chaosTimer: {
      type: 'timer',
      text: 'Умник, хули.',
      next: 'chaosEdge'
    },

    chaosEdge: {
      type: 'result',
      text: 'Хаос на пороге',
      author: 'Джон Джозеф Адамс',
      description: 'Сборник постапокалиптических историй от разных авторов. От зомби-апокалипсиса до климатических катастроф - здесь есть всё.',
      cover: placeholderCover,
      tags: ['постапокалипсис', 'антология', 'научная фантастика', 'хоррор'],
      rating: 4.3,
      yearPublished: 2010,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/7661102-wastelands',
      },
      similarBooks: ['Дорога', 'Метро 2033', 'Заводная']
    },

    gibson: {
      type: 'result',
      text: 'Распознавание образов',
      author: 'Уильям Гибсон',
      description: 'Недалекое будущее, где маркетологи охотятся за новыми трендами, а мир пропитан паранойей и цифровыми технологиями. Первая часть "Трилогии Синего муравья".',
      cover: placeholderCover,
      tags: ['киберпанк', 'недалекое будущее', 'технологии', 'паранойя'],
      rating: 4.5,
      yearPublished: 2003,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/22326.Pattern_Recognition',
      },
      similarBooks: ['Нейромант', 'Zero History', 'Spook Country']
    },

    dickFlow: {
      type: 'result',
      text: 'Помутнение',
      author: 'Филип К. Дик',
      description: 'Недалекое будущее, наркотики, паранойя и размытие границ реальности. Полицейский под прикрытием теряет связь с реальностью, расследуя распространение загадочного наркотика.',
      cover: placeholderCover,
      tags: ['киберпанк', 'наркотики', 'паранойя', 'реальность'],
      rating: 4.6,
      yearPublished: 1977,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/14817.A_Scanner_Darkly',
      },
      similarBooks: ['Убик', 'ВАЛИС', 'Мечтают ли андроиды об электроовцах?']
    },

    retroFutureTimer: {
      type: 'timer',
      text: 'Ща найдем.',
      next: 'heinlein'
    },

    heinlein: {
      type: 'result',
      text: 'Луна - суровая хозяйка',
      author: 'Роберт Хайнлайн',
      description: 'Классический ретро-футуризм о колонии на Луне, борьбе за независимость и искусственном интеллекте. Написано в 1966, но до сих пор актуально.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'ретро-футуризм', 'политика', 'революция'],
      rating: 4.7,
      yearPublished: 1966,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/16690.The_Moon_Is_a_Harsh_Mistress'
      },
      similarBooks: ['Звездный десант', 'Чужак в чужой стране', 'Гражданин галактики']
    },

    howFuture: {
      type: 'question',
      text: 'Какое будущее?',
      options: [
        { text: 'Пострашнее', next: 'annihilation' },
        { text: 'Посмешнее', next: 'hitchhiker' },
        { text: 'Ни то ни то', next: 'soulsborne' }
      ]
    },
    dystopia: {
      type: 'question',
      text: 'Дистопии норм?',
      options: [
        { text: 'Ладно', next: 'hipster' },
        { text: 'Не норм.', next: 'flowers' }
      ]
    },

    hipster: {
      type: 'question',
      text: 'Ты хипстер?',
      options: [
        { text: 'Да', next: 'zamiatin' },
        { text: 'Нет', next: 'dystopiaGlass' }
      ]
    },

    zamiatin: {
      type: 'result',
      text: 'Мы',
      author: 'Евгений Замятин',
      description: 'Первая антиутопия XX века. Математически выверенное общество будущего, где люди - лишь номера, а любовь и искусство под запретом.',
      cover: placeholderCover,
      tags: ['антиутопия', 'классика', 'философия', 'русская литература'],
      rating: 4.5,
      yearPublished: 1920,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/76171.We',
      },
      similarBooks: ['1984', 'О дивный новый мир', '451 градус по Фаренгейту']
    },

    dystopiaGlass: {
      type: 'question',
      text: 'Стакан наполовину пуст или полон?',
      options: [
        { text: 'Пуст', next: 'orwell' },
        { text: 'Полон', next: 'huxley' }
      ]
    },

    orwell: {
      type: 'result',
      text: '1984',
      author: 'Джордж Оруэлл',
      description: 'Тоталитарное будущее, где правят страх, ложь и тотальная слежка. Большой Брат следит за тобой.',
      cover: placeholderCover,
      tags: ['антиутопия', 'классика', 'политическая фантастика'],
      rating: 4.7,
      yearPublished: 1949,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/40961427-1984',
      },
      similarBooks: ['Мы', 'О дивный новый мир', 'Скотный двор']
    },

    huxley: {
      type: 'result',
      text: 'О дивный новый мир',
      author: 'Олдос Хаксли',
      description: 'Мир абсолютного счастья, где все довольны благодаря генной инженерии и наркотикам. Но какой ценой?',
      cover: placeholderCover,
      tags: ['антиутопия', 'классика', 'социальная фантастика'],
      rating: 4.6,
      yearPublished: 1932,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/5129.Brave_New_World',
      },
      similarBooks: ['1984', 'Мы', '451 градус по Фаренгейту']
    },

    annihilation: {
        type: 'result',
        text: 'Аннигиляция',
        author: 'Джефф Вандермеер',
        description: 'Жуткая и завораживающая история об экспедиции в таинственную Зону X, где законы природы не работают, а реальность искажается. Первая часть трилогии «Южный предел».',
        cover: placeholderCover,
        tags: ['научная фантастика', 'хоррор', 'странная фантастика', 'психологический триллер'],
        rating: 4.6,
        yearPublished: 2014,
        links: {
          goodreads: 'https://www.goodreads.com/book/show/17934530-annihilation',
        },
        similarBooks: ['Солярис', 'Пикник на обочине', 'Слепое пятно']
      },
    hitchhiker: {
      type: 'result',
      text: 'Автостопом по галактике',
      author: 'Дуглас Адамс',
      description: 'Невероятно смешная космическая одиссея о приключениях последнего землянина, инопланетянина-автостопщика и депрессивного робота. Ответ на главный вопрос жизни, вселенной и всего такого - 42.',
      cover: placeholderCover,
      tags: ['юмор', 'космос', 'сатира', 'абсурд'],
      rating: 4.7,
      yearPublished: 1979,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/386162.The_Hitchhiker_s_Guide_to_the_Galaxy',
      },
      similarBooks: ['Темная сторона Солнца', 'Билл - герой Галактики', 'Понедельник начинается в субботу']
    },
    soulsborne: {
      type: 'question',
      text: 'Ты как по соулсборн-играм?',
      options: [
        { text: 'Кайф', next: 'anathem' },
        { text: 'Говно', next: 'windup' }
      ]
    },

    anathem: {
      type: 'result',
      text: 'Анафем',
      author: 'Нил Стивенсон',
      description: 'Монахи-математики в другом мире изучают квантовую механику и параллельные вселенные. Сложно, но очень круто.',
      cover: placeholderCover,
      tags: ['твёрдая научная фантастика', 'философия', 'математика', 'параллельные миры'],
      rating: 4.5,
      yearPublished: 2008,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/2845024-anathem',
      },
      similarBooks: ['Криптономикон', 'Лавина', 'Вавилонские башни']
    },
    spaceQuestion: {
      type: 'question',
      text: 'Ну так чо, KOCMOC?',
      options: [
        { text: 'Ну ладно...', next: 'worldbuildingOrAtmosphere' },
        { text: 'Нет.', next: 'littleSpace' }
      ]
    },

    worldbuildingOrAtmosphere: {
      type: 'question',
      text: 'Ворлдбилдинг или атмосфера?',
      options: [
        { text: 'Ворлдбилдинг', next: 'bookLength' },
        { text: 'Атмосфера', next: 'communicationOrDeath' }
      ]
    },
    communicationOrDeath: {
      type: 'question',
      text: 'Проблемы с коммуникацией или боязнь смерти?',
      options: [
        { text: 'Ого, внезапно.', next: 'whatTheHellTimer' }
      ]
    },
    whatTheHellTimer: {
      type: 'timer',
      text: 'Ну а хули. Итак?',
      next: 'deathFear'
    },
    deathFear: {
      type: 'question',
      text: 'Боязнь смерти?',
      options: [
        { text: 'Да', next: 'gateways' },
        { text: 'Нет', next: 'solaris' }
      ]
    },

    gateways: {
      type: 'result',
      text: 'Врата',
      author: 'Фредерик Пол',
      description: 'История о людях, рискующих жизнью ради исследования древних инопланетных технологий - врат, ведущих в неизвестность.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'космос', 'психология', 'исследования'],
      rating: 4.4,
      yearPublished: 1977,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/1875.Gateway'
      },
      similarBooks: ['За синим горизонтом событий', 'Рандеву с Рамой', 'Солярис']
    },

    solaris: {
      type: 'result',
      text: 'Солярис',
      author: 'Станислав Лем',
      description: 'Классическое произведение о контакте с чуждым разумом и границах человеческого понимания.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'философия', 'психология', 'first contact'],
      rating: 4.6,
      yearPublished: 1961,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/95558.Solaris'
      },
      similarBooks: ['Эдем', 'Непобедимый', 'Возвращение со звезд']
    },
    shorterBooks: {
      type: 'question',
      text: 'Можно длиннее. Хочешь?',
      options: [
        { text: 'Да ну нахуй, все равно только первый том прочитаю', next: 'enderGame' },
        { text: 'Давай, хочу читать до конца жизни', next: 'expanse' }
      ]
    },

    enderGame: {
      type: 'result',
      text: 'Игра Эндера',
      author: 'Орсон Скотт Кард',
      description: 'История о гениальном ребёнке, которого тренируют для войны с инопланетянами. Блестящая военная стратегия, психологическая глубина и неожиданные повороты сюжета.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'военная фантастика', 'психология', 'дети'],
      rating: 4.8,
      yearPublished: 1985,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/375802.Ender_s_Game'
      },
      similarBooks: ['Тень Эндера', 'Говорящий от имени мертвых', 'Дети разума']
    },

    expanse: {
      type: 'result',
      text: 'Пробуждение Левиафана',
      author: 'Джеймс Кори',
      description: 'Первая книга масштабной космической оперы "Пространство". Человечество колонизировало Солнечную систему, но древняя угроза может положить конец всему. Детектив, политические интриги и загадки чужих технологий.',
      cover: placeholderCover,
      tags: ['научная фантастика', 'космическая опера', 'детектив', 'политика'],
      rating: 4.6,
      yearPublished: 2011,
      links: {
        goodreads: 'https://www.goodreads.com/book/show/8855321-leviathan-wakes'
      },
      similarBooks: ['Война Калибана', 'Врата Абаддона', 'Экспансия Сиби']
    },
  };

  // Обновляем стили для обложки
  // renderResult will now only render the content specific to the result, not the navigation buttons
  const renderResult = (result) => (
    <div className="result-content">
      <h2>{result.text}</h2>
      {result.author && <h3 className="author">{result.author}</h3>}
      {result.cover && (
        <div className="book-cover-container">
          <img 
            src={result.cover || placeholderCover}
            alt={`Обложка книги ${result.text}`} 
            className="book-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/covers/placeholder.jpg'; // Плейсхолдер если изображение не загрузилось
            }}
          />
        </div>
      )}
      {result.description && (
        <p className="description">{result.description}</p>
      )}
      {result.tags && (
        <div className="tags">
          {result.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      {result.rating && (
        <div className="rating">
          {"⭐".repeat(Math.floor(result.rating))}
          <span className="rating-number">({result.rating})</span>
        </div>
      )}
      {result.yearPublished && (
        <div className="year">Год издания: {result.yearPublished}</div>
      )}
      {result.links && (
        <div className="links">
          {Object.entries(result.links).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              {platform}
            </a>
          ))}
        </div>
      )}
      {result.similarBooks && (
        <div className="similar-books">
          <h4>Похожие книги:</h4>
          <ul>
            {result.similarBooks.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      )}
      {/* The navigation-buttons div below has been removed as it's now handled by the common <NavigationButtons /> component */}
    </div>
  );

  // Добавим проверку на существование узла
  const current = decisionTree[currentNode] || decisionTree['start'];

  // Обновляем обработчик кнопок в вопросах
  const handleOptionClick = (nextNode) => {
    goToNode(nextNode);
  };

  // Обновляем renderTimer без useEffect
  const renderTimer = (node) => (
    <div className="timer-content">
      <h2>{node.text}</h2>
      <div className="timer-animation"></div>
    </div>
  );

  const NavigationButtons = () => (
    <div className="navigation-buttons">
      <button
        onClick={goBack}
        className="back-button"
        disabled={history.length === 0}
      >
        ← Назад
      </button>
      <button
        onClick={() => {
          setCurrentNode('start');
          setHistory([]);
        }}
        className="restart-button"
      >
        Начать заново
      </button>
    </div>
  );

  return (
    <div className="flowchart-container">
      <div className={
        current.type === 'question' ? 'question-box' :
        current.type === 'timer' ? 'timer-box' :
        'result-box'
      }>
        {current.type === 'question' ? (
          <>
            <h2>{current.text}</h2>
            <div className="options">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option.next)}
                >
                  {option.icon && <span className="option-icon">{option.icon}</span>}
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : current.type === 'timer' ? (
          renderTimer(current)
        ) : (
          // renderResult has been modified to not include these buttons
          renderResult(current)
        )}
      </div>
      {/* Render navigation buttons for question and result types */}
      {current.type !== 'timer' && <NavigationButtons />}
    </div>
  );
};

export default Flowchart;