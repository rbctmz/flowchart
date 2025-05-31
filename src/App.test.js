import { render, screen } from '@testing-library/react';
import App from './App';

// The manual mock in src/__mocks__/@vercel/analytics.js will be used automatically.

test('renders the main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/ЧЁ БЫ ПОЧИТАТЬ ИЗ ФАНТАСТИКИ?/i);
  expect(headingElement).toBeInTheDocument();
});

// Optional: Test for the presence of the Flowchart component if considered essential for App.js
// This might be better suited for a more comprehensive integration test of App.js
test('renders Flowchart component', () => {
  render(<App />);
  // We can check for an element that we know is rendered by Flowchart's initial state
  const initialFlowchartQuestion = screen.getByText('Итак, хочешь почитать научной фантастики?');
  expect(initialFlowchartQuestion).toBeInTheDocument();
});

test('renders the footer attribution', () => {
  render(<App />);
  const footerLink = screen.getByRole('link', { name: /@future_is_meow/i });
  expect(footerLink).toBeInTheDocument();
  expect(footerLink).toHaveAttribute('href', 'https://x.com/future_is_meow');
});
