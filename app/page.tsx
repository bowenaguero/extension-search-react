"use client";

import { useState } from "react";
import { getExtensionIds } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsRight, Loader2, CircleAlert } from "lucide-react";
import ExtensionIdTable from "@/components/table/ExtensionIdTable";

export default function Home() {
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<{
    id: string;
    title: string;
    found: boolean;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1)

  const handleChange = (text: string) => {
    const extensionIds = getExtensionIds(text);
    setExtensionIds(extensionIds);
  };

  const handleClear = () => {
    const extensionIds = document.getElementById(
      "extensionIds"
    ) as HTMLInputElement;
    extensionIds.value = "";
    setExtensionIds([]);
  };

  const handleSubmit = () => {
    setLoading(true);
    setExtensionData([]);
    setProgress(1);
    
    const fetches: Promise<unknown>[] = [];
    extensionIds.map(async (id) => {
      fetches.push(fetch("/api/get_extension_data", {
        method: "POST",
        body: JSON.stringify({ id: id }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setExtensionData((prevState) => [...prevState, data]);
        })
        .finally(() => {
          setProgress((prevState) => prevState + 1)
        }))
    })

    Promise.all(fetches).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-18 h-200 justify-center items-center">
        <div className="gap-2 flex flex-col h-full items-center">
          <h1 className="text-5xl font-bold">Browser Extension Search</h1>
          <p className="text-gray-500 text-lg">Identify browser extensions by ID.</p>
        </div>
        <div className="flex h-full w-full gap-12">
          <div className="flex flex-col gap-8 border border-gray-300 rounded-sm p-8 w-150 shadow-lg">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Extension IDs</h1>
              <p className="text-gray-500">
                Paste text containing extension IDs.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row pb-6">
                <Textarea
                  className="border border-gray-300 rounded-sm p-2 w-full h-140 resize-none"
                  id="extensionIds"
                  placeholder="Enter extension IDs"
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row gap-4">
                <button
                  className="rounded-sm p-2 hover:bg-gray-900 bg-black text-white font-medium hover:cursor-pointer w-full"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
                <button
                  className="rounded-sm p-2 hover:bg-gray-100 bg-white border border-gray-300 text-black font-medium hover:cursor-pointer w-full"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-full items-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin" />
                <p className="">{extensionIds[progress]}</p>
                <p className="text-gray-500">{progress}/{extensionIds.length}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
              <ChevronsRight className="h-10 w-10" />
              <p className="text-sm font-medium">{extensionIds.length} Loaded</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8 border border-gray-300 rounded-sm p-8 w-150 h-full shadow-lg">
            <div className="flex flex-col h-full w-full px-0 items-center justify-center">
              {extensionData.length > 0 ? (
                <ExtensionIdTable extensionData={extensionData} />
              ) : (
                <div className="flex gap-1 items-center">
                  <CircleAlert className="w-4 h-4 font-medium" />
                  <p className="text-sm font-medium">
                    Upload extension IDs to view results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
