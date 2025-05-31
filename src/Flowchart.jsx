import React, { useState, useEffect, useCallback } from 'react';
import './Flowchart.css';
// Import the decision tree from the JSON file
import decisionTree from './decisionTree.json';
// placeholderCover and catch22Cover are no longer needed here as paths are in JSON

// ...добавьте другие импорты обложек по необходимости

const Flowchart = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [history, setHistory] = useState([]);

  // Обновляем useEffect с правильными зависимостями
  useEffect(() => {
    // decisionTree is now imported
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

  // The decisionTree object is now imported from decisionTree.json
  // const decisionTree = { ... }; // This large object is removed
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