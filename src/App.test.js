import { render, screen } from '@testing-library/react';
import App from './App';

test('render container element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Container/i);
  expect(linkElement).toBeInTheDocument();
});
