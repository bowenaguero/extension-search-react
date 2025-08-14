'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { getExtensionIds } from '@/lib/utils';
import {
  ChevronsRight,
  Loader2,
  CircleAlert,
  Upload,
  Copy,
  Download,
} from 'lucide-react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<
    {
      id: string;
      title: string;
      found: boolean;
      browser: string;
      url: string;
      img_source: string;
    }[]
  >([]);

  const handleChange = (text: string) => {
    const extensionIds = getExtensionIds(text);
    setExtensionIds(extensionIds);
  };

  const handleClear = () => {
    const extensionIds = document.getElementById(
      'extensionIds',
    ) as HTMLInputElement;
    extensionIds.value = '';
    setExtensionIds([]);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      },
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-[20%] flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold">Browser Extension Search</h1>
      </div>
      <div className="flex h-[80%] w-full flex-grow flex-row items-center justify-center gap-8 pb-12">
        <div className="flex h-full w-[35%] flex-col rounded-md border pb-8 px-8 shadow-lg">
          <div className="flex flex-row h-[6%] items-center justify-begin py-8 px-4 gap-6">
            <button
              className="hover:cursor-pointer"
              onClick={() => copyToClipboard(extensionIds.join('\n'))}
            >
              <Copy />
            </button>
            <button className="hover:cursor-pointer">
              <Upload />
            </button>
          </div>
          <div className="flex h-full flex-col gap-8">
            <Textarea
              className="h-full resize-none rounded-md border"
              id="extensionIds"
              placeholder="Paste your extension IDs here"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <div className="flex flex-row gap-4">
              <button
                className="flex-grow rounded-md bg-black p-2 font-medium text-white hover:cursor-pointer hover:bg-gray-900"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              <button
                className="flex-grow rounded-md border bg-white p-2 font-medium text-black hover:cursor-pointer hover:bg-gray-100"
                onClick={() => handleClear()}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="">{extensionIds[progress]}</p>
              <p className="text-gray-500">
                {progress}/{extensionIds.length}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ChevronsRight className="h-10 w-10" />
              <p className="text-sm font-medium">
                {extensionIds.length} Loaded
              </p>
            </div>
          )}
        </div>
        <div className="flex h-full w-[35%] flex-col rounded-md border shadow-lg">
          {extensionData.length > 0 ? (
            <div className="scrollbar-hide h-full w-full overflow-y-scroll">
              <div className="flex flex-row h-[6%] items-center border-b justify-end py-8 px-4 gap-6">
                <button className="hover:cursor-pointer">
                  <Copy />
                </button>
                <button className="hover:cursor-pointer">
                  <Download />
                </button>
              </div>
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
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
              <p className="text-md flex items-center gap-1">
                <CircleAlert />
                Submit extension IDs to view results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
