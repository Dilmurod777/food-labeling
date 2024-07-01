import { Ingredient, Product } from "@/app/lib/models";
import Title from "@/app/ui/products/title";
import Tags from "@/app/ui/products/tags";
import { useState } from "react";
import IngredientForm from "@/app/ui/products/ingredient-form";

interface Props {
  product: Product;
  initialActiveIndex: number;
  updateProduct: (data: Partial<Product>) => void;
}

export default function IngredientStatementPage({
  product,
  updateProduct,
  initialActiveIndex,
}: Props) {
  const items: Ingredient[] = JSON.parse(product.items || "[]");
  const [activeItemIndex, setActiveItemIndex] = useState(initialActiveIndex);

  const updateActiveItem = (data: Partial<Ingredient>) => {
    const newItems = [...items];
    newItems[activeItemIndex] = {
      ...newItems[activeItemIndex],
      ...(data as Required<Product>),
    };

    updateProduct({
      items: JSON.stringify(newItems),
    });
  };

  if (items.length == 0) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center text-lg font-bold text-black"
        }
      >
        No ingredients in the recipe.
      </div>
    );
  }

  return (
    <div className={"flex w-full flex-grow flex-col gap-6"}>
      <div className={"flex w-full flex-col items-start"}>
        <Title
          recipe={product}
          updateProduct={updateProduct}
          editable={false}
        />

        <Tags recipe={product} updateProduct={updateProduct} editable={false} />
      </div>

      <div className={"flex"}>
        <div
          className={
            "relative mr-4 flex w-3/12 flex-col items-start gap-4 border-r-2 border-main pr-4"
          }
        >
          {items.map((item, i) => {
            return (
              <div
                key={`ingredient-${i}`}
                className={
                  `w-full cursor-pointer rounded-md border-2 border-main-gray px-3 py-3 text-sm font-normal leading-none text-black hover:border-main hover:bg-main hover:text-white ` +
                  `${i == activeItemIndex ? "cursor-default border-main bg-main text-white" : ""}`
                }
                onClick={() => {
                  if (i == activeItemIndex) return;
                  setActiveItemIndex(i);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <div className={"w-9/12"}>
          <IngredientForm
            ingredient={items[activeItemIndex]}
            updateItem={updateActiveItem}
          />
        </div>
      </div>
    </div>
  );
}
