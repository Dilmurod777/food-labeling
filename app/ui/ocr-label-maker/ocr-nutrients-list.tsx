import { SearchKeyword } from "@/app/lib/ocr";
import { convertParamToTitle } from "@/app/lib/utilities";

interface Props {
  searchKeywords: SearchKeyword[];
  updateValue: (i: number, v: number) => void;
}

export default function OCRNutrientsList({
  searchKeywords,
  updateValue,
}: Props) {
  return (
    <div className={"flex w-full flex-wrap gap-2"}>
      {searchKeywords.map((item, i) => (
        <div
          key={`search-keyword-${i}`}
          className={"flex w-[19%] flex-col gap-1 border-b border-b-main-gray"}
        >
          <h3
            className={"text-sm font-bold"}
            dangerouslySetInnerHTML={{
              __html: convertParamToTitle(item.dbKey),
            }}
          ></h3>
          <input
            className={
              "border border-main-gray px-2 py-2 text-sm outline-none focus-visible:border-main-orange"
            }
            defaultValue={item.value}
            onChange={(e) => updateValue(i, e.target.valueAsNumber)}
          />
        </div>
      ))}
    </div>
  );
}
