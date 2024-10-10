import { render, screen } from '@testing-library/react';
import ScoreAnimation from './scoreAnimation';
import { describe, it, expect } from 'vitest';

describe('ScoreAnimation Component', () => {
  it('renders the +1 animation when showAnimation is true', () => {
    render(<ScoreAnimation showAnimation={true} />);
    
    const animationText = screen.getByText('+1');
    expect(animationText).toBeInTheDocument(); // +1 should be rendered
    expect(animationText).toHaveClass('score-animation'); // Ensure it has the correct class
  });

  it('does not render the +1 animation when showAnimation is false', () => {
    render(<ScoreAnimation showAnimation={false} />);
    
    const animationText = screen.queryByText('+1');
    expect(animationText).toBeNull(); // +1 should not be rendered
  });
});
