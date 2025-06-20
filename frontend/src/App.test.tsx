import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it("renders the store title Clo'ne", () => {
    render(<App />);
    expect(screen.getByText(/Clo'ne/i)).toBeInTheDocument();
  });
}); 