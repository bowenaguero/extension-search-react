import IconButton from '@/components/common/IconButton';
import { useClipboard } from '@/hooks/useClipboard';
import { downloadJsonFile } from '@/lib/utils';
import { Extensions } from '@/types';
import { Download, Copy, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

interface ToolbarRightProps {
  extensionData: Extensions[];
  setExtensionData: Dispatch<SetStateAction<Extensions[]>>;
}

export default function ToolbarRight({
  extensionData,
  setExtensionData,
}: ToolbarRightProps) {
  const { copyToClipboard } = useClipboard();

  const copyData = () => {
    copyToClipboard(JSON.stringify(extensionData));
    toast.success('Extension data copied to clipboard');
  };

  const clearData = () => {
    setExtensionData([]);
    toast.success('Extension data cleared');
  };

  const downloadData = () => {
    downloadJsonFile(extensionData, 'Extensions.json');
  };

  return (
    <div className="flex h-[6%] flex-row items-center justify-center gap-2 py-6 px-4 font-light">
      <IconButton onClick={copyData}>
        <Copy size="1em" />
      </IconButton>
      <IconButton onClick={downloadData}>
        <Download size="1em" />
      </IconButton>
      <IconButton onClick={clearData}>
        <Trash2 size="1em" />
      </IconButton>
    </div>
  );
}
