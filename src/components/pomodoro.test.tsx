import { render, screen, fireEvent } from '@testing-library/react';
import PomodoroTimer from './pomodoro';
import { describe, it, expect, vi } from 'vitest';

describe('PomodoroTimer Component', () => {
  const mockGameOver = vi.fn();
  const mockSetMinutes = vi.fn();
  const mockSetSeconds = vi.fn();
  const mockSetIsActive = vi.fn();
  const mockSetIsBreak = vi.fn();

  it('renders the timer correctly with initial minutes and seconds', () => {
    render(
      <PomodoroTimer 
        isActive={false}
        setIsActive={mockSetIsActive}
        minutes={25}
        setMinutes={mockSetMinutes}
        seconds={0}
        setSeconds={mockSetSeconds}
        isBreak={false}
        setIsBreak={mockSetIsBreak}
        gameOver={mockGameOver}
      />
    );

    const timerElement = screen.getByText('25:00');
    expect(timerElement).toBeInTheDocument();
  });

  it('starts the countdown when isActive is true', () => {
    render(
      <PomodoroTimer 
        isActive={true}
        setIsActive={mockSetIsActive}
        minutes={1}
        setMinutes={mockSetMinutes}
        seconds={59}
        setSeconds={mockSetSeconds}
        isBreak={false}
        setIsBreak={mockSetIsBreak}
        gameOver={mockGameOver}
      />
    );

    // Simulate the passage of time (e.g., wait for 1 second)
    setTimeout(() => {
      expect(mockSetSeconds).toHaveBeenCalledWith(58); // Seconds should decrease
    }, 1000);
  });

  it('pauses the countdown when isActive is false', () => {
    render(
      <PomodoroTimer 
        isActive={false}
        setIsActive={mockSetIsActive}
        minutes={1}
        setMinutes={mockSetMinutes}
        seconds={59}
        setSeconds={mockSetSeconds}
        isBreak={false}
        setIsBreak={mockSetIsBreak}
        gameOver={mockGameOver}
      />
    );

    // Simulate time interval and ensure setSeconds was not called
    setTimeout(() => {
      expect(mockSetSeconds).not.toHaveBeenCalled(); // No countdown should happen
    }, 1000);
  });

  it('calls gameOver and switches to break when time reaches 0', () => {
    render(
      <PomodoroTimer 
        isActive={true}
        setIsActive={mockSetIsActive}
        minutes={0}
        setMinutes={mockSetMinutes}
        seconds={0}
        setSeconds={mockSetSeconds}
        isBreak={false}
        setIsBreak={mockSetIsBreak}
        gameOver={mockGameOver}
      />
    );

    setTimeout(() => {
      expect(mockSetIsBreak).toHaveBeenCalledWith(true); // Switch to break
      expect(mockGameOver).toHaveBeenCalled(); // gameOver should be called
    }, 1000);
  });

  it('decreases minutes correctly when seconds reach 0', () => {
    render(
      <PomodoroTimer 
        isActive={true}
        setIsActive={mockSetIsActive}
        minutes={1}
        setMinutes={mockSetMinutes}
        seconds={0}
        setSeconds={mockSetSeconds}
        isBreak={false}
        setIsBreak={mockSetIsBreak}
        gameOver={mockGameOver}
      />
    );

    setTimeout(() => {
      expect(mockSetMinutes).toHaveBeenCalledWith(0); // Minutes should decrement
      expect(mockSetSeconds).toHaveBeenCalledWith(59); // Seconds should reset to 59
    }, 1000);
  });
});
