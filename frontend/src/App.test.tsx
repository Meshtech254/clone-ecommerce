import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import { vi } from 'vitest';

vi.mock('./assets/clonelogo.png.jpg', () => ({ default: 'clonelogo.png.jpg' }));

describe('App', () => {
  it("renders the homepage title 'Clo'ne' and slogan", () => {
    render(<App />);
    expect(screen.getByText(/Clo'ne/i)).toBeInTheDocument();
    expect(screen.getByText(/experiencetheart/i)).toBeInTheDocument();
  });
}); 