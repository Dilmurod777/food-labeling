"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ProductsHistory } from "@/app/ui/database/products-history";
import { ProductsHistoryItem } from "@/app/lib/models";
import { v4 as uuidV4 } from "uuid";
import Spreadsheet from "react-spreadsheet";
import {
  ReactGrid,
  Row as GridRow,
  Column as GridColumn,
  Id,
} from "@silevis/reactgrid";

interface TabData {
  id: string;
  title: string;
  rows: GridRow[];
  columns: GridColumn[];
}

interface Props {
  productsHistory: ProductsHistoryItem[];
}

export default function Content({ productsHistory }: Props) {
  const [fileTabs, setFileTabs] = useState<{ [key: string]: TabData }>({});
  const initialTab = "products-history";
  const [currentTab, setCurrentTab] = useState(initialTab);

  const addTab = (json: string) => {
    const id = uuidV4();
    const { columns, rows } = JSON.parse(json);
    // let columns: string[] = Object.keys(rawData[0]).slice(1);

    // let data: { value: string; readonly: boolean }[][] = rawData.map(
    //   (item: {}) =>
    //     Object.values(item)
    //       .slice(1)
    //       .map((value: any) => ({
    //         value: value ? value.toString() : "",
    //         readonly: false,
    //       })),
    // );

    setFileTabs({
      ...fileTabs,
      [id]: {
        id: id,
        title: id.slice(0, 4),
        rows: rows,
        columns: columns,
      },
    });

    setCurrentTab(id);

    fetch("/api/database/products", {
      method: "POST",
      body: json,
    });
  };

  const updateColumns = (tabId: string, columnId: Id, width: number) => {
    const idx = fileTabs[tabId].columns.findIndex(
      (item) => item.columnId == columnId,
    );
    const currentColumns = fileTabs[tabId].columns;
    setFileTabs({
      ...fileTabs,
      [tabId]: {
        ...fileTabs[tabId],
        columns: [
          ...currentColumns.slice(0, idx),
          {
            ...currentColumns[idx],
            width,
          },
          ...currentColumns.slice(idx + 1),
        ],
      },
    });
  };

  useEffect(() => {
    setFileTabs({});
  }, []);

  return (
    <div className={"flex h-full w-full flex-grow flex-col gap-2 px-8 py-2"}>
      <Tabs
        defaultValue={"products-history"}
        className="w-full"
        value={currentTab}
        onValueChange={(v) => setCurrentTab(v)}
      >
        <TabsList className="grid w-full grid-cols-12 bg-main-orange">
          <TabsTrigger value={initialTab}>History</TabsTrigger>
          {Object.keys(fileTabs).map((id) => (
            <TabsTrigger value={id} key={id}>
              {fileTabs[id].title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={initialTab}>
          <ProductsHistory
            productsHistory={productsHistory}
            openFile={addTab}
          />
        </TabsContent>
        {Object.keys(fileTabs).map((id) => (
          <TabsContent value={id} key={id}>
            <div className={"h-full w-full flex-grow overflow-x-scroll"}>
              <ReactGrid
                rows={fileTabs[id].rows}
                columns={fileTabs[id].columns}
                onColumnResized={(columnId, width) =>
                  updateColumns(id, columnId, width)
                }
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
