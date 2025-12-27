'use client';

import CodeMirror from '@uiw/react-codemirror';
import { lineNumbers } from '@codemirror/view';
import { extensionIdPlugin, baseTheme, darkTheme } from '@/lib/codemirror-extensions';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CodeEditor({ value, onChange, placeholder, className }: CodeEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        'border-input placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] overflow-hidden',
        className
      )}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme={mounted && theme === 'dark' ? darkTheme : undefined}
        extensions={[lineNumbers(), extensionIdPlugin, baseTheme]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: false,
          bracketMatching: false,
          closeBrackets: false,
          autocompletion: false,
          rectangularSelection: true,
          crosshairCursor: false,
          highlightSelectionMatches: false,
          closeBracketsKeymap: false,
          searchKeymap: false,
          foldKeymap: false,
          completionKeymap: false,
          lintKeymap: false,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
