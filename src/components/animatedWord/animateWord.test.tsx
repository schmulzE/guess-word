import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AnimatedWord from './animatedWord';

describe('AnimatedWord', () => {
  beforeEach(() => {
    // Mock Math.random to always return 0 for consistent test results
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('renders the word correctly', () => {
    render(<AnimatedWord word="Hello" />);
    expect(screen.getByText((content, element) => {
      const hasText = (node: Element | null) => node!.textContent === "Hello";
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element!.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });

  it('splits the word into individual characters', () => {
    render(<AnimatedWord word="Test" />);
    const characters = screen.getAllByText(/[A-Za-z]/);
    expect(characters).toHaveLength(4);
    expect(characters[0]).toHaveTextContent('T');
    expect(characters[1]).toHaveTextContent('e');
    expect(characters[2]).toHaveTextContent('s');
    expect(characters[3]).toHaveTextContent('t');
  });

  it('applies the correct CSS classes for animation', () => {
    const { container } = render(<AnimatedWord word="Animate" />);

    // Find the outermost div that contains the word
    const animatedWordDiv = Array.from(container.querySelectorAll('div'))
      .find(div => div.textContent === 'Animate');

    expect(animatedWordDiv).toBeTruthy();
    
    if (animatedWordDiv) {
      expect(animatedWordDiv).toHaveClass('animated-word');

      // Check if one of the animation classes is applied
      const animationClasses = ['stagger', 'fadeIn', 'popUp', 'rotateIn', 'slideIn'];
      const hasAnimationClass = animationClasses.some(className => 
        animatedWordDiv.classList.contains(className)
      );
      expect(hasAnimationClass).toBe(true);

      // Check that each character is in its own span
      const characters = within(animatedWordDiv).getAllByText(/[A-Za-z]/);
      expect(characters).toHaveLength(7); // "Animate" has 7 characters
      characters.forEach((char: { tagName: string; }, index: number) => {
        expect(char.tagName.toLowerCase()).toBe('span');
        expect(char).toHaveStyle(`animation-delay: ${index * 0.1}s`);
      });
    }
  });

  it('applies animation delay to each character', () => {
    render(<AnimatedWord word="Delay" />);
    const characters = screen.getAllByText(/[A-Za-z]/);
    characters.forEach((char, index) => {
      expect(char).toHaveStyle(`animation-delay: ${index * 0.1}s`);
    });
  });

  it('renders empty string without errors', () => {
    const { container } = render(<AnimatedWord word="" />);
    
    // Check if the component renders anything at all
    if (container.firstChild) {
      // If it does render something, it should be an empty element
      expect(container.firstChild).toHaveTextContent('');
      expect(container.firstChild.childNodes).toHaveLength(0);
    } else {
      // If it doesn't render anything, that's also acceptable
      expect(container.childNodes).toHaveLength(0);
    }
  });
});