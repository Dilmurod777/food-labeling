"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ProductsHistory } from "@/app/ui/database/products-history";
import {
  TabFileData,
  ProductsHistoryItem,
  TodoListItem,
} from "@/app/lib/models";
import { v4 as uuidV4 } from "uuid";
import {
  ReactGrid,
  Row as GridRow,
  Column as GridColumn,
  Id,
} from "@silevis/reactgrid";
import TodoList from "@/app/ui/database/todolist";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdClose } from "react-icons/io";

interface TabData {
  id: string;
  title: string;
  rows: GridRow[];
  columns: GridColumn[];
}

interface Props {
  productsHistory: ProductsHistoryItem[];
  todoListItems: TodoListItem[];
}

export default function Content({ productsHistory, todoListItems }: Props) {
  const [fileTabs, setFileTabs] = useState<{ [key: string]: TabData }>({});
  const initialTab = "products-history";
  const [currentTab, setCurrentTab] = useState(initialTab);
  const router = useRouter();

  const addTab = (data: TabFileData, local: boolean) => {
    const id = uuidV4();
    const { columns, rows, name, date } = data;
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
        title: name,
        rows: rows,
        columns: columns,
      },
    });

    setCurrentTab(id);

    if (!local) {
      fetch("/api/database/products", {
        method: "POST",
        body: JSON.stringify(data),
      }).then(() => {
        router.refresh();
      });
    }
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
    <div className={"flex h-full w-full flex-grow flex-col gap-2"}>
      <div className={"flex gap-2"}>
        <Tabs
          defaultValue={"products-history"}
          className="w-full"
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v)}
        >
          <ScrollArea>
            <TabsList className="flex justify-start gap-4 bg-main-orange">
              <TabsTrigger value={initialTab} className={"w-28"}>
                History
              </TabsTrigger>
              {Object.keys(fileTabs).map((id) => (
                <div key={id} className={"relative"}>
                  <TabsTrigger
                    value={id}
                    className={`flex w-40 justify-between gap-2 border pl-2 pr-1 ${currentTab == id ? "border-main-orange" : "border-white"}`}
                  >
                    <span>{fileTabs[id].title.slice(0, 10) + "..."}</span>
                  </TabsTrigger>
                  <IoMdClose
                    className={`absolute right-2 top-1/2 -translate-y-[50%] cursor-pointer text-xl ${currentTab == id ? "text-main-orange" : "text-white"}`}
                    onClick={() => {
                      if (currentTab == id) setCurrentTab(initialTab);
                      delete fileTabs[id];
                      setFileTabs({ ...fileTabs });
                    }}
                  />
                </div>
              ))}
            </TabsList>
          </ScrollArea>
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

        {currentTab == initialTab && <TodoList items={todoListItems} />}
      </div>
    </div>
  );
}
