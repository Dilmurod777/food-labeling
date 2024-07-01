"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createRef,
  KeyboardEventHandler,
  Ref,
  useEffect,
  useState,
} from "react";
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
import { registerAllModules } from "handsontable/registry";
import { HotColumn, HotTable, HotTableClass } from "@handsontable/react";
import { Row } from "read-excel-file";
import { HyperFormula } from "hyperformula";
import Loading from "@/app/ui/loading";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { textRenderer } from "handsontable/renderers/textRenderer";
import { ContextMenu } from "handsontable/plugins";
import { Selection } from "handsontable/plugins/contextMenu";

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
  const formulaInputRef = createRef<HTMLInputElement>();
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
    // console.log(name, date, fileId, rows);
    // setLoading(false);
    // return;

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

      if (local) {
        const d = new Date(0);
        d.setUTCMilliseconds(date);

        setFileTabs({
          ...fileTabs,
          [id]: {
            id: id,
            name: `${name} ${d.toDateString()}`,
            rows: rows,
            updating: false,
            ref: createRef<HotTableClass>(),
          },
        });
      }

      router.refresh();
    } else {
      id = existingTabs[0].id;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    if (local) {
      setCurrentTab(id);
    }
  };

  const saveAllHandler = async () => {
    if (currentTab == initialTab) return;

    const hotRef = fileTabs[currentTab].ref;
    if (!hotRef) return;

    // @ts-ignore
    const hot = hotRef.current.hotInstance;

    setSavingAll(true);

    const response = await fetch("/api/database/products", {
      method: "PUT",
      body: JSON.stringify({
        id: fileTabs[currentTab].id,
        data: hot.getData(),
      }),
    });

    const data: ExtendedCompanyProductList | null = await response.json();

    if (data) {
      const { data: rows } = JSON.parse(data.list);
      setFileTabs({
        ...fileTabs,
        [currentTab]: {
          ...fileTabs[currentTab],
          rows: [...rows],
        },
      });

      router.refresh();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSavingAll(false);
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

  const contextMenuClickHandler = (
    key: string,
    selection: Selection[],
    clickEvent: MouseEvent,
  ) => {
    const hotRef = fileTabs[currentTab].ref;
    if (!hotRef) return;

    // @ts-ignore
    const hot: HotTable = hotRef.current.hotInstance;

    selection.forEach((item) => {
      const row = item.start.row;
      const col = item.start.col;

      // @ts-ignore
      const meta = hot.getCellMeta(row, col);

      if (key == "styles:bold") {
        // @ts-ignore
        hot.setCellMeta(row, col, "bold", !meta.bold);
      }
      if (key == "styles:italic") {
        // @ts-ignore
        hot.setCellMeta(row, col, "italic", !meta.italic);
      }
      if (key == "styles:underline") {
        // @ts-ignore
        hot.setCellMeta(row, col, "underline", !meta.underline);
      }
    });

    //@ts-ignore
    hot.render();
  };

  const formulaKeyDownHandler = (keyCode: string) => {
    if (!formulaInputRef.current) return;

    if (keyCode == "Enter") {
      const value = formulaInputRef.current.value;
      const hotRef = fileTabs[currentTab].ref;
      if (!hotRef) return;

      // @ts-ignore
      const hot: HotTableClass = hotRef.current.hotInstance;

      const sheetId = hyperformulaInstance.getSheetId("Sheet1");
      if (sheetId == null) return;

      const calculatedFormula = hyperformulaInstance.calculateFormula(
        value,
        sheetId,
      );
    }
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
            <TabsList className="flex justify-start gap-4 bg-main">
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
                    className={`flex w-40 justify-between gap-2 border pl-2 pr-1 ${currentTab == id ? "border-main" : "border-white"}`}
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
                    className={`absolute right-2 top-1/2 -translate-y-[50%] cursor-pointer text-xl ${currentTab == id ? "text-main" : "text-white"}`}
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
              <div className={"flex h-full w-full flex-grow flex-col"}>
                {/*<div className={"flex h-12 w-full gap-2 bg-red-400 p-2"}>*/}
                {/*  <Input*/}
                {/*    ref={formulaInputRef}*/}
                {/*    type={"text"}*/}
                {/*    className={"h-full max-w-60"}*/}
                {/*    placeholder={"Enter formula..."}*/}
                {/*    onKeyDown={(e) => formulaKeyDownHandler(e.code)}*/}
                {/*  />*/}
                {/*</div>*/}
                <HotTable
                  ref={fileTabs[id].ref}
                  data={[...fileTabs[id].rows]}
                  rowHeaders={true}
                  colHeaders={true}
                  height="auto"
                  autoWrapRow={true}
                  autoWrapCol={true}
                  licenseKey="non-commercial-and-evaluation"
                  minRows={5}
                  minCols={5}
                  formulas={{
                    engine: hyperformulaInstance,
                    sheetName: "Sheet1",
                  }}
                  autoColumnSize={{
                    useHeaders: true,
                    syncLimit: 100,
                  }}
                  contextMenu={{
                    callback(
                      key: string,
                      selection: Selection[],
                      clickEvent: MouseEvent,
                    ) {
                      contextMenuClickHandler(key, selection, clickEvent);
                    },
                    items: {
                      row_above: {},
                      row_below: {},
                      col_left: {},
                      col_right: {},
                      separator1: ContextMenu.SEPARATOR,
                      remove_row: {},
                      clear_column: {},
                      separator2: ContextMenu.SEPARATOR,
                      alignment: {},
                      styles: {
                        name: "Styles",
                        submenu: {
                          items: [
                            {
                              key: "styles:bold",
                              name: "Bold",
                            },
                            {
                              key: "styles:italic",
                              name: "Italic",
                            },
                            {
                              key: "styles:underline",
                              name: "Underline",
                            },
                          ],
                        },
                      },
                      separator3: ContextMenu.SEPARATOR,
                      copy: {},
                    },
                  }}
                  renderer={(
                    instance,
                    td,
                    row,
                    column,
                    prop,
                    value,
                    cellProperties,
                  ) => {
                    value = value ?? "";
                    td.innerText = "";

                    if (value.toString().startsWith("http")) {
                      const img = document.createElement(
                        "img",
                      ) as HTMLImageElement;
                      img.src = value;
                      img.width = 100;
                      td.appendChild(img);
                    } else {
                      td.innerText = value;
                      if (cellProperties.className) {
                        (cellProperties.className as string)
                          .split(" ")
                          .filter((c) => c.trim() != "")
                          .forEach((c) => td.classList.toggle(c.trim()));
                      }

                      td.style.fontStyle = cellProperties.italic
                        ? "italic"
                        : "normal";
                      td.style.fontWeight = cellProperties.bold
                        ? "bold"
                        : "normal";
                      td.style.textDecoration = cellProperties.underline
                        ? "underline"
                        : "none";
                    }

                    return td;
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
                  className={"bg-main hover:bg-hover-main"}
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
