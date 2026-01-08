import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Matcher from './index';
import { describe, it, expect, vi } from 'vitest';

describe('Matcher', () => {
  const mockProps = {
    firstImage: {
      id: 1,
      name: 'Luke Skywalker',
      image: 'Luke_Skywalker.webp',
    },
    secondImage: {
      id: 2,
      name: 'Darth Vader',
      image: 'Darth_Vader.webp',
    },
    onSelect: vi.fn(),
    disableBtn: false,
  };

  it('renders two images with names', () => {
    render(<Matcher {...mockProps} />);
    const firstImage = screen.getByAltText('Luke Skywalker');
    const secondImage = screen.getByAltText('Darth Vader');
    expect(firstImage).toBeInTheDocument();
    expect(secondImage).toBeInTheDocument();
  });

  it('calls onSelect with the correct id when the first "Stronger" button is clicked', () => {
    render(<Matcher {...mockProps} />);
    const strongerButtons = screen.getAllByText('Stronger');
    fireEvent.click(strongerButtons[0]);
    expect(mockProps.onSelect).toHaveBeenCalledWith(1, 1, 2);
  });

  it('calls onSelect with the correct id when the second "Stronger" button is clicked', () => {
    render(<Matcher {...mockProps} />);
    const strongerButtons = screen.getAllByText('Stronger');
    fireEvent.click(strongerButtons[1]);
    expect(mockProps.onSelect).toHaveBeenCalledWith(2, 1, 2);
  });

  it('disables the "Stronger" buttons when disableBtn is true', () => {
    render(<Matcher {...mockProps} disableBtn={true} />);
    const strongerButtons = screen.getAllByText('Stronger');
    strongerButtons.forEach(button => {
        expect(button).toBeDisabled();
    });
  });
});
