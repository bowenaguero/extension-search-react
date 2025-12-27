'use client';

import { ThemeToggle } from '@/components/common/ThemeToggle';
import LeftContainer from '@/components/left_container/LeftContainer';
import LoadingContainer from '@/components/loading_container/LoadingContainer';
import RightContainer from '@/components/right_container/RightContainer';
import { useExtensionData } from '@/hooks/useExtensionData';

export default function Home() {
  const {
    loading,
    extensionIds,
    extensionData,
    setExtensionData,
    setExtensionIds,
    handleSubmit,
    limitReached,
    text,
    setText,
  } = useExtensionData();

  return (
    <>
      <ThemeToggle />
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex h-[20%] flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold md:text-5xl">
            Browser Extension Search
          </h1>
        </div>
        <div className="flex h-[80%] w-full flex-grow flex-col items-center justify-center gap-8 pb-18 md:flex-row">
          <LeftContainer
            limitReached={limitReached}
            handleSubmit={handleSubmit}
            extensionIds={extensionIds}
            setExtensionIds={setExtensionIds}
            text={text}
            setText={setText}
            extensionData={extensionData}
            loading={loading}
          />
          <LoadingContainer loading={loading} extensionIds={extensionIds} />
          <RightContainer
            extensionData={extensionData}
            setExtensionData={setExtensionData}
          />
        </div>
      </div>
    </>
  );
}
