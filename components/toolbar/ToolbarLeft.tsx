import IconButton from '@/components/common/IconButton';
import { Input } from '@/components/ui/input';
import { useClipboard } from '@/hooks/useClipboard';
import { Upload, Copy, Trash2 } from 'lucide-react';
import { useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

interface ToolbarLeftProps {
  extensionIds: string[];
  setExtensionIds: Dispatch<SetStateAction<string[]>>;
  setText: Dispatch<SetStateAction<string>>;
}

export default function ToolbarLeft({
  extensionIds,
  setExtensionIds,
  setText,
}: ToolbarLeftProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { copyToClipboard } = useClipboard();

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClearExtensionIds = () => {
    setText('');
    setExtensionIds([]);
    toast.success('Extension IDs cleared');
  };

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10000) {
        toast.error('File too large');
        return;
      }
      const text = await file.text();
      setText(text);
    }
  }

  const handleCopyExtensionIds = () => {
    copyToClipboard(extensionIds.join('\n'));
    toast.success('Extension IDs copied to clipboard');
  };

  return (
    <div className="flex flex-row h-[6%] items-center justify-center py-6 gap-2 font-light">
      <IconButton onClick={() => handleCopyExtensionIds()}>
        <Copy size="1em" />
      </IconButton>
      <label htmlFor="file-upload">
        <IconButton onClick={handleUploadClick}>
          <Upload size="1em" />
        </IconButton>
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <IconButton onClick={() => handleClearExtensionIds()}>
        <Trash2 size="1em" />
      </IconButton>
    </div>
  );
}
