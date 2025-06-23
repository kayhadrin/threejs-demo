import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('Homepage route', () => {
  it('renders a link to the Product Editor', () => {
    render(<HomePage />);
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Open Product Editor');
    expect(link).toHaveAttribute('href', '/product/editor');
  });
});
