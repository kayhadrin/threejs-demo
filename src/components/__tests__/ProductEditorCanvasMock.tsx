import ProductEditorCanvasOriginal from '../ProductEditorCanvas';

jest.mock(
  '../ProductEditorCanvas',
  (): {
    __esModule: true;
    default: typeof ProductEditorCanvasOriginal;
  } => {
    return {
      __esModule: true,
      default: function ProductEditorCanvasMock({ children }) {
        return (
          <div>
            [[[ProductEditorCanvas
            {children}
            ProductEditorCanvas]]]
          </div>
        );
      },
    };
  }
);
