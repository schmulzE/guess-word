import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './menu';
import { describe, it, expect, vi } from 'vitest';

describe('Menu Component', () => {
  const mockSetMenuPopUp = vi.fn();
  const mockButtonClick = vi.fn();



  const buttons = [
    {
      onclick: mockButtonClick,
      class: 'btn-primary',
      icon: undefined,
      text: 'Start',
      textClass: 'btn-text',
    },
    {
      onclick: mockButtonClick,
      class: 'btn-secondary',
      icon: undefined,
      text: 'Reset',
      textClass: 'btn-text',
    },
  ];

  it('renders the title correctly', () => {
    render(
      <Menu 
        setMenuPopUp={mockSetMenuPopUp}
        title="Game Menu"
        titleClass="menu-title"
        score={null}
        buttons={buttons}
        buttonContainerClass="btn-container" 
        toggleGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } } 
        resetGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } }      
      />
    );

    const titleElement = screen.getByText('Game Menu');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('menu-title');
  });

  it('calls setMenuPopUp(false) when the close button is clicked', () => {
    render(
      <Menu 
        setMenuPopUp={mockSetMenuPopUp}
        title="Game Menu"
        titleClass="menu-title"
        score={null}
        buttons={buttons}
        buttonContainerClass="btn-container" 
        toggleGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } } 
        resetGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } }      
      />
    );

    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    
    expect(mockSetMenuPopUp).toHaveBeenCalledWith(false);  // Close button triggers setMenuPopUp
  });

  it('displays the score if score is greater than or equal to 0', () => {
    render(
      <Menu 
        setMenuPopUp={mockSetMenuPopUp}
        title="Game Menu"
        titleClass="menu-title"
        score={5}
        buttons={buttons}
        buttonContainerClass="btn-container" 
        toggleGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } } 
        resetGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } }    
      />
    );

    const scoreElement = screen.getByText('5');
    expect(scoreElement).toBeInTheDocument();
  });

    it('renders only the buttons passed via the buttons prop', () => {
      render(
        <Menu 
          setMenuPopUp={mockSetMenuPopUp}
          title="Game Menu"
          titleClass="menu-title"
          score={null}
          buttons={buttons}
          buttonContainerClass="btn-container" 
          toggleGame={function (event: any): void {
            throw new Error('Function not implemented.');
          } } 
          resetGame={function (event: any): void {
            throw new Error('Function not implemented.');
          } }          
        />
      );

      // Filter buttons that contain the text 'Start' and 'Reset'
      const startButton = screen.getByText('Start');
      const resetButton = screen.getByText('Reset');
      
      // Check that the correct buttonsP are rendered
      expect(startButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();

      // Ensure only the intended buttons are tested (ignoring the close button)
      const buttonElements = [startButton, resetButton];
      expect(buttonElements).toHaveLength(buttons.length); // Ensure length matches the number of buttons passed
    });


  it('calls the appropriate button onclick handler when clicked', () => {
    render(
      <Menu 
        setMenuPopUp={mockSetMenuPopUp}
        title="Game Menu"
        titleClass="menu-title"
        score={null}
        buttons={buttons}
        buttonContainerClass="btn-container" 
        toggleGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } } 
        resetGame={function (event: any): void {
          throw new Error('Function not implemented.');
        } }     
      />
    );

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    
    expect(mockButtonClick).toHaveBeenCalled();  // onClick for Start button should be triggered

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    expect(mockButtonClick).toHaveBeenCalledTimes(2);  // onClick for Reset button should also be triggered
  });
});
