import { useEffect, useState } from 'react';

interface extensions {
  id: string;
  title: string;
  found: boolean;
  browser: string;
  url: string;
  img_source: string;
}

export function useExtensionData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<extensions[]>([]);
  const [extensionIdLimitReached, setExtensionIdLimitReached] = useState(false);

  function parseExtensionIds(text: string) {
    const regex = new RegExp('[a-p]{32}', 'g');
    const matches = text.match(regex);
    return matches ? matches : [];
  }

  const handleChange = (text: string) => {
    const extensionIds = parseExtensionIds(text);
    setExtensionIds(extensionIds);
  };

  const handleSubmit = () => {
    setLoading(true);
    setExtensionData([]);
    setProgress(1);

    const fetches: Promise<unknown>[] = [];
    extensionIds.map(async (id) => {
      fetches.push(
        fetch('/api/get_extension_data', {
          method: 'POST',
          body: JSON.stringify({ id: id }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setExtensionData((prevState) => [...prevState, data]);
          })
          .finally(() => {
            setProgress((prevState) => prevState + 1);
          }),
      );
    });

    Promise.all(fetches).then(() => {
      setLoading(false);
      console.log(extensionData);
    });
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
    progress,
    setExtensionIds,
    extensionIds,
    setExtensionData,
    extensionData,
    handleChange,
    handleSubmit,
    extensionIdLimitReached,
  };
}
