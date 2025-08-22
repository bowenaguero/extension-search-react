import { useDebounce } from '@/hooks/useDebounce';
import { Extensions } from '@/types';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

function parseExtensionIds(text: string) {
  const regex = new RegExp('[a-p]{32}', 'g');
  const matches = text.match(regex);
  return matches ? matches : [];
}

export function useExtensionData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<Extensions[]>([]);
  const [extensionIdLimitReached, setExtensionIdLimitReached] = useState(false);
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    const extensionIds = parseExtensionIds(debouncedText);
    setExtensionIds(extensionIds);
  }, [debouncedText]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  async function submitExtensionIds(extensionIds: string[]) {
    await fetch('/api/get_extension_data', {
      method: 'POST',
      body: JSON.stringify({ ids: extensionIds }),
    })
      .then((res) => {
        return res.json();
      })
      .then((extensionData) => {
        setExtensionData(extensionData);
        setLoading(false);
      });
  }

  const handleSubmit = () => {
    setLoading(true);
    setExtensionData([]);
    if (extensionIds.length > 0 && extensionIds.length < 50) {
      submitExtensionIds(extensionIds);
    }
  };

  useEffect(() => {
    if (extensionIds.length >= 50 && extensionIdLimitReached !== true) {
      setExtensionIdLimitReached(true);
    } else if (extensionIds.length < 50 && extensionIdLimitReached !== false) {
      setExtensionIdLimitReached(false);
    }
  }, [extensionIds]);

  return {
    loading,
    setExtensionIds,
    extensionIds,
    setExtensionData,
    extensionData,
    handleChange,
    handleSubmit,
    extensionIdLimitReached,
    text,
    setText,
  };
}
