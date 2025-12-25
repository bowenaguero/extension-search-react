import ToolbarLeft from '@/components/toolbar/ToolbarLeft';
import { Textarea } from '@/components/ui/textarea';
import { Extensions } from '@/types';
import { Lock } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { ChangeEvent } from 'react';

interface LeftContainerProps {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
  handleChange,
  text,
  setText,
  extensionData,
  loading,
}: LeftContainerProps) {
  const isVisible = extensionData.length === 0 && !loading;

  return (
    <div
      className={`${isVisible ? 'md:flex' : 'hidden'} flex h-full w-[80%] flex-col rounded-md border px-8 pb-8 shadow-lg md:w-[35%]`}
    >
      <ToolbarLeft
        extensionIds={extensionIds}
        setExtensionIds={setExtensionIds}
        setText={setText}
      />
      <div className="flex h-full flex-col gap-6">
        <Textarea
          className="h-full resize-none rounded-md border text-sm md:text-md"
          id="extensionIds"
          value={text}
          placeholder="Paste your extension IDs here"
          onChange={handleChange}
        />
        <div className="flex flex-row gap-4">
          {limitReached ? (
            <button
              className="flex-grow cursor-not-allowed rounded-md bg-red-900 p-2 opacity-50"
              disabled
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="text-white" size="1em" />
                <p className="font-medium text-white">Limit Reached</p>
              </div>
            </button>
          ) : (
            <button
              className="flex-grow rounded-md bg-black p-2 font-medium text-white hover:cursor-pointer hover:bg-gray-900"
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
