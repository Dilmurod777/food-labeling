"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ProductsHistory } from "@/app/ui/database/products-history";
import {
  TabFileData,
  ProductsHistoryItem,
  TodoListItem,
} from "@/app/lib/models";
import {
  ReactGrid,
  Row as GridRow,
  Column as GridColumn,
  Id,
  CellChange,
  TextCell,
  NumberCell,
  HeaderCell,
} from "@silevis/reactgrid";
import TodoList from "@/app/ui/database/todolist";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";

interface TabData {
  id: string;
  name: string;
  rows: GridRow<TextCell | NumberCell | HeaderCell>[];
  columns: GridColumn[];
  updating: boolean;
}

interface Props {
  productsHistory: ProductsHistoryItem[];
  todoListItems: TodoListItem[];
}

export default function Content({ productsHistory, todoListItems }: Props) {
  const [fileTabs, setFileTabs] = useState<{ [key: string]: TabData }>({});
  const initialTab = "products-history";
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [savingAll, setSavingAll] = useState(false);
  const router = useRouter();

  const addTab = async (data: TabFileData, local: boolean) => {
    let { columns, rows, name, date, id: fileId } = data;

    const existingTabs = Object.values(fileTabs).filter(
      (item) => item.name == name,
    );
    let id: string;

    if (existingTabs.length == 0) {
      if (!fileId) {
        const response = await fetch("/api/database/products", {
          method: "POST",
          body: JSON.stringify(data),
        });
        id = await response.json();
      } else {
        id = fileId;
      }

      setFileTabs({
        ...fileTabs,
        [id]: {
          id: id,
          name: name,
          rows: rows,
          columns: columns,
          updating: false,
        },
      });

      router.refresh();
    } else {
      id = existingTabs[0].id;
    }

    setCurrentTab(id);
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

  const updateCell = (changes: CellChange[]) => {
    changes.forEach((change) => {
      const rowIdx = fileTabs[currentTab].rows.findIndex(
        (item) => item.rowId == change.rowId,
      );
      const columnIdx = fileTabs[currentTab].columns.findIndex(
        (item) => item.columnId == change.columnId,
      );
      const currentRows = fileTabs[currentTab].rows;

      const newCell = {
        ...currentRows[rowIdx].cells[columnIdx],
      };

      if (newCell.type == "text") {
        newCell.text = (change.newCell as TextCell).text;
      } else if (newCell.type == "number") {
        newCell.value = (change.newCell as NumberCell).value;
      }

      setFileTabs({
        ...fileTabs,
        [currentTab]: {
          ...fileTabs[currentTab],
          rows: [
            ...currentRows.slice(0, rowIdx),
            {
              ...currentRows[rowIdx],
              cells: [
                ...currentRows[rowIdx].cells.slice(0, columnIdx),
                {
                  ...newCell,
                },
                ...currentRows[rowIdx].cells.slice(columnIdx + 1),
              ],
            },
            ...currentRows.slice(rowIdx + 1),
          ],
        },
      });
    });
  };

  const saveAll = async () => {
    if (currentTab == initialTab) return;

    setSavingAll(true);

    const response = await fetch("/api/database/products", {
      method: "PUT",
      body: JSON.stringify({
        id: fileTabs[currentTab].id,
        rows: fileTabs[currentTab].rows,
        columns: fileTabs[currentTab].columns,
      }),
    });

    const data: ProductsHistoryItem | null = await response.json();

    if (data) {
      const { rows, columns } = JSON.parse(data.list);
      setFileTabs({
        ...fileTabs,
        [currentTab]: {
          ...fileTabs[currentTab],
          rows,
          columns,
        },
      });
    }

    setSavingAll(false);
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
              <TabsTrigger
                value={initialTab}
                className={"w-28"}
                disabled={savingAll}
              >
                All
              </TabsTrigger>
              {Object.keys(fileTabs).map((id) => (
                <div key={id} className={"relative"}>
                  <TabsTrigger
                    value={id}
                    disabled={savingAll}
                    className={`flex w-40 justify-between gap-2 border pl-2 pr-1 ${currentTab == id ? "border-main-orange" : "border-white"}`}
                  >
                    <span>
                      {fileTabs[id].updating
                        ? "Updating..."
                        : fileTabs[id].name.length > 10
                          ? fileTabs[id].name.slice(0, 10) + "..."
                          : fileTabs[id].name}
                    </span>
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
                  onCellsChanged={updateCell}
                />
              </div>

              <Button
                className={"mb-2 mt-4"}
                onClick={saveAll}
                disabled={savingAll}
              >
                Save
              </Button>
            </TabsContent>
          ))}
        </Tabs>

        {currentTab == initialTab && <TodoList items={todoListItems} />}
      </div>
    </div>
  );
}
