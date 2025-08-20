import ToolbarLeft from '@/components/toolbar/ToolbarLeft';
import { Textarea } from '@/components/ui/textarea';
import { Lock } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface LeftContainerProps {
  handleChange: (text: string) => void;
  extensionIdLimitReached: boolean;
  handleSubmit: () => void;
  extensionIds: string[];
  setExtensionIds: Dispatch<SetStateAction<string[]>>;
}

export default function LeftContainer({
  handleChange,
  extensionIdLimitReached,
  handleSubmit,
  extensionIds,
  setExtensionIds,
}: LeftContainerProps) {
  return (
    <div className="flex h-full w-[35%] flex-col rounded-md border pb-8 px-8 shadow-lg">
      <ToolbarLeft
        extensionIds={extensionIds}
        setExtensionIds={setExtensionIds}
      />
      <div className="flex h-full flex-col gap-8">
        <Textarea
          className="h-full resize-none rounded-md border"
          id="extensionIds"
          placeholder="Paste your extension IDs here"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
        <div className="flex flex-row gap-4">
          {extensionIdLimitReached ? (
            <button
              className="flex-grow rounded-md bg-red-900 p-2 cursor-not-allowed"
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
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
