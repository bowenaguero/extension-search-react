import ToolbarLeft from '@/components/toolbar/ToolbarLeft';
import { CodeEditor } from '@/components/ui/code-editor';
import { Extensions } from '@/types';
import { Lock } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface LeftContainerProps {
  limitReached: boolean;
  handleSubmit: () => void;
  extensionIds: string[];
  setExtensionIds: Dispatch<SetStateAction<string[]>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  extensionData: Extensions[];
  loading: boolean;
}

export default function LeftContainer({
  limitReached,
  handleSubmit,
  extensionIds,
  setExtensionIds,
  text,
  setText,
  extensionData,
  loading,
}: LeftContainerProps) {
  return (
    <div
      className={`${
        extensionData.length === 0 && !loading ? 'flex' : 'hidden'
      } md:flex h-full w-[80%] flex-col rounded-md border px-8 pb-8 shadow-lg md:w-[35%]`}
    >
      <ToolbarLeft
        extensionIds={extensionIds}
        setExtensionIds={setExtensionIds}
        setText={setText}
      />
      <div className="flex h-full flex-col gap-6">
        <CodeEditor
          className="h-full rounded-md border text-sm md:text-md"
          value={text}
          placeholder="Paste your extension IDs here"
          onChange={(value) => setText(value)}
        />
        <div className="flex flex-row gap-4">
          {limitReached ? (
            <button
              className="flex-grow cursor-not-allowed rounded-md bg-destructive/80 p-2 opacity-50 dark:bg-destructive/60"
              disabled
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="text-destructive-foreground" size="1em" />
                <p className="font-medium text-destructive-foreground">Limit Reached</p>
              </div>
            </button>
          ) : (
            <button
              className="flex-grow rounded-md bg-primary p-2 font-medium text-primary-foreground hover:cursor-pointer hover:bg-primary/90 dark:hover:bg-primary/80"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
