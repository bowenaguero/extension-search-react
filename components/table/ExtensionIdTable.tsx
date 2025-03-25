import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

export default function ExtensionIdTable({
  extensionData,
}: {
  extensionData: {
    id: string;
    title: string;
    found: boolean;
    browser: string;
    url: string;
    img_source: string
  }[];
}) {
  return (
    <div className="overflow-y-scroll w-full h-full scrollbar-hide">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-1/10 font-bold"></TableHead>
            <TableHead className="text-left w-5/10 font-medium">ID</TableHead>
            <TableHead className="text-left w-4/10 font-medium">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {extensionData.map((data, index) => (
            <TableRow key={index}>
              {data.found ? (
                <>
                  <TableCell className="text-left">
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
                  <TableCell className="text-left">
                    <X className="w-4 h-4 text-red-500" />
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
