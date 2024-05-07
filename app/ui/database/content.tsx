"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ProductsHistory } from "@/app/ui/database/products-history";
import { ProductsHistoryItem } from "@/app/lib/models";
import { v4 as uuidV4 } from "uuid";
import Spreadsheet from "react-spreadsheet";

interface TabData {
  id: string;
  title: string;
  data: any[];
  columns: string[];
}

interface Props {
  productsHistory: ProductsHistoryItem[];
}

export default function Content({ productsHistory }: Props) {
  const [fileTabs, setFileTabs] = useState<{ [key: string]: TabData }>({});

  const addTab = (json: string) => {
    const id = uuidV4();
    const rawData: any[] = JSON.parse(json);
    let columns: string[] = Object.keys(rawData[0]);

    let data: { value: string; readonly: boolean }[][] = rawData.map(
      (item: {}) =>
        Object.values(item)
          .slice(1)
          .map((value: any) => ({
            value: value ? value.toString() : "",
            readonly: false,
          })),
    );

    console.log(fileTabs);
    setFileTabs({
      ...fileTabs,
      [id]: {
        id: id,
        title: id.slice(0, 4),
        data: data,
        columns: columns.slice(1),
      },
    });
  };

  useEffect(() => {
    setFileTabs({});
  }, []);

  return (
    <div className={"flex h-full w-full flex-grow flex-col gap-2 px-8 py-2"}>
      <Tabs defaultValue={"products-history"} className="w-full">
        <TabsList className="grid w-full grid-cols-12 bg-main-orange">
          <TabsTrigger value={"products-history"}>History</TabsTrigger>
          {Object.keys(fileTabs).map((id) => (
            <TabsTrigger value={id} key={id}>
              {fileTabs[id].title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={"products-history"}>
          <ProductsHistory
            productsHistory={productsHistory}
            openFile={addTab}
          />
        </TabsContent>
        {Object.keys(fileTabs).map((id) => (
          <TabsContent value={id} key={id}>
            <div className={"h-full w-full flex-grow overflow-x-scroll"}>
              <Spreadsheet
                data={fileTabs[id].data}
                columnLabels={fileTabs[id].columns}
                onChange={(data) =>
                  setFileTabs({
                    ...fileTabs,
                    [id]: {
                      ...fileTabs[id],
                      data: data,
                    },
                  })
                }
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
