import {
  Allergens,
  Ingredient,
  Label,
  LabelOption,
  LabelSubOption,
  Product,
  ProductLabelState,
} from "@/app/lib/models";
import Title from "@/app/ui/products/title";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import ProductLabel from "@/app/ui/products/product-label";
import OptionWrapper from "@/app/ui/products/label-page/option-wrapper";
import OptionCheckbox from "@/app/ui/products/label-page/option-checkbox";
import OptionSlider from "@/app/ui/products/label-page/option-slider";
import { Language, LabelType } from "@/app/lib/constants/label";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useDebouncedCallback } from "use-debounce";
import { FaLocationDot } from "react-icons/fa6";
import RoundingRulesBlock from "@/app/ui/products/label-page/rounding-rules-block";
import { DefaultAllergens } from "@/app/lib/defaults";

interface Props {
  product: Product;
  label: Label;
  labelState: ProductLabelState;
  options: LabelOption[];
  updateProduct: (data: Partial<Product>) => void;
  updateLabelState: (
    sectionIndex: number,
    subsectionIndex: number,
    value: boolean,
  ) => void;
}

type Orientation = "portrait" | "landscape" | "p" | "l";

interface DownloadItem {
  html: HTMLElement;
  canvas: HTMLCanvasElement;
  data: string;
  orientation: Orientation;
}

export default function LabelPage({
  product,
  updateProduct,
  labelState,
  updateLabelState,
  options,
  label,
}: Props) {
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [labelType, setLabelType] = useState(
    label.type || LabelType.VerticalStandard.toString(),
  );
  const [labelLanguage, setLabelLanguage] = useState(
    label.language || Language.Korean,
  );
  const items: Ingredient[] = JSON.parse(product.items || "[]");
  const [allergens, setAllergens] = useState<Allergens[]>(
    label.allergens || JSON.parse(JSON.stringify(DefaultAllergens)),
  );
  const [facilityAllergens, setFacilityAllergens] = useState<Allergens[]>(
    label.facilityAllergens || JSON.parse(JSON.stringify(DefaultAllergens)),
  );
  const [brand, setBrand] = useState(label.brand || "");
  const [best_before, setBestBefore] = useState(label.best_before || "");
  const [address, setAddress] = useState(label.address || "");
  const [company, setCompany] = useState(label.company || "");
  const [manufacturer, setManufacturer] = useState(label.manufacturer || "");
  const [country, setCountry] = useState(label.country || "");
  const [prepareInstructions, setPrepareInstructions] = useState(
    label.prepare_instructions || "",
  );
  const [storageInstructions, setStorageInstructions] = useState(
    label.storage_instructions || "",
  );
  const [comments, setComments] = useState(
    label.comments
      ? label.comments
          .replaceAll("''", "'")
          .replaceAll('""', '"')
          .replaceAll("``", "`")
      : "",
  );
  const [otherAllergens, setOtherAllergens] = useState(
    label.otherAllergens || "",
  );
  const [otherFacilityAllergens, setOtherFacilityAllergens] = useState(
    label.otherFacilityAllergens || "",
  );

  const addressInputRef = useRef<HTMLInputElement>(null);
  const [addressSearchResults, setAddressSearchResults] = useState<
    AddressSearchResult[]
  >([]);

  const downloadTypeRef = useRef<HTMLSelectElement>(null);

  const updateLabel = () => {
    label.type = labelType.toString();
    label.allergens = allergens;
    label.facilityAllergens = facilityAllergens;
    label.otherAllergens = otherAllergens;
    label.otherFacilityAllergens = otherFacilityAllergens;
    label.brand = brand;
    label.address = address;
    label.company = company;
    label.manufacturer = manufacturer;
    label.country = country;
    label.best_before = best_before;
    label.prepare_instructions = prepareInstructions;
    label.storage_instructions = storageInstructions;
    label.comments = comments;
    label.language = labelLanguage;

    updateProduct({
      label: JSON.stringify(label),
    });
  };

  useEffect(() => {
    updateLabel();
  }, [
    allergens,
    facilityAllergens,
    otherAllergens,
    otherFacilityAllergens,
    address,
    company,
    manufacturer,
    country,
    brand,
    best_before,
    labelType,
    comments,
    labelLanguage,
    prepareInstructions,
    storageInstructions,
  ]);

  const downloadProduct = async () => {
    if (!downloadTypeRef.current) return;
    const ids = [
      "product-label",
      "product-comments",
      "product-info-front",
      "product-info-back",
    ];
    const items: DownloadItem[] = [];

    for (let id of ids) {
      const html = document.getElementById(id);
      if (html) {
        const canvasElement = await html2canvas(html, { scale: 3 });

        let orientation: Orientation = "landscape";
        if (id == "product-label") {
          if (labelType == LabelType.VerticalStandard.toString())
            orientation = "portrait";
          if (labelType == LabelType.VerticalSimplified.toString())
            orientation = "portrait";
          if (
            labelType == LabelType.VerticalSideBySideMicronutrients.toString()
          )
            orientation = "portrait";
          if (labelType == LabelType.VerticalInfant.toString())
            orientation = "portrait";
          if (labelType == LabelType.VerticalChildren.toString())
            orientation = "portrait";
        }

        items.push({
          html: html,
          orientation: orientation,
          canvas: canvasElement,
          data: canvasElement.toDataURL("image/png", 1),
        });
      }
    }

    if (downloadTypeRef.current.value == "0") {
      const doc = new jsPDF();
      for (let i in items) {
        doc.addPage(
          [items[i].html.offsetWidth, items[i].html.offsetHeight],
          items[i].orientation,
        );
        doc.addImage(
          items[i].data,
          "PNG",
          0,
          0,
          items[i].html.offsetWidth,
          items[i].html.offsetHeight,
        );
      }
      doc.deletePage(1);
      doc.save(`${product.name}.pdf`);
    } else if (downloadTypeRef.current.value == "1") {
      const zip = new JSZip();
      for (let i in items) {
        let idx = items[i].data.indexOf("base64,") + "base64,".length;
        let content = items[i].data.substring(idx);
        zip.file(`image-${i}.png`, content, { base64: true });
      }
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // see FileSaver.js
        saveAs(content, "images.zip");
      });
    }
  };

  const getLabelSubOptionName = (option: LabelSubOption): string => {
    const words = option.key.toLowerCase().split("_");
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ");
  };

  const addressAutocomplete = useDebouncedCallback(async (query: string) => {
    const url = `/api/addresses?query=${query}`;
    const response = await fetch(url, { method: "GET" });
    const results: AddressSearchResult[] = await response.json();
    setAddressSearchResults(results);
  }, 300);

  const translateAddress = async (query: string) => {
    setAddress("Translating...");
    let result = query;
    try {
      const url = `/api/translate?query=${query}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          text: query,
          target: "en",
        }),
      });
      result = await response.json();
    } finally {
      setAddress(result);
      if (addressInputRef.current != null) {
        addressInputRef.current.value = result;
      }
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-col items-start"}>
        <Title
          recipe={product}
          updateProduct={updateProduct}
          editable={false}
        />
      </div>

      <div className={"flex gap-8"}>
        <div className={"flex w-[350px] flex-col gap-8"}>
          <div className={"flex w-full flex-col gap-4"}>
            {options.map((option, i) => {
              if (!option.visible) {
                return <div key={`section-${i}`} className={"hidden"} />;
              }
              return (
                <OptionWrapper
                  key={`section-${i}`}
                  index={i}
                  activeIndex={activeOptionIndex}
                  text={option.name}
                  onClick={() =>
                    setActiveOptionIndex(activeOptionIndex == i ? -1 : i)
                  }
                >
                  {activeOptionIndex == i && option.children && (
                    <div
                      className={
                        "flex flex-col border-[1px] border-b-0 border-main-gray bg-white *:border-b-2 *:border-main-gray"
                      }
                    >
                      {option.children.map((suboption, j) => {
                        if (suboption.type == "checkbox")
                          return (
                            <OptionCheckbox
                              key={`subsection-${j}`}
                              index={j}
                              defaultChecked={
                                labelState[suboption.key] as boolean
                              }
                              text={getLabelSubOptionName(suboption)}
                              onChange={(value) =>
                                updateLabelState(activeOptionIndex, j, value)
                              }
                            />
                          );

                        if (suboption.type == "slider")
                          return (
                            <OptionSlider
                              key={`subsection-${j}`}
                              index={j}
                              minValue={180}
                              maxValue={280}
                              value={(suboption.value as number) || 0}
                              text={getLabelSubOptionName(suboption)}
                              onChange={() => {}}
                            />
                          );
                      })}
                    </div>
                  )}
                </OptionWrapper>
              );
            })}
          </div>

          <RoundingRulesBlock product={product} />
        </div>

        <div className={"flex flex-grow flex-col gap-2"}>
          <p className={"text-lg font-thin"}>Label Type</p>
          <div className={"flex gap-1"}>
            <select
              className={
                "w-fit border-[1px] border-main-gray px-3 py-2 outline-none"
              }
              onChange={(e) => setLabelType(e.target.value)}
              defaultValue={labelType}
            >
              <option value={LabelType.VerticalStandard.toString()}>
                Vertical: Standard
              </option>
              <option value={LabelType.VerticalDualColumn.toString()}>
                Vertical: Dual Column
              </option>
              <option value={LabelType.VerticalSimplified.toString()}>
                Vertical: Simplified
              </option>
              <option value={LabelType.VerticalDualLanguage.toString()}>
                Vertical: Dual Language
              </option>
              <option
                value={LabelType.VerticalSideBySideMicronutrients.toString()}
              >
                Vertical: Micronutrients Listed Side-by-Side
              </option>
              <option value={LabelType.VerticalInfant.toString()}>
                Vertical: Infant through 12 Months of Age
              </option>
              <option value={LabelType.VerticalChildren.toString()}>
                Vertical: Children 1-3 Years
              </option>
              <option value={LabelType.VerticalPregnant.toString()}>
                Vertical: Pregnant women
              </option>
              <option value={LabelType.TabularStandard.toString()}>
                Tabular: Standard
              </option>
              <option value={LabelType.TabularDualColumn.toString()}>
                Tabular: Dual Column
              </option>
              <option value={LabelType.TabularSimplified.toString()}>
                Tabular: Simplified
              </option>
              <option value={LabelType.LinearStandard.toString()}>
                Linear: Standard
              </option>
            </select>

            {labelType == LabelType.VerticalDualLanguage && (
              <select
                className={
                  "w-fit border-[1px] border-main-gray px-3 py-2 outline-none"
                }
                onChange={(e) => setLabelLanguage(e.target.value)}
                defaultValue={labelType}
              >
                <option value={Language.Korean}>Korean</option>
                {/*<option value={Language.Spanish}>Spanish</option>*/}
                {/*<option value={Language.Portuguese}>*/}
                {/*  Portuguese (Portugal, Brazil)*/}
                {/*</option>*/}
                {/*<option value={Language.French}>French</option>*/}
                {/*<option value={Language.Italian}>Italian</option>*/}
                {/*<option value={Language.Japanese}>Japanese</option>*/}
                {/*<option value={Language.Hindi}>Hindi</option>*/}
                {/*<option value={Language.Russian}>Russian</option>*/}
              </select>
            )}
          </div>

          <ProductLabel
            product={product}
            labelState={labelState}
            labelType={labelType}
            labelLanguage={labelLanguage}
            items={items}
            allergens={allergens.filter((item) => item.value)}
            facilityAllergens={facilityAllergens.filter((item) => item.value)}
            otherAllergens={otherAllergens}
            otherFacilityAllergens={otherFacilityAllergens}
            address={address}
            company={company}
            manufacturer={manufacturer}
            country={country}
            brand={brand}
            best_before={best_before}
            prepareInstructions={prepareInstructions}
            storageInstructions={storageInstructions}
            comments={comments}
          />

          <div
            className={
              "mt-4 flex flex-col gap-4 *:relative *:pl-2 *:after:absolute *:after:-bottom-3 *:after:-left-2 *:after:h-[1px] *:after:w-8/12 *:after:bg-main-orange"
            }
          >
            <div className={"flex flex-col items-start gap-1"}>
              <p className={"text-lg font-bold"}>Allergens: </p>
              <div className={"flex w-full flex-wrap gap-2"}>
                {DefaultAllergens.map((item, i) => (
                  <div
                    key={`allergen-${i}`}
                    className={
                      "flex items-center gap-1 text-sm font-normal text-black *:cursor-pointer"
                    }
                  >
                    <input
                      type={"checkbox"}
                      id={`allergen-${i}`}
                      defaultChecked={allergens[i].value}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const newAllergens = [...allergens];
                        newAllergens[i].value = e.target.checked;

                        setAllergens(newAllergens);
                      }}
                    />
                    <label htmlFor={`allergen-${i}`}>{item.name}</label>
                  </div>
                ))}

                <input
                  type="text"
                  name={"other-allergens"}
                  placeholder={"Other (comma separated)"}
                  defaultValue={otherAllergens}
                  onFocus={(e) => e.target.select()}
                  className={
                    "rounded-md border border-main-gray px-2 py-1 text-sm outline-none placeholder:text-xs"
                  }
                  onChange={(e) => setOtherAllergens(e.target.value)}
                />
              </div>

              {allergens
                .map((_, i) => i)
                .filter(
                  (i) =>
                    allergens[i].value &&
                    allergens[i].children &&
                    allergens[i].children.length,
                )
                .map((i) => {
                  const item = allergens[i];

                  return (
                    <div
                      className={"ml-8 flex w-full flex-wrap gap-2"}
                      key={`allergen-${i}-children-wrapper`}
                    >
                      {item.children.map((subItem, j) => (
                        <div
                          key={`allergen-${i}-children-${j}`}
                          className={
                            "flex items-center gap-1 text-sm font-normal text-black *:cursor-pointer"
                          }
                        >
                          <input
                            type={"checkbox"}
                            id={`allergen-${i}-children-input-${j}`}
                            defaultChecked={subItem.value}
                            onChange={(e) => {
                              const newAllergens = [...allergens];
                              newAllergens[i].children[j].value =
                                e.target.checked;

                              setAllergens(newAllergens);
                            }}
                          />
                          <label htmlFor={`allergen-${i}-children-input-${j}`}>
                            {subItem.name}
                          </label>
                        </div>
                      ))}

                      <input
                        type="text"
                        name={`allergen-${i}-other-input`}
                        placeholder={"Other (comma separated)"}
                        defaultValue={item.other}
                        className={
                          "rounded-md border border-main-gray px-2 py-1 text-sm outline-none placeholder:text-xs"
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const newAllergens = [...allergens];
                          newAllergens[i].other = e.target.value;

                          setAllergens(newAllergens);
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            <div className={"flex flex-col items-start gap-1"}>
              <p className={"text-lg font-bold"}>Cross Contamination:</p>
              <div className={"flex w-full flex-wrap gap-2"}>
                {DefaultAllergens.map((item, i) => (
                  <div
                    key={`facility-allergen-${i}`}
                    className={
                      "flex items-center gap-1 text-sm font-normal text-black *:cursor-pointer"
                    }
                  >
                    <input
                      type={"checkbox"}
                      id={`facility-allergen-${i}`}
                      defaultChecked={facilityAllergens[i].value}
                      onChange={(e) => {
                        const newAllergens = [...facilityAllergens];
                        newAllergens[i].value = e.target.checked;

                        setFacilityAllergens(newAllergens);
                      }}
                    />
                    <label htmlFor={`facility-allergen-${i}`}>
                      {item.name}
                    </label>
                  </div>
                ))}

                <input
                  type="text"
                  name={"other-facility-allergens"}
                  placeholder={"Other (comma separated)"}
                  defaultValue={otherFacilityAllergens}
                  className={
                    "rounded-md border border-main-gray px-2 py-1 text-sm outline-none placeholder:text-xs"
                  }
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setOtherFacilityAllergens(e.target.value)}
                />
              </div>

              {facilityAllergens
                .map((_, i) => i)
                .filter(
                  (i) =>
                    facilityAllergens[i].value &&
                    facilityAllergens[i].children &&
                    facilityAllergens[i].children.length,
                )
                .map((i) => {
                  const item = facilityAllergens[i];

                  return (
                    <div
                      className={"ml-8 flex w-full flex-wrap gap-2"}
                      key={`facility-allergen-${i}-children-wrapper`}
                    >
                      {item.children.map((subItem, j) => (
                        <div
                          key={`facility-allergen-${i}-children-${j}`}
                          className={
                            "flex items-center gap-1 text-sm font-normal text-black *:cursor-pointer"
                          }
                        >
                          <input
                            type={"checkbox"}
                            id={`facility-allergen-${i}-children-input-${j}`}
                            defaultChecked={subItem.value}
                            onChange={(e) => {
                              const newAllergens = [...facilityAllergens];
                              newAllergens[i].children[j].value =
                                e.target.checked;

                              setFacilityAllergens(newAllergens);
                            }}
                          />
                          <label
                            htmlFor={`facility-allergen-${i}-children-input-${j}`}
                          >
                            {subItem.name}
                          </label>
                        </div>
                      ))}

                      <input
                        type="text"
                        name={`facility-allergen-${i}-other-input`}
                        placeholder={"Other (comma separated)"}
                        defaultValue={item.other}
                        className={
                          "rounded-md border border-main-gray px-2 py-1 text-sm outline-none placeholder:text-xs"
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          const newAllergens = [...facilityAllergens];
                          newAllergens[i].other = e.target.value;

                          setFacilityAllergens(newAllergens);
                        }}
                      />
                    </div>
                  );
                })}
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="brand" className={"text-lg font-bold"}>
                Brand
              </label>
              <input
                name="brand"
                id="brand"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Product brand"}
                defaultValue={brand}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setBrand(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="best_before" className={"text-lg font-bold"}>
                Best before
              </label>
              <input
                name="best_before"
                id="best_before"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Printed on the Package"}
                defaultValue={best_before}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setBestBefore(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="company" className={"text-lg font-bold"}>
                Brand owner
              </label>
              <input
                name="company"
                id="company"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Brand owner"}
                defaultValue={company}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setCompany(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="manufacturer" className={"text-lg font-bold"}>
                Manufacturer
              </label>
              <input
                name="manufacturer"
                id="manufacturer"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Manufacturer"}
                defaultValue={manufacturer}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setManufacturer(e.target.value.trim());
                }}
              />
            </div>

            <div className={"relative flex flex-col gap-1"}>
              <label htmlFor="address" className={"text-lg font-bold"}>
                Address
              </label>
              <input
                ref={addressInputRef}
                name="address"
                id="address"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"123 Tasty Way, New York, NY 10036"}
                defaultValue={address}
                onFocus={(e) => e.target.select()}
                onBlur={(e) => {
                  // addressAutocomplete(e.target.value.trim());
                  translateAddress(e.target.value.trim());
                  // setAddress(e.target.value.trim());
                }}
              />

              <div
                className={
                  "absolute -bottom-[105%] left-2 right-0 flex h-full flex-col items-start"
                }
              >
                {addressSearchResults.map((addr, i) => (
                  <div
                    key={`address-search-result-${i}`}
                    className={
                      "z-10 flex w-8/12 cursor-pointer items-center gap-2 border border-b-0 border-main-gray bg-white px-2 py-2 text-xs font-bold text-black last:border-b hover:bg-main-orange hover:text-white"
                    }
                    onClick={() => {
                      setAddress(addr.address_name);
                      setAddressSearchResults([]);

                      if (addressInputRef.current) {
                        addressInputRef.current.value = addr.address_name;
                      }
                    }}
                  >
                    <FaLocationDot />
                    <span>{addr.address_name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="country" className={"text-lg font-bold"}>
                Country
              </label>
              <input
                name="country"
                id="country"
                className={
                  "h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"South Korea"}
                defaultValue={country}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setCountry(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label
                htmlFor="prepare_instructions"
                className={"text-lg font-bold"}
              >
                Prepare Instructions
              </label>
              <textarea
                name="prepare_instructions"
                id="prepare_instructions"
                className={
                  "min-h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Prepare Instructions"}
                defaultValue={prepareInstructions}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setPrepareInstructions(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label
                htmlFor="storage_instructions"
                className={"text-lg font-bold"}
              >
                Storage Instructions
              </label>
              <textarea
                name="storage_instructions"
                id="storage_instructions"
                className={
                  "min-h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Storage Instructions"}
                defaultValue={storageInstructions}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setStorageInstructions(e.target.value.trim());
                }}
              />
            </div>

            <div className={"flex flex-col gap-1"}>
              <label htmlFor="comments" className={"text-lg font-bold"}>
                Comments
              </label>
              <textarea
                name="comments"
                id="comments"
                className={
                  "min-h-[40px] w-[300px] rounded-md border border-main-gray p-2 text-sm outline-none placeholder:text-sm focus-within:border-main-orange"
                }
                placeholder={"Comments"}
                defaultValue={comments}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setComments(e.target.value.trim());
                }}
              />
            </div>
          </div>

          <div
            className={
              "mt-4 flex w-fit flex-col items-start gap-2 rounded-md border-[1px] border-main-gray bg-[#fafafa] px-2 pb-10 pt-2"
            }
          >
            <p className={"text-sm font-bold text-black"}>File Format</p>

            <select
              className={
                "h-[50px] w-[300px] border-[1px] border-main-gray px-2 py-1 text-sm outline-none"
              }
              ref={downloadTypeRef}
            >
              <option value="0">PDF</option>
              <option value="1">PNG</option>
            </select>

            <div
              className={
                "cursor-pointer self-end rounded-md bg-main-green px-6 py-4 text-white hover:bg-hover-main-green"
              }
              onClick={downloadProduct}
            >
              Download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
