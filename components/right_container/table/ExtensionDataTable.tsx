import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Extensions } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ExtensionDataTableProps {
  extensionData: Extensions[];
}

export default function ExtensionDataTable({
  extensionData,
}: ExtensionDataTableProps) {
  return (
    <Table>
      <TableBody>
        {extensionData.map((data, index) => (
          <TableRow key={`${data.id}-${index}`}>
            {data.found ? (
              <>
                {/* Logo Column - Fixed width, always visible */}
                <TableCell className="w-12 min-w-12 md:w-16 md:min-w-16">
                  <div className="flex items-center justify-center p-1">
                    <Image
                      src={data.img_source}
                      alt={data.browser}
                      height={20}
                      width={20}
                    />
                  </div>
                </TableCell>

                {/* ID Column - Fixed width */}
                <TableCell className="w-40 min-w-40 md:w-64 md:min-w-64">
                  <div className="flex items-center justify-start p-1 min-w-0">
                    <Link
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate block text-primary hover:underline dark:text-primary/90"
                      title={data.id}
                    >
                      {data.id}
                    </Link>
                  </div>
                </TableCell>

                {/* Title Column - Flexible width with ellipsis */}
                <TableCell className="flex-1 min-w-0">
                  <div className="flex items-center justify-start p-1 min-w-0">
                    <Link
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate block text-primary hover:underline dark:text-primary/90"
                      title={data.title}
                    >
                      {data.title}
                    </Link>
                  </div>
                </TableCell>
              </>
            ) : (
              <>
                {/* Not Found - Logo Column */}
                <TableCell className="w-12 min-w-12 md:w-16 md:min-w-16">
                  <div className="flex items-center justify-center">
                    <X
                      className="h-4 w-4 text-destructive"
                      data-testid="not-found-icon"
                    />
                  </div>
                </TableCell>

                {/* Not Found - ID Column */}
                <TableCell className="w-40 min-w-40 md:w-64 md:min-w-64">
                  <div className="flex items-center justify-start p-1 min-w-0">
                    <span className="truncate block text-left text-destructive" title={data.id}>
                      {data.id}
                    </span>
                  </div>
                </TableCell>

                {/* Not Found - Title Column */}
                <TableCell className="flex-1 min-w-0 text-left text-destructive">
                  Not Found
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
