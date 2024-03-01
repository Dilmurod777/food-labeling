import { IoCloseCircleSharp } from "react-icons/io5";
import { FaPlus, FaTags } from "react-icons/fa";
import { useState } from "react";
import { Product } from "@/app/lib/models";
import { TAG_COLORS } from "@/app/lib/constants/colors";

interface Props {
  recipe: Product;
  updateProduct: (data: Partial<Product>) => void;
  editable?: boolean;
}

export default function Tags({
  recipe,
  updateProduct,
  editable = true,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [tags, setTags] = useState<string[]>(JSON.parse(recipe.tags || "[]"));

  const addTag = (newTagName: string) => {
    if (newTagName !== "" && tags.filter((t) => t == newTagName).length == 0) {
      const newTags = [...tags, newTagName];
      updateProduct({
        tags: JSON.stringify(newTags),
      });
      setTags(newTags);
    }

    setEditing(false);
  };

  const removeTag = (name: string) => {
    if (tags.length) {
      const newTags = tags.filter((tag) => tag != name);
      updateProduct({
        tags: JSON.stringify(newTags),
      });
      setTags(newTags);
    }
  };

  return (
    <div className={"mt-2 flex items-center gap-2"}>
      <div className={"flex gap-1"}>
        {tags.map((tag, i) => (
          <div
            key={`tag-${i}`}
            className={`flex h-[25px] items-center justify-center gap-1 rounded-full px-2 py-1 leading-none`}
            style={{ backgroundColor: TAG_COLORS[i % TAG_COLORS.length] }}
          >
            <span className={"text-xs font-thin text-white"}>{tag}</span>
            {editable && (
              <IoCloseCircleSharp
                className={"cursor-pointer text-sm text-white"}
                onClick={() => removeTag(tag)}
              />
            )}
          </div>
        ))}
      </div>
      {editable &&
        (editing ? (
          <div className={"relative h-[25px]"}>
            <input
              type="text"
              className={
                "peer h-full w-[200px] rounded-md border-2 border-main-orange py-1 pl-6 pr-1 text-xs outline-0"
              }
              onBlur={(e) => addTag(e.target.value)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTag(e.currentTarget.value);
                }
              }}
              autoFocus={true}
              placeholder={"my tag"}
            />
            <FaTags
              className={
                "absolute left-2 top-1/2 mt-[2px] text-sm text-main-orange"
              }
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
        ) : tags.length ? (
          <FaPlus
            className={"cursor-pointer text-lg text-main-orange"}
            onClick={() => setEditing(true)}
          />
        ) : (
          <div
            className={"flex h-[25px] cursor-pointer items-center gap-2"}
            onClick={() => setEditing(true)}
          >
            <FaTags className={"text-lg text-main-orange"} />
            <span className={"text-sm text-main-orange"}>Add Tags...</span>
          </div>
        ))}
    </div>
  );
}
