import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePageContainer, { getMatchImageList } from './HomePageContainer';

// Mock getHostUrl
vi.mock('../serverUtils/host', () => ({
  getHostUrl: async () => 'http://localhost:3000'
}));

// Mock HomePage component
vi.mock('./HomePage', () => ({
  default: ({ matchList }: any) => (
    <div data-testid="home-page">
      Mocked HomePage with first: {matchList.firstImage.name}, second: {matchList.secondImage.name}
    </div>
  )
}));

describe('HomePageContainer', () => {
  const mockImages = {
    firstImage: { id: 1, name: 'Image 1', image: 'img1.jpg' },
    secondImage: { id: 2, name: 'Image 2', image: 'img2.jpg' }
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getMatchImageList', () => {
    it('fetches images from correct URL', async () => {
      (global.fetch as any).mockResolvedValue({
        json: async () => mockImages
      });

      const result = await getMatchImageList();

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/getMatchImages', { cache: 'no-cache' });
      expect(result).toEqual(mockImages);
    });
  });

  describe('HomePageContainer', () => {
    it('fetches data and passes it to HomePage', async () => {
      (global.fetch as any).mockResolvedValue({
        json: async () => mockImages
      });

      // Directly call the async component
      const result = await HomePageContainer();
      
      // Inspect the returned React element
      // It returns <><HomePage ... /></> which is a Fragment
      // The children of the fragment is the HomePage element
      const homePageElement = result.props.children;
      
      expect(homePageElement.props.matchList).toEqual(mockImages);
    });
  });
});
