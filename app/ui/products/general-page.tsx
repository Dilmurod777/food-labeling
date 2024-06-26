import { Ingredient, Product, User } from "@/app/lib/models";
import Title from "@/app/ui/products/title";
import Tags from "@/app/ui/products/tags";
import { useRef, useState } from "react";
import FormInputWrapper from "@/app/ui/products/form-input-wrapper";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@/app/ui/pagination";
import { NET_WEIGHT_UNIT } from "@/app/lib/constants/product";
import { convertStringToNetWeight, getSuggestions } from "@/app/lib/utilities";
import { MdGTranslate, MdOutlineRotateRight } from "react-icons/md";
import { Language } from "@/app/lib/constants/label";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import { WordReplacements } from "@/app/lib/constants/common-ingredients";
import { debounce } from "next/dist/server/utils";
import { DefaultIngredient } from "@/app/lib/defaults";

interface Props {
  product: Product;
  user: User;
  updateProduct: (data: Partial<Product>) => void;
  selectIngredient: (index: number) => void;
}

export default function GeneralPage({
  product,
  updateProduct,
  selectIngredient,
}: Props) {
  const [items, setItems] = useState<Ingredient[]>(
    JSON.parse(product.items || "[]"),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const valueKrRef = useRef("");
  const [page, setPage] = useState(0);
  const [translating, setTranslating] = useState(false);
  const perPage = 10;
  const totalPages = Math.ceil(items.length / perPage);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const addIngredient = () => {
    if (!inputRef.current?.value) return;

    const newItems = [...items];
    newItems.push({
      ...JSON.parse(JSON.stringify(DefaultIngredient)),
      name: inputRef.current?.value.trim() || "no-name",
      label_name: inputRef.current?.value.trim() || "no-name",
      label_name_kr: valueKrRef.current || "",
    });

    setItems(newItems);
    updateProduct({
      items: JSON.stringify(newItems),
    });

    inputRef.current.value = "";
    valueKrRef.current = "";
  };

  const removeIngredient = (index: number) => {
    const newItems = items.toSpliced(index, 1);

    setItems(newItems);
    updateProduct({
      items: JSON.stringify(newItems),
    });
  };

  const translateIngredient = async () => {
    if (!inputRef.current?.value) return;
    if (translating) return;
    setTranslating(true);

    const response = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        text: inputRef.current.value.trim(),
        source: Language.Korean,
        target: Language.English,
      }),
    });

    const text = await response.json();
    valueKrRef.current = inputRef.current.value.trim();
    inputRef.current.value = text;

    setTranslating(false);
  };

  return (
    <div className={"flex w-full flex-col items-start"}>
      <div className={"flex w-full flex-grow items-end justify-between gap-8"}>
        <div className={"flex w-full flex-col items-start"}>
          <Title recipe={product} updateProduct={updateProduct} />

          <Tags recipe={product} updateProduct={updateProduct} />
        </div>
      </div>

      <div className={"mt-8 flex w-full"}>
        <div
          className={
            "relative mr-4 flex w-4/12 flex-col items-start gap-4 border-r-2 border-main pr-4"
          }
        >
          <h2
            className={"w-full border-b-2 border-main pb-2 text-3xl font-bold"}
          >
            Packaging
          </h2>

          <FormInputWrapper
            title={`Net weight per package`}
            htmlFor={"recipe-net-weight-per-package"}
          >
            <input
              id={"recipe-net-weight-per-package"}
              type={"number"}
              min={0}
              className={
                "w-full rounded-md border-2 border-main-gray px-2 py-1 text-sm"
              }
              defaultValue={product.net_weight || 0}
              onFocus={(e) => e.target.select()}
              onBlur={(e) =>
                updateProduct({ net_weight: parseFloat(e.target.value) })
              }
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  updateProduct({
                    net_weight: parseFloat(e.currentTarget.value || "0"),
                  });
                }
              }}
            />
          </FormInputWrapper>

          <FormInputWrapper
            title={`Net weight per package unit`}
            htmlFor={"recipe-net-weight-per-package-unit"}
          >
            <select
              id={"recipe-net-weight-per-package-unit"}
              defaultValue={
                product.net_weight_unit || NET_WEIGHT_UNIT.G.toString()
              }
              className={
                "w-full rounded-md border-2 border-main-gray px-2 py-1 text-sm outline-none"
              }
              onChange={(e) => {
                updateProduct({
                  net_weight_unit: convertStringToNetWeight(e.target.value),
                });
              }}
            >
              <option value={NET_WEIGHT_UNIT.G}>Gram</option>
              <option value={NET_WEIGHT_UNIT.KG}>Kilogram</option>
              <option value={NET_WEIGHT_UNIT.L}>Litre</option>
              <option value={NET_WEIGHT_UNIT.ML}>Milliliter</option>
            </select>
          </FormInputWrapper>

          <FormInputWrapper
            title={"Suggested serving size"}
            htmlFor={"serving-size"}
          >
            <input
              id={"serving-size"}
              type={"text"}
              className={
                "w-full rounded-md border-2 border-main-gray px-2 py-1 text-sm"
              }
              defaultValue={product.serving_size || ""}
              onFocus={(e) => e.target.select()}
              placeholder={"e.g. 2 pieces, 1.5 oz, 1 bag"}
              onBlur={(e) => updateProduct({ serving_size: e.target.value })}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  updateProduct({ serving_size: e.currentTarget.value });
                }
              }}
            />
          </FormInputWrapper>

          <FormInputWrapper
            title={"How many servings are in each package?"}
            htmlFor={"recipe-serving-size-per-package"}
          >
            <input
              type={"number"}
              min={0}
              className={
                "w-full rounded-md border-2 border-main-gray px-2 py-1 text-sm"
              }
              defaultValue={product.serving_per_package || 1}
              onFocus={(e) => e.target.select()}
              onBlur={(e) =>
                updateProduct({
                  serving_per_package: parseFloat(e.target.value),
                })
              }
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  updateProduct({
                    serving_per_package: parseFloat(e.currentTarget.value),
                  });
                }
              }}
            />
          </FormInputWrapper>
        </div>

        <div className={"flex w-full flex-col gap-4"}>
          <h2
            className={"w-full border-b-2 border-main pb-2 text-3xl font-bold"}
          >
            Ingredients
          </h2>

          <div className={"flex gap-4"}>
            <div
              className={
                "flex cursor-pointer items-center justify-center gap-2 rounded-md bg-main px-3 py-2 font-bold text-white hover:bg-hover-main"
              }
              onClick={addIngredient}
            >
              <FaPlus className={"text-base"} />
              <span>Add</span>
            </div>

            <div className={"relative flex-grow"}>
              <input
                ref={inputRef}
                type="text"
                placeholder={"Enter ingredient name..."}
                className={
                  "w-full rounded-md border-2 border-main-gray px-2 py-2 pr-12 text-sm outline-none placeholder:text-sm placeholder:text-main-gray focus-within:border-main"
                }
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    addIngredient();
                  }
                }}
                onSelectCapture={() => {
                  if (!inputRef.current) return;

                  let text = inputRef.current.value;
                  let start = inputRef.current.selectionStart;
                  let end = inputRef.current.selectionEnd;

                  if (start == end || start == null || end == null) {
                    setSuggestions([]);
                    return;
                  }

                  let suggestions = getSuggestions(text.slice(start, end));
                  setSuggestions(suggestions);
                }}
              />

              <div
                className={
                  "group absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center rounded-r-md bg-main text-xl text-white"
                }
                onClick={translateIngredient}
              >
                {translating ? (
                  <MdOutlineRotateRight className={"animate-spin"} />
                ) : (
                  <MdGTranslate
                    className={"transition-all group-hover:scale-110"}
                  />
                )}
              </div>

              <div
                className={
                  "absolute left-0 right-0 top-full flex flex-col gap-0.5 pt-0.5"
                }
              >
                {suggestions.slice(0, 10).map((item, i) => (
                  <div
                    key={`suggestion-${i}`}
                    className={
                      "w-full cursor-pointer rounded-md border border-main bg-white px-2 py-0.5 text-xs text-main hover:bg-main hover:text-white"
                    }
                    onClick={() => {
                      if (!inputRef.current) return;

                      let text = inputRef.current.value;
                      let start = inputRef.current.selectionStart;
                      let end = inputRef.current.selectionEnd;

                      if (start == end || start == null || end == null) return;

                      inputRef.current.value =
                        text.slice(0, start) + item + text.slice(end);

                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={"flex flex-col gap-2"}>
            {items
              .slice(perPage * page, perPage * (page + 1))
              .map((item, i) => (
                <div
                  key={`item-${i}`}
                  className={
                    "group flex h-[50px] items-center gap-2 px-2 py-2 even:bg-main-gray"
                  }
                >
                  <MdDelete
                    className={
                      "cursor-pointer text-2xl text-red-500 hover:text-red-600"
                    }
                    onClick={() => removeIngredient(perPage * page + i)}
                  />
                  <div
                    className={
                      "flex h-full w-full cursor-pointer items-center rounded-r-md border-l-2 border-main pl-2 leading-none hover:bg-main hover:text-white"
                    }
                    onClick={() => selectIngredient(perPage * page + i)}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
          </div>

          {items.length > perPage && (
            <Pagination
              perPage={perPage}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
