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
                <TableCell>
                  <div className="flex items-center justify-center pl-3 p-1">
                    <Image
                      src={data.img_source}
                      alt={data.browser}
                      height={20}
                      width={20}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start p-1">
                    <Link
                      href={data.url}
                      target="_blank"
                      className="text-blue-800 hover:underline"
                    >
                      {data.id}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex max-w-xs items-center justify-start p-1 overflow-hidden text-ellipsis">
                    <Link
                      href={data.url}
                      target="_blank"
                      className="text-blue-800 hover:underline"
                    >
                      {data.title}
                    </Link>
                  </div>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="flex items-center justify-center">
                  <X className="h-4 w-4 text-red-500" />
                </TableCell>
                <TableCell className="text-left text-red-500">
                  {data.id}
                </TableCell>
                <TableCell className="text-left text-red-500">
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
