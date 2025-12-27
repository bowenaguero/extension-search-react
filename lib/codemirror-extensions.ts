import { ViewPlugin, Decoration, DecorationSet, MatchDecorator, EditorView, ViewUpdate } from '@codemirror/view';
import { EXTENSION_ID_REGEX } from '@/types';

// Create decorator for extension IDs
const extensionIdMatcher = new MatchDecorator({
  regexp: EXTENSION_ID_REGEX,
  decoration: Decoration.mark({
    class: 'cm-extension-id',
  }),
});

// View plugin to apply decorations
const extensionIdPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = extensionIdMatcher.createDeco(view);
    }

    update(update: ViewUpdate) {
      this.decorations = extensionIdMatcher.updateDeco(update, this.decorations);
    }
  },
  {
    decorations: (instance) => instance.decorations,
  }
);

// Base theme for the editor
const baseTheme = EditorView.baseTheme({
  '&.cm-editor': {
    height: '100%',
    fontSize: 'inherit',
  },
  '.cm-scroller': {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  '.cm-content': {
    padding: '8px 0',
  },
  '.cm-line': {
    padding: '0 8px',
  },
  // Extension ID highlighting (valid IDs)
  '.cm-extension-id': {
    color: 'hsl(142, 76%, 36%)', // green-600
    fontWeight: '500',
  },
  // Line numbers
  '.cm-gutters': {
    backgroundColor: 'transparent',
    border: 'none',
    paddingRight: '8px',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    color: 'hsl(240, 5%, 64.9%)', // muted-foreground
    minWidth: '32px',
    paddingRight: '8px',
  },
  // Cursor
  '.cm-cursor': {
    borderLeftColor: 'hsl(240, 5.9%, 10%)', // foreground
  },
  // Selection
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'hsl(240, 4.8%, 95.9%)', // accent
  },
});

// Dark theme overrides
const darkTheme = EditorView.theme(
  {
    '&.cm-editor': {
      backgroundColor: 'transparent',
    },
    '.cm-content': {
      caretColor: 'hsl(240, 5%, 96%)', // foreground in dark mode
    },
    // Extension ID highlighting in dark mode
    '.cm-extension-id': {
      color: 'hsl(142, 69%, 58%)', // green-400
    },
    // Line numbers in dark mode
    '.cm-lineNumbers .cm-gutterElement': {
      color: 'hsl(240, 5%, 64.9%)', // muted-foreground
    },
    // Cursor in dark mode
    '.cm-cursor': {
      borderLeftColor: 'hsl(240, 5%, 96%)', // foreground
    },
    // Selection in dark mode
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
      backgroundColor: 'hsl(240, 3.7%, 15.9%)', // accent in dark
    },
  },
  { dark: true }
);

export { extensionIdPlugin, baseTheme, darkTheme };
