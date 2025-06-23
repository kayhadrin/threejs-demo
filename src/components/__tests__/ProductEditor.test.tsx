import { act, render, screen } from '@testing-library/react';
// @ts-expect-error: maybe related to https://github.com/testing-library/user-event/discussions/978#discussioncomment-3359165 ?
import userEvent from '@testing-library/user-event';
import ProductEditorOriginal from '../ProductEditor';
import './ProductEditorCanvasMock';
import '../3DModels/__tests__/Lazy3DModelsMock';

describe('ProductEditor component', () => {
  let ProductEditor: typeof ProductEditorOriginal;
  beforeEach(async () => {
    ProductEditor = (await import('../ProductEditor')).default;
  });

  describe('when the user selects a container material and container template', () => {
    // Warning: this test logs some console.errors but it doesn't actually fail the test expectations
    // Message looks like: `The current testing environment is not configured to support act(...)`
    it('renders a 3D model', async () => {
      const user = userEvent.setup();
      let container;
      await act(async () => {
        container = render(<ProductEditor />).container;
      });
      await act(async () => {
        await user.selectOptions(
          screen.getByRole('combobox', { name: /Container Material/i }),
          'container-material-1'
        );
      });
      await act(async () => {
        await user.click(screen.getByAltText(/Shampoo bottle/i));
      });
      expect(screen.getByTestId('lazy3DModel-ShampooBottle3DModel')).toBeVisible();
      expect(container).toMatchSnapshot();
    });
  });
});
