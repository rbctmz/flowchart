import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flowchart from './Flowchart';

// Mock decision tree for controlled testing if necessary, or use the actual one carefully
// For these initial tests, we'll rely on the component's default state and simple transitions.

describe('Flowchart Component - Unit Tests', () => {
  test('renders initial question', () => {
    render(<Flowchart />);
    // Check for the initial question text based on the 'start' node in Flowchart.jsx
    expect(screen.getByText('Итак, хочешь почитать научной фантастики?')).toBeInTheDocument();
  });

  test('restart button resets to the initial question', async () => {
    render(<Flowchart />);
    // Navigate away from the start node first
    // Option "Ну штож, давай" for 'start' node leads to 'wantSciFi'
    const initialOption = screen.getByText('Ну штож, давай');
    await userEvent.click(initialOption);

    // Verify we've moved from the start node
    // 'wantSciFi' node text: 'А ты хоть фантастику любишь?'
    expect(screen.getByText('А ты хоть фантастику любишь?')).toBeInTheDocument();

    // Find a result node to make the restart button visible
    // From 'wantSciFi', click 'Да!' to 'hardSciFi'
    await userEvent.click(screen.getByText('Да!'));
    // From 'hardSciFi', click 'Ага' to 'physicsBooks'
    await userEvent.click(screen.getByText('Ага'));
    // From 'physicsBooks', click 'Да, люблю мозгоеблю' to 'egan' (a result node)
    await userEvent.click(screen.getByText('Да, люблю мозгоеблю'));

    // 'egan' node text: 'Диаспора'
    expect(screen.getByText('Диаспора')).toBeInTheDocument();

    const restartButton = screen.getByText('Начать заново');
    expect(restartButton).toBeInTheDocument();
    await userEvent.click(restartButton);

    // Check if we are back to the initial question
    expect(screen.getByText('Итак, хочешь почитать научной фантастики?')).toBeInTheDocument();
  });

  test('goBack button navigates to the previous question', async () => {
    render(<Flowchart />);
    // Initial node: 'start'
    // Option "Ну штож, давай" for 'start' node leads to 'wantSciFi'
    const initialOption = screen.getByText('Ну штож, давай');
    await userEvent.click(initialOption);

    // Current node: 'wantSciFi', text: 'А ты хоть фантастику любишь?'
    expect(screen.getByText('А ты хоть фантастику любишь?')).toBeInTheDocument();

    // Navigate further to a result node to ensure the back button is available
    // From 'wantSciFi', click 'Да!' to 'hardSciFi'
    await userEvent.click(screen.getByText('Да!'));
     // From 'hardSciFi', click 'Ага' to 'physicsBooks'
    await userEvent.click(screen.getByText('Ага'));
    // From 'physicsBooks', click 'Да, люблю мозгоеблю' to 'egan' (a result node)
    await userEvent.click(screen.getByText('Да, люблю мозгоеблю'));

    // Current node: 'egan', text: 'Диаспора'
    expect(screen.getByText('Диаспора')).toBeInTheDocument();

    let backButton = screen.getByText('← Назад');
    expect(backButton).toBeInTheDocument();

    // First goBack: from 'egan' to 'physicsBooks'
    await userEvent.click(backButton);
    expect(screen.getByText('Любишь читать учебники по квантовой физике и абстрактной?')).toBeInTheDocument();

    // Re-query the button as the component structure might have changed
    backButton = screen.getByText('← Назад');
    // Second goBack: from 'physicsBooks' to 'hardSciFi'
    await userEvent.click(backButton);
    expect(screen.getByText('Твёрдую НФ?')).toBeInTheDocument();

    // Re-query the button
    backButton = screen.getByText('← Назад');
    // Third goBack: from 'hardSciFi' to 'wantSciFi'
    await userEvent.click(backButton);
    expect(screen.getByText('А ты хоть фантастику любишь?')).toBeInTheDocument();

    // Re-query the button
    backButton = screen.getByText('← Назад');
    // Fourth goBack: from 'wantSciFi' to 'start'
    await userEvent.click(backButton);
    expect(screen.getByText('Итак, хочешь почитать научной фантастики?')).toBeInTheDocument();

    // Check if the back button is disabled on the start node
    // Re-query the button as its state might have changed
    const finalBackButton = screen.getByText('← Назад');
    expect(finalBackButton).toBeDisabled();
  });

  describe('Flowchart Component - Integration Tests for Navigation', () => {
    test('navigates through a simple path and displays question and result nodes correctly', async () => {
      render(<Flowchart />);
      const user = userEvent.setup();

      // Start: "Итак, хочешь почитать научной фантастики?"
      expect(screen.getByText('Итак, хочешь почитать научной фантастики?')).toBeInTheDocument();

      // Option: "Ну штож, давай" -> leads to 'wantSciFi'
      let option = screen.getByText('Ну штож, давай');
      await user.click(option);

      // Node: 'wantSciFi', Question: "А ты хоть фантастику любишь?"
      expect(screen.getByText('А ты хоть фантастику любишь?')).toBeInTheDocument();
      // Check for an option specific to this node
      expect(screen.getByText('Да!')).toBeInTheDocument(); // Option for 'wantSciFi'

      // Option: "Да так себе" from 'wantSciFi' -> leads to 'fantasy'
      option = screen.getByText('Да так себе');
      await user.click(option);

      // Node: 'fantasy', Question: "Фэнтези?"
      expect(screen.getByText('Фэнтези?')).toBeInTheDocument();
      // Check for an option specific to this node
      expect(screen.getByText('Ну может.')).toBeInTheDocument(); // Option for 'fantasy'

      // Option: "Неа" from 'fantasy' -> leads to 'flowers' (result node)
      option = screen.getByText('Неа');
      await user.click(option);

      // Node: 'flowers', Result: "Цветы для Элджернона"
      // Check for book title (main text of result node)
      expect(screen.getByText('Цветы для Элджернона')).toBeInTheDocument();
      // Check for author (specific to result nodes)
      expect(screen.getByText('Дэниел Киз')).toBeInTheDocument();
      // Check for description
      expect(screen.getByText(/Научный эксперимент, эмоциональное путешествие/)).toBeInTheDocument();
      // Check for a tag
      expect(screen.getByText('психология')).toBeInTheDocument();
      // Check for a part of the GoodReads link
      expect(screen.getByRole('link', { name: /goodreads/i })).toHaveAttribute(
        'href',
        'https://www.goodreads.com/book/show/36576608-flowers-for-algernon'
      );
    });

    test('timer nodes automatically navigate to the next node', async () => {
      render(<Flowchart />);
      const user = userEvent.setup();

      // Path to a timer node:
      // start -> "Ну штож, давай" -> wantSciFi
      await user.click(screen.getByText('Ну штож, давай'));
      // wantSciFi -> "Да!" -> hardSciFi
      await user.click(screen.getByText('Да!'));
      // hardSciFi -> "Это как?" -> hardSciFiExplanation (timer node)
      await user.click(screen.getByText('Это как?'));

      // Node: 'hardSciFiExplanation' (timer), Text: "Это когда наука, ВЕЗДЕ НАУКА"
      expect(screen.getByText('Это когда наука, ВЕЗДЕ НАУКА')).toBeInTheDocument();

      // Wait for the timer (3000ms in Flowchart.jsx) to elapse and navigate
      // The text of the next node ('hardSciFi') is "Твёрдую НФ?"
      expect(await screen.findByText('Твёрдую НФ?', {}, { timeout: 3500 })).toBeInTheDocument();
    });
  });
});
