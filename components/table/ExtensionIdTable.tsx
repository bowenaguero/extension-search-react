import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Chrome } from "lucide-react";

export default function ExtensionIdTable({
  extensionData,
}: {
  extensionData: { id: string; title: string }[];
}) {
  return (
    <div className="overflow-y-scroll w-full h-full scrollbar-hide">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-1/10 font-bold">
            </TableHead>
            <TableHead className="text-left w-5/10 font-medium">ID</TableHead>
            <TableHead className="text-left w-4/10 font-medium">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {extensionData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="text-left">
                <Chrome className="w-4 h-4 opacity-50" />
              </TableCell>
              <TableCell className="text-left text-blue-800 hover:underline">
                <Link
                  href={`https://chromewebstore.google.com/detail/${data.id}`}
                  target="_blank"
                >
                  {data.id}
                </Link>
              </TableCell>
              <TableCell className="text-left">{data.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
