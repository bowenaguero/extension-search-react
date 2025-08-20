'use client';

import ToolbarLeft from '@/components/toolbar/ToolbarLeft';
import ToolbarRight from '@/components/toolbar/ToolbarRight';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useExtensionData } from '@/hooks/useExtensionData';
import { ChevronsRight, Loader2, CircleAlert, Lock } from 'lucide-react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const {
    loading,
    progress,
    extensionIds,
    extensionData,
    setExtensionData,
    setExtensionIds,
    handleChange,
    handleSubmit,
    extensionIdLimitReached,
  } = useExtensionData();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-[20%] flex-col items-center justify-center gap-2">
        <h1 className="text-5xl font-bold">Browser Extension Search</h1>
      </div>
      <div className="flex h-[80%] w-full flex-grow flex-row items-center justify-center gap-8 pb-18">
        <div className="flex h-full w-[35%] flex-col rounded-md border pb-8 px-8 shadow-lg">
          <ToolbarLeft
            extensionIds={extensionIds}
            setExtensionIds={setExtensionIds}
          />
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
              {extensionIdLimitReached ? (
                <button className="flex-grow rounded-md bg-red-900 p-2 cursor-not-allowed" disabled>
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="text-white" size="1em" />
                    <p className="font-medium text-white">Limit Reached</p>
                  </div>
                </button>
              ) : (
                <button
                  className="flex-grow rounded-md bg-black p-2 font-medium text-white hover:cursor-pointer hover:bg-gray-900"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              )}
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
              <p className="text-sm font-medium">{extensionIds.length} / 50</p>
            </div>
          )}
        </div>
        <div className="flex h-full w-[35%] flex-col rounded-md border shadow-lg">
          {extensionData.length > 0 ? (
            <div className="scrollbar-hide h-full w-full overflow-y-scroll">
              <ToolbarRight
                extensionData={extensionData}
                setExtensionData={setExtensionData}
              />
              <Table>
                <TableBody>
                  {extensionData.map((data, index) => (
                    <TableRow key={index}>
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
                            <div className="flex max-w-xs items-center justify-begin p-1 overflow-hidden text-ellipsis">
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
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
              <p className="text-md flex items-center gap-1">
                <CircleAlert size="1em" />
                Submit extension IDs to view results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
