"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createRef, Ref, useEffect, useState } from "react";
import { ProductsHistory } from "@/app/ui/database/products-history";
import {
  TabFileData,
  ExtendedCompanyProductList,
  TodoListItem,
  Company,
} from "@/app/lib/models";
import TodoList from "@/app/ui/database/todolist";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
import { HotTable, HotTableClass } from "@handsontable/react";
import { Row } from "read-excel-file";
import { HyperFormula } from "hyperformula";
import Loading from "@/app/ui/loading";

interface TabData {
  id: string;
  name: string;
  rows: Row[];
  updating: boolean;
  ref: Ref<HotTableClass>;
}

interface Props {
  companies: Company[];
  productsHistory: ExtendedCompanyProductList[];
  todoListItems: TodoListItem[];
}

export default function Content({
  productsHistory,
  todoListItems,
  companies,
}: Props) {
  const [fileTabs, setFileTabs] = useState<{ [key: string]: TabData }>({});
  const initialTab = "products-history";
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [savingAll, setSavingAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  registerAllModules();

  const addTabHandler = async (data: TabFileData, local: boolean) => {
    setLoading(true);

    let { rows, name, date, id: fileId } = data;

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
        // id = await response.json();
      } else {
        // id = fileId;
      }

      // setFileTabs({
      //   ...fileTabs,
      //   [id]: {
      //     id: id,
      //     name: name,
      //     rows: rows,
      //     updating: false,
      //     ref: createRef<HotTableClass>(),
      //   },
      // });

      router.refresh();
    } else {
      id = existingTabs[0].id;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    // setCurrentTab(id);
  };

  const saveAllHandler = async () => {
    if (currentTab == initialTab) return;

    setSavingAll(true);

    const response = await fetch("/api/database/products", {
      method: "PUT",
      body: JSON.stringify({
        id: fileTabs[currentTab].id,
        rows: fileTabs[currentTab].rows,
      }),
    });

    const data: ExtendedCompanyProductList | null = await response.json();

    if (data) {
      const { rows } = JSON.parse(data.list);
      setFileTabs({
        ...fileTabs,
        [currentTab]: {
          ...fileTabs[currentTab],
          rows: [...rows],
        },
      });

      router.refresh();
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // setSavingAll(false);
  };

  const downloadFileHandler = () => {
    const hotRef = fileTabs[currentTab].ref;
    if (!hotRef) return;

    // @ts-ignore
    const hot = hotRef.current.hotInstance;

    const exportPlugin = hot.getPlugin("exportFile");
    exportPlugin.downloadFile("csv", {
      bom: false,
      columnDelimiter: ",",
      columnHeaders: false,
      exportHiddenColumns: false,
      exportHiddenRows: false,
      fileExtension: "csv",
      filename: `${fileTabs[currentTab].name}-[YYYY]-[MM]-[DD]`,
      mimeType: "text/csv",
      rowDelimiter: "\r\n",
      rowHeaders: true,
    });
  };

  useEffect(() => {
    setFileTabs({});
  }, []);

  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className={"relative flex h-full w-full flex-grow flex-col gap-2"}>
      {loading && (
        <div
          className={
            "absolute z-10 flex h-full w-full items-center justify-center bg-main-gray/60"
          }
        >
          <Loading />
        </div>
      )}
      <div className={"z-0 flex gap-2 px-8 py-2"}>
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
              companies={companies}
              productsHistory={productsHistory}
              openFile={addTabHandler}
            />
          </TabsContent>
          {Object.keys(fileTabs).map((id) => (
            <TabsContent value={id} key={id}>
              <div className={"h-full w-full flex-grow"}>
                <HotTable
                  ref={fileTabs[id].ref}
                  data={[...fileTabs[id].rows]}
                  rowHeaders={true}
                  colHeaders={true}
                  height="auto"
                  autoWrapRow={true}
                  autoWrapCol={true}
                  contextMenu={true}
                  licenseKey="non-commercial-and-evaluation"
                  minRows={5}
                  minCols={5}
                  formulas={{
                    engine: hyperformulaInstance,
                    sheetName: "Sheet1",
                  }}
                />
              </div>

              <div className={"mb-2 mt-4 flex w-full gap-2"}>
                <Button onClick={saveAllHandler} disabled={savingAll}>
                  Save
                </Button>

                <Button
                  onClick={downloadFileHandler}
                  disabled={downloading}
                  className={"bg-main-green hover:bg-hover-main-green"}
                >
                  Download as CSV
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {currentTab == initialTab && <TodoList items={todoListItems} />}
      </div>
    </div>
  );
}
