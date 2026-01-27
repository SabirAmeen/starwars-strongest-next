import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Matcher from './index';

// Mock next/image since it's not supported in jsdom out of the box mostly due to lazy loading optimization etc.
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Matcher Component', () => {
  const mockProps = {
    firstImage: { id: 1, name: 'Vader', image: 'vader.jpg' },
    secondImage: { id: 2, name: 'Yoda', image: 'yoda.jpg' },
    disableBtn: false,
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders two images with correct alt text', () => {
    render(<Matcher {...mockProps} />);
    const vaderImage = screen.getByAltText('Vader');
    const yodaImage = screen.getByAltText('Yoda');
    
    expect(vaderImage).toBeInTheDocument();
    expect(yodaImage).toBeInTheDocument();
  });

  it('renders two "Stronger" buttons', () => {
    render(<Matcher {...mockProps} />);
    const buttons = screen.getAllByRole('button', { name: /Stronger/i });
    expect(buttons).toHaveLength(2);
  });

  it('calls onSelect with correct IDs when a button is clicked', () => {
    render(<Matcher {...mockProps} />);
    const buttons = screen.getAllByRole('button', { name: /Stronger/i });
    
    // Click Vader's button
    fireEvent.click(buttons[0]);
    expect(mockProps.onSelect).toHaveBeenCalledWith(1, 1, 2);

    // Click Yoda's button
    fireEvent.click(buttons[1]);
    expect(mockProps.onSelect).toHaveBeenCalledWith(2, 1, 2);
  });

  it('disables buttons when disableBtn is true', () => {
    const disabledProps = { ...mockProps, disableBtn: true };
    render(<Matcher {...disabledProps} />);
    
    const buttons = screen.getAllByRole('button', { name: /Stronger/i });
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('does not call onSelect when disabled button is clicked', () => {
    const disabledProps = { ...mockProps, disableBtn: true };
    render(<Matcher {...disabledProps} />);
    
    const buttons = screen.getAllByRole('button', { name: /Stronger/i });
    fireEvent.click(buttons[0]);
    expect(mockProps.onSelect).not.toHaveBeenCalled();
  });

  it('renders nothing for an image slot if id is missing', () => {
     const incompleteProps = {
        firstImage: { name: 'Empty' }, // No ID
        secondImage: { id: 2, name: 'Yoda', image: 'yoda.jpg' },
        disableBtn: false,
        onSelect: jest.fn(),
     };
     render(<Matcher {...incompleteProps} />);
     
     // Only Yoda should be there
     expect(screen.queryByAltText('Empty')).not.toBeInTheDocument();
     expect(screen.getByAltText('Yoda')).toBeInTheDocument();
  });
});
