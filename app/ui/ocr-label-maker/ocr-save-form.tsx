import { Ingredient, Product } from "@/app/lib/models";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { convertParamToTitle, overflowText } from "@/app/lib/utilities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchKeyword } from "@/app/lib/ocr";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";

interface Props {
  product: Product;
  ingredients: Ingredient[];
  searchKeywords: SearchKeyword[];
  saving: boolean;
  saveHandler: () => void;
}

export default function OCRSaveForm({
  product,
  saving,
  saveHandler,
  ingredients,
  searchKeywords,
}: Props) {
  return (
    <div className={"flex h-full w-full flex-grow flex-col gap-8"}>
      <div className={"flex w-full gap-12"}>
        <div className={"flex w-6/12 flex-col gap-2"}>
          <span className={"text-lg/none font-bold"}>Name:</span>
          <hr className={"my-0.5"} />
          <span className={"text-base/none font-normal"}>
            {overflowText(product.name, 50)}
          </span>
        </div>

        <div className={"flex w-6/12 flex-col gap-2"}>
          <span className={"text-lg/none font-bold"}>Tags:</span>
          <hr className={"my-0.5"} />
          <div className={"flew-wrap flex gap-2"}>
            {(JSON.parse(product.tags) as string[]).map((tag) => (
              <Badge key={tag} className={"w-fit"}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className={"flex flex-col gap-2"}>
        <span className={"text-lg/none font-bold"}>Ingredients:</span>
        <hr className={"my-0.5"} />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={"text-left"}>Eng</TableHead>
              <TableHead className={"text-left"}>Kr</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.length == 0 && (
              <TableRow>
                <TableCell>No ingredients.</TableCell>
              </TableRow>
            )}

            {ingredients.map((item, i) => (
              <TableRow key={`${item.name}-${i}`}>
                <TableCell className={"text-left"}>{item.label_name}</TableCell>
                <TableCell className={"text-left"}>
                  {item.label_name_kr}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={"flex flex-col gap-2"}>
        <span className={"text-lg/none font-bold"}>Nutrients:</span>
        <hr className={"my-0.5"} />

        <Table>
          <TableBody>
            {searchKeywords.length == 0 && (
              <TableRow>
                <TableCell>No nutrients.</TableCell>
              </TableRow>
            )}

            {searchKeywords.map((item, i) => (
              <TableRow key={`${item.dbKey}-${i}`}>
                <TableCell
                  dangerouslySetInnerHTML={{
                    __html: convertParamToTitle(item.dbKey),
                  }}
                ></TableCell>
                <TableCell>
                  {item.value} {getUnitByName(item.dbKey)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        onClick={saveHandler}
        className={"mt-6 w-fit bg-main-orange hover:bg-hover-main-orange"}
      >
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
