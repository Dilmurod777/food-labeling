"use client";

import { Product } from "@/app/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

interface Props {
  product: Product;
  updateProduct: (product: Product) => void;
}

export default function OCRInitializeForm({ product, updateProduct }: Props) {
  const tagInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={
        "mx-auto flex h-full w-6/12 flex-grow flex-col items-center gap-4"
      }
    >
      <Input
        type={"text"}
        placeholder={"Enter name"}
        defaultValue={product.name}
        onChange={(e) => {
          updateProduct({
            ...product,
            name: e.target.value.trim(),
          });
        }}
      />

      <div className={"flex w-full items-center justify-center gap-4"}>
        <Input
          ref={tagInputRef}
          type={"text"}
          placeholder={"Enter tag"}
          defaultValue={""}
          className={"w-full"}
        />

        <Button
          className={"bg-main-orange hover:bg-hover-main-orange"}
          onClick={() => {
            if (tagInputRef.current == null) return;

            const value = tagInputRef.current.value.trim();
            if (value == "") return;

            updateProduct({
              ...product,
              tags: JSON.stringify(
                (JSON.parse(product.tags) as string[]).concat([value]),
              ),
            });

            tagInputRef.current.value = "";
          }}
        >
          Add
        </Button>
      </div>

      <div className={"flex w-full flex-wrap gap-2"}>
        {(JSON.parse(product.tags) as string[]).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
