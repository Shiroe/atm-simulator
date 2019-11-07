import React from 'react';
import { render } from '@testing-library/react';
import App from './app.component';

describe('App', () => {
  it('Renders without errors', () => {
    render(<App />);
  });
});
