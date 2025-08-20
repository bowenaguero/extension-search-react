import ExtensionDataTable from '@/components/right_container/table/ExtensionDataTable';
import ToolbarRight from '@/components/toolbar/ToolbarRight';
import { Extensions } from '@/types';
import { CircleAlert } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface RightContainerProps {
  extensionData: Extensions[];
  setExtensionData: Dispatch<SetStateAction<Extensions[]>>;
}

export default function RightContainer({
  extensionData,
  setExtensionData,
}: RightContainerProps) {
  return (
    <div className="flex h-full w-[35%] flex-col rounded-md border shadow-lg">
      {extensionData.length > 0 ? (
        <div className="scrollbar-hide h-full w-full overflow-y-scroll">
          <ToolbarRight
            extensionData={extensionData}
            setExtensionData={setExtensionData}
          />
          <ExtensionDataTable extensionData={extensionData} />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
          <p className="text-md flex items-center gap-1">
            <CircleAlert size="1em" />
            Submit extension IDs to view results.
          </p>
        </div>
      )}
    </div>
  );
}
