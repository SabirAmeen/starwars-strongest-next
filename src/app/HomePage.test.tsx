import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock useRouter
const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock Matcher component to avoid testing child implementation details
vi.mock('./components/Matcher', () => ({
  default: ({ onSelect, firstImage, secondImage, disableBtn }: any) => (
    <div data-testid="matcher">
      <div data-testid="first-image">{firstImage?.name}</div>
      <div data-testid="second-image">{secondImage?.name}</div>
      <button 
        data-testid="select-btn-1" 
        onClick={() => onSelect(firstImage.id, firstImage.id, secondImage.id)}
        disabled={disableBtn}
      >
        Select {firstImage?.name}
      </button>
    </div>
  ),
}));

// Mock Loader component
vi.mock('./components/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('HomePage', () => {
  const mockProps = {
    matchList: {
      firstImage: { id: 1, name: 'Luke', image: 'luke.jpg' },
      secondImage: { id: 2, name: 'Vader', image: 'vader.jpg' },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly with initial props', () => {
    render(<HomePage {...mockProps} />);
    
    expect(screen.getByText('Who is the strongest?')).toBeInTheDocument();
    expect(screen.getByTestId('matcher')).toBeInTheDocument();
    expect(screen.getByTestId('first-image')).toHaveTextContent('Luke');
    expect(screen.getByTestId('second-image')).toHaveTextContent('Vader');
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('shows loader and calls API when image is selected', async () => {
    // Mock successful fetch response
    const mockResponse = {
      firstImage: { id: 3, name: 'Yoda', image: 'yoda.jpg' },
      secondImage: { id: 4, name: 'Obi-Wan', image: 'obi.jpg' },
    };
    
    (global.fetch as any).mockResolvedValue({
      json: async () => mockResponse,
    });

    render(<HomePage {...mockProps} />);
    
    // Click select button
    fireEvent.click(screen.getByTestId('select-btn-1'));
    
    // Check loader appears
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    
    // Check fetch called correctly
    expect(global.fetch).toHaveBeenCalledWith(`${window.location.origin}/updateCharacter`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        winner: 1,
        firstImageID: 1,
        secondImgId: 2
        }),
        cache: 'no-cache'
    });

    // Wait for state update and check results
    await waitFor(() => {
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        expect(mockRefresh).toHaveBeenCalled();
        expect(screen.getByTestId('first-image')).toHaveTextContent('Yoda');
        expect(screen.getByTestId('second-image')).toHaveTextContent('Obi-Wan');
    });
  });

  it('hides loader even if API fails', async () => {
    (global.fetch as any).mockRejectedValue(new Error('API Error'));

    render(<HomePage {...mockProps} />);
    
    fireEvent.click(screen.getByTestId('select-btn-1'));
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
       expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
