"use client";

import { useState } from "react";
import { getExtensionIds } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsRight, Loader2, CircleAlert } from "lucide-react";
import ExtensionIdTable from "@/components/table/ExtensionIdTable";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1)
  const [extensionIds, setExtensionIds] = useState<string[]>([]);
  const [extensionData, setExtensionData] = useState<{
    id: string;
    title: string;
    found: boolean;
    browser: string;
    url: string;
    img_source: string
  }[]>([]);

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
      console.log(extensionData)
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="gap-2 flex h-[25%] flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Browser Extension Search</h1>
      </div>
      <div className="flex flex-row flex-grow h-[75%] w-full items-center justify-center gap-8 pb-12">
        <div className="flex flex-col w-[35%] h-full border rounded-md shadow-lg p-8 gap-4">
          <div className="flex flex-col h-full gap-4">
            <Textarea
              className="h-full border rounded-md resize-none"
              id="extensionIds"
              placeholder="Paste your extension IDs here"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <div className="flex flex-row gap-4">
              <button
                className="rounded-md hover:bg-gray-900 bg-black text-white font-medium hover:cursor-pointer w-full"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              <button
                className="rounded-md hover:bg-gray-100 bg-white border text-black font-medium hover:cursor-pointer w-full"
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
              <p className="text-gray-500">{progress}/{extensionIds.length}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <ChevronsRight className="h-10 w-10" />
              <p className="text-sm font-medium">{extensionIds.length} Loaded</p>
            </div>
          )}
        </div>
        <div className="flex flex-col h-full w-[35%] border rounded-md shadow-lg">
          <div className="flex flex-col h-full w-full px-0 items-center justify-center">
            {extensionData.length > 0 ? (
              <ExtensionIdTable extensionData={extensionData} />
            ) : (
                <p className="flex gap-1 items-center text-md">
                  <CircleAlert />
                  Submit extension IDs to view results.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
