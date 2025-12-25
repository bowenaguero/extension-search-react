import { useDebounce } from '@/hooks/useDebounce';
import {
  Extensions,
  parseExtensionIds,
  MAX_EXTENSION_IDS,
  DEBOUNCE_DELAY,
  EXTENSION_ID_LENGTH,
} from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';

export function useExtensionData() {
  const [loading, setLoading] = useState(false);
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<Extensions[]>([]);
  const [limitReached, setLimitReached] = useState(false);
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, DEBOUNCE_DELAY);

  useEffect(() => {
    const ids = parseExtensionIds(debouncedText);
    setExtensionIds(ids);
    if (ids.length > 0) {
      console.log('[Extension IDs parsed]', {
        count: ids.length,
        ids: ids.map((id) => ({
          id,
          length: id.length,
          isValidLength: id.length === EXTENSION_ID_LENGTH,
        })),
      });
    }
  }, [debouncedText]);

  useEffect(() => {
    setLimitReached(extensionIds.length >= MAX_EXTENSION_IDS);
  }, [extensionIds]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const submitIds = async (ids: string[]) => {
    try {
      const res = await fetch('/api/get_extension_data', {
        method: 'POST',
        body: JSON.stringify({ ids }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setExtensionData(data);
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit extension IDs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (extensionIds.length === 0) return;
    setLoading(true);
    setExtensionData([]);
    submitIds(extensionIds);
  };

  return {
    loading,
    extensionIds,
    extensionData,
    limitReached,
    text,
    handleChange,
    handleSubmit,
    setExtensionData,
    setExtensionIds,
    setText,
  };
}
