import { SearchKeyword } from "@/app/lib/ocr";
import { convertParamToTitle } from "@/app/lib/utilities";
import { getUnitByName } from "@/app/lib/constants/nutrients-units";
import { AiOutlineSelect } from "react-icons/ai";

interface Props {
  searchKeywords: SearchKeyword[];
  updateValue: (i: number, v: number) => void;
  setSelectedNutrient: (index: number) => void;
  selectedNutrient: number;
}

export default function OCRNutrientsList({
  searchKeywords,
  updateValue,
  selectedNutrient,
  setSelectedNutrient,
}: Props) {
  return (
    <div className={"flex w-full flex-wrap gap-2"}>
      {searchKeywords.map((item, i) => {
        const title = convertParamToTitle(item.dbKey);
        const unit = getUnitByName(item.dbKey);

        return (
          <div
            key={`search-keyword-${i}`}
            className={`flex w-[19%] select-none flex-col gap-1 border-b border-b-main-gray`}
          >
            <div className={"flex justify-between"}>
              <h3
                className={`text-sm font-bold ${selectedNutrient == i ? "bg-main-orange text-white" : "transparent"}`}
                dangerouslySetInnerHTML={{
                  __html: title + `${unit ? ` (${unit})` : ""}`,
                }}
              ></h3>
              <AiOutlineSelect
                className={
                  "cursor-pointer text-main-orange hover:text-hover-main-orange"
                }
                onClick={() =>
                  setSelectedNutrient(selectedNutrient == i ? -1 : i)
                }
              />
            </div>
            <input
              type={"number"}
              className={
                "border border-main-gray px-2 py-2 text-sm outline-none focus-visible:border-main-orange"
              }
              value={item.value}
              onChange={(e) => updateValue(i, e.target.valueAsNumber)}
            />
          </div>
        );
      })}
    </div>
  );
}
