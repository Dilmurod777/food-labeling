"use client";

import { DefaultModelItems } from "@/app/lib/3d";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const sizes = [
  "55x55x75",
  "80x80x35",
  "80x80x35",
  "80x80x100",
  "165x80x35",
  "180x55x55",
  "120x120x70",
];

export default function Page({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const model = DefaultModelItems.find((item) => item.id === params.id);
  const router = useRouter();

  if (!model)
    return (
      <div
        className={"flex h-full w-full flex-grow items-center justify-center"}
      >
        No such model.
      </div>
    );

  return (
    <div
      className={
        "flex h-full w-full flex-grow items-start justify-center gap-12 px-12 py-12"
      }
    >
      <div className={"flex h-full w-1/3 items-start justify-center"}>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {model.imgPath.map((path, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="relative flex aspect-square items-center justify-center p-6">
                      <Image
                        alt={model.text}
                        src={`/preview/${path}`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className={"flex h-full w-full flex-col gap-4"}>
        <h1
          className={
            "border-b border-b-main-orange pb-2 text-3xl/none font-bold"
          }
        >
          {model.text}
        </h1>
        <p className={"text-base/5 font-normal"}>{model.description}</p>

        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size, i) => (
              <SelectItem key={`size-${i}-${size}`} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className={"w-fit"}
          onClick={() => {
            router.push(
              `/packaging/editor?model=${model.id}&size=${selectedSize}`,
            );
          }}
        >
          Open in 3D Editor
        </Button>
      </div>
    </div>
  );
}
