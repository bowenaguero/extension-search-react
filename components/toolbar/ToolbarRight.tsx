import IconButton from '@/components/common/IconButton';
import { useClipboard } from '@/hooks/useClipboard';
import { Download, Copy, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

interface extensions {
  id: string;
  title: string;
  found: boolean;
  browser: string;
  url: string;
  img_source: string;
}

interface ToolbarRightProps {
  extensionData: extensions[];
  setExtensionData: Dispatch<SetStateAction<extensions[]>>;
}

export default function ToolbarRight({
  extensionData,
  setExtensionData,
}: ToolbarRightProps) {
  const { copyToClipboard } = useClipboard();

  const handleCopyExtensionData = () => {
    if (extensionData.length > 0) {
      copyToClipboard(JSON.stringify(extensionData));
      toast.success('Extension data copied to clipboard');
    }
  };

  const handleExtensionDataCleared = () => {
    setExtensionData([]);
    toast.success('Extension data cleared');
  };

  const downloadFile = () => {
    const file = new File([JSON.stringify(extensionData)], `extensions.json`, {
      type: 'text/plain',
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-row h-[6%] items-center justify-begin py-6 px-4 gap-2 font-light justify-end">
      <IconButton onClick={() => handleCopyExtensionData()}>
        <Copy size="1em" />
      </IconButton>
      <IconButton onClick={() => downloadFile()}>
        <Download size="1em" />
      </IconButton>
      <IconButton onClick={() => handleExtensionDataCleared()}>
        <Trash2 size="1em" />
      </IconButton>
    </div>
  );
}
