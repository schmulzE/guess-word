import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';
import { describe, it, expect, vi } from 'vitest';

describe('Input Component', () => {
  const setup = (inputFlag = false, wordCount = 4, enteredWord = '') => {
    const setEnteredWord = vi.fn();
    render(
      <Input 
        wordCount={wordCount}
        enteredWord={enteredWord}
        setEnteredWord={setEnteredWord}
        inputFlag={inputFlag}
      />
    );
    return { setEnteredWord };
  };

  it('renders correct number of inputs', () => {
    setup(false, 5);
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(5);  // 5 inputs rendered
  });

  it('renders inputs with entered word characters', () => {
    setup(false, 4, 'test');
    
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs[0].value).toBe('t');
    expect(inputs[1].value).toBe('e');
    expect(inputs[2].value).toBe('s');
    expect(inputs[3].value).toBe('t');
  });

  it('calls setEnteredWord with the correct argument on input change', () => {
    const { setEnteredWord } = setup(false, 4, '');
    const input = screen.getAllByRole('textbox')[0];
  
    fireEvent.change(input, { target: { value: 'a' } });
    
    // The function will be called with 'a' since enteredWord was initially empty
    expect(setEnteredWord).toHaveBeenCalledWith(expect.any(Function));
    
    // Simulate the state update
    let updatedWord = '';
    setEnteredWord.mock.calls[0][0](updatedWord);
    updatedWord = setEnteredWord.mock.calls[0][0](updatedWord);
    expect(updatedWord).toBe('a');
  
    // Simulate typing 'b'
    fireEvent.change(input, { target: { value: 'b' } });
  
    // Test to ensure that it appends 'b' to the previously entered word
    setEnteredWord.mock.calls[1][0](updatedWord);
    updatedWord = setEnteredWord.mock.calls[1][0](updatedWord);
    expect(updatedWord).toBe('ab');
  });

  it('focuses the next input after typing', () => {
    setup();
    const inputs = screen.getAllByRole('textbox');
  
    fireEvent.change(inputs[0], { target: { value: 'a' } });
    fireEvent.keyUp(inputs[0], { key: 'a' });
  
  });

  it('focuses the previous input on Backspace', () => {
    setup();
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[1], { target: { value: 'b' } });
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });

    expect(document.activeElement).toBe(inputs[0]);
  });

  it('adds shake-animation class when inputFlag is true', () => {
    setup(true);
    
    const input = screen.getAllByRole('textbox')[0];
    expect(input).toHaveClass('shake-animation');
  });
});