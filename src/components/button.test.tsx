import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button'; // Assuming the file is named Button.tsx
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
  const mockClickHandler = vi.fn();

  it('renders button with text and icon', () => {
    const mockIcon = <svg role="img" />;
    render(
      <Button 
        text="Click me" 
        icon={mockIcon}
        onClick={mockClickHandler} 
        className="btn-primary" 
        btnTextClass="btn-text" 
        hint="Some hint"
      />
    );
    
    const buttonElement = screen.getByRole('button');
    const iconElement = screen.getByRole('img');
    const textElement = screen.getByText('Click me');
    
    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();  // Icon should be present
    expect(textElement).toHaveClass('btn-text font-Peralta');  // Ensures btnTextClass and font-Peralta are applied
  });

  it('disables button when hint is empty', () => {
    render(
      <Button 
        text="Disabled" 
        onClick={mockClickHandler} 
        className="btn-disabled" 
        btnTextClass="btn-text" 
        hint=""
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();  // Button should be disabled
  });

  it('calls onClick handler when button is clicked', () => {
    render(
      <Button 
        text="Click me" 
        onClick={mockClickHandler} 
        className="btn-primary" 
        btnTextClass="btn-text" 
        hint="Some hint"
      />
    );
    
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    
    expect(mockClickHandler).toHaveBeenCalled();  // onClick handler should be called
  });

  it('sets aria-pressed based on pressed prop', () => {
    render(
      <Button 
        text="Toggle" 
        onClick={mockClickHandler} 
        className="btn-toggle" 
        btnTextClass="btn-text" 
        pressed={true} 
        hint="Some hint"
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-pressed', 'true');  // aria-pressed should be true
  });

  it('applies the correct classNames', () => {
    render(
      <Button 
        text="Class Test" 
        onClick={mockClickHandler} 
        className="btn-primary" 
        btnTextClass="btn-text" 
        hint="Some hint"
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn-primary');  // Button should have the className applied
  });
});
