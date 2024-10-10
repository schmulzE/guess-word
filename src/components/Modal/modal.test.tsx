import { render, screen } from '@testing-library/react';
import Modal from './modal';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Modal Component', () => {
  beforeEach(() => {
    // Ensure there's a div with id 'portal' in the document
    const portalDiv = document.createElement('div');
    portalDiv.id = 'portal';
    document.body.appendChild(portalDiv);
  });

  afterEach(() => {
    // Clean up the 'portal' div after each test
    const portalDiv = document.getElementById('portal');
    if (portalDiv) {
      document.body.removeChild(portalDiv);
    }
  });

  it('renders the modal when open is true', () => {
    render(
      <Modal open={true} modalClass="test-class">
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();  // The content should be rendered
  });

  it('does not render the modal when open is false', () => {
    render(
      <Modal open={false} modalClass="test-class">
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.queryByText('Modal Content');
    expect(modalContent).toBeNull();  // The content should not be rendered
  });

  it('applies the correct modalClass', () => {
    render(
      <Modal open={true} modalClass="custom-modal-class">
        <div>Modal Content</div>
      </Modal>
    );

    const modalElement = screen.getByText('Modal Content').parentElement;
    expect(modalElement).toHaveClass('custom-modal-class modal');
  });

  it('renders inside the portal element', () => {
    render(
      <Modal open={true} modalClass="test-class">
        <div>Modal Content</div>
      </Modal>
    );

    const portalDiv = document.getElementById('portal');
    const modalContent = screen.getByText('Modal Content');
    expect(portalDiv).toContainElement(modalContent);  // Ensures modal renders inside 'portal'
  });
});
