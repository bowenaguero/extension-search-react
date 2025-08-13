import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ExtensionIdTable({
  extensionData,
}: {
  extensionData: {
    id: string;
    title: string;
    found: boolean;
    browser: string;
    url: string;
    img_source: string;
  }[];
}) {
  return (
    <div className="scrollbar-hide h-full w-full overflow-y-scroll">
      <Table>
        <TableBody>
          {extensionData.map((data, index) => (
            <TableRow key={index}>
              {data.found ? (
                <>
                  <TableCell className="flex items-center justify-center">
                    <Image
                      src={data.img_source}
                      alt={data.browser}
                      height={20}
                      width={20}
                    />
                  </TableCell>
                  <TableCell className="text-left text-blue-800 hover:underline">
                    <Link href={data.url} target="_blank">
                      {data.id}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left text-blue-800 hover:underline">
                    <Link href={data.url} target="_blank">
                      {data.title}
                    </Link>
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
    </div>
  );
}
