import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './index';
import { describe, it, expect } from 'vitest';

describe('Loader', () => {
  it('renders the loader image', () => {
    render(<Loader />);
    const loaderImage = screen.getByAltText('loader');
    expect(loaderImage).toBeInTheDocument();
  });
});
