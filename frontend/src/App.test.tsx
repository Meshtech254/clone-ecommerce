import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import { vi } from 'vitest';

vi.mock('./assets/clonelogo.png.jpg', () => ({ default: 'clonelogo.png.jpg' }));

describe('App', () => {
  it("renders the homepage title 'Clo'ne' and slogan", () => {
    render(<App />);
    const matches = screen.getAllByText(/Clo'ne/i);
    expect(matches.length).toBeGreaterThan(0);
    const sloganMatches = screen.getAllByText(/experiencetheart/i);
    expect(sloganMatches.length).toBeGreaterThan(0);
  });
}); 