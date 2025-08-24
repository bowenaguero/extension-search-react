import { Loader2, ChevronsRight } from 'lucide-react';

interface LoadingContainerProps {
  loading: boolean;
  extensionIds: string[];
}

export default function LoadingContainer({
  loading,
  extensionIds,
}: LoadingContainerProps) {
  return (
    <div className="flex items-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="hidden md:flex flex-col items-center justify-center">
          <ChevronsRight className="h-10 w-10" />
          <p className="text-sm font-medium">{extensionIds.length} / 50</p>
        </div>
      )}
    </div>
  );
}
