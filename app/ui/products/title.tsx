import { overflowText } from "@/app/lib/utilities";
import { FaRegEdit } from "react-icons/fa";
import { Product } from "@/app/lib/models";
import { useState } from "react";

interface Props {
  recipe: Product;
  updateProduct: (data: Partial<Product>) => void;
  editable?: boolean;
}

export default function Title({
  recipe,
  updateProduct,
  editable = true,
}: Props) {
  const [editing, setEditing] = useState(false);

  const updateRecipeName = (name: string) => {
    if (name.trim() !== "" && name != recipe.name) {
      updateProduct({
        name: name,
      });
    }

    setEditing(false);
  };

  return editing && editable ? (
    <input
      type="text"
      className={
        "h-[35px] w-[500px] rounded-md border-2 border-main-orange px-2 py-2 outline-0"
      }
      onFocus={(e) => e.target.select()}
      onBlur={(e) => updateRecipeName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          updateRecipeName(e.currentTarget.value);
        }
      }}
      maxLength={100}
      autoFocus={true}
      placeholder={recipe.name}
      defaultValue={recipe.name}
    />
  ) : (
    <div className={"flex h-[35px] items-center gap-4 leading-none"}>
      <h2 className={"text-2xl font-bold text-black"}>
        {overflowText(recipe.name)}
      </h2>
      {editable && (
        <FaRegEdit
          className={"cursor-pointer text-2xl text-main-orange"}
          onClick={() => setEditing(true)}
        />
      )}
    </div>
  );
}
