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
    <div className="hidden md:block flex items-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <ChevronsRight className="h-10 w-10" />
          <p className="text-sm font-medium">{extensionIds.length} / 50</p>
        </div>
      )}
    </div>
  );
}
