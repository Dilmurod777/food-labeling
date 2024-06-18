import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SiTaichigraphics } from "react-icons/si";
import { LuUploadCloud } from "react-icons/lu";
import { TemplateGroup } from "@/app/lib/3d";
import { convertTemplateGroupNameToTitle } from "@/app/lib/utilities";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbTextSize } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  updateSelectedTextures: (texture: string, type: string) => void;
}

export default function TemplatesPanel({ updateSelectedTextures }: Props) {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<TemplateGroup[]>([]);
  const [showPanel, setShowPanel] = useState(-1);
  const [uploads, setUploads] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);

    const response = await fetch("/api/templates", {
      method: "GET",
    });
    const images: TemplateGroup[] = await response.json();
    setImages(images);

    setLoading(false);
  };

  const RenderLoading = () => {
    return (
      <div
        role="status"
        className={"flex h-full w-full items-start justify-center py-12"}
      >
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-main-orange text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const RenderImages = () => {
    return images.map((group, i) => (
      <div key={`template-group${i}`} className={"mb-4 flex flex-col gap-2"}>
        <h1 className={"text-base/none font-bold"}>
          {convertTemplateGroupNameToTitle(group.name)}
        </h1>
        <hr className={"border-main-orange"} />
        <div className={"flex w-full flex-wrap gap-1"}>
          {group.images.map((image, i) => (
            <div
              className={
                "relative aspect-square w-[18%] cursor-pointer rounded-md hover:scale-105"
              }
              key={`image-${i}`}
              onClick={() => updateSelectedTextures(image, "image")}
            >
              <Image
                src={image}
                alt={`group-${i}-image-${i}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div
      className={
        "relative flex h-full w-24 flex-col gap-1 border-r border-r-main-orange p-1"
      }
    >
      {loading && RenderLoading()}
      {!loading && (
        <>
          <div
            className={
              "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-orange p-2"
            }
            onClick={() => setShowPanel(showPanel != 0 ? 0 : -1)}
          >
            <SiTaichigraphics className={"text-4xl/none"} />
            <span className={"text-xs/none font-bold"}>Graphics</span>
          </div>
          <div
            className={
              "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-orange p-2"
            }
            onClick={() => setShowPanel(showPanel != 1 ? 1 : -1)}
          >
            <LuUploadCloud className={"text-4xl/none"} />
            <span className={"text-xs/none font-bold"}>Upload</span>
          </div>
          <div
            className={
              "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-main-orange p-2"
            }
            onClick={() => setShowPanel(showPanel != 2 ? 2 : -1)}
          >
            <TbTextSize className={"text-4xl/none"} />
            <span className={"text-xs/none font-bold"}>Text</span>
          </div>
        </>
      )}

      {showPanel != -1 && (
        <div
          className={
            "absolute bottom-0 left-[101%] top-0 z-10 h-full w-52 border-r-2 border-main-orange bg-[#fafafa]"
          }
        >
          {showPanel == 0 && (
            <ScrollArea className={"h-full w-full p-4"}>
              {RenderImages()}
            </ScrollArea>
          )}
          {showPanel == 1 && (
            <div className={"flex h-full w-full flex-col gap-2 p-4"}>
              <div className={"flex items-center gap-2"}>
                <h1 className={"text-base/none font-bold"}>Uploads</h1>
                <label htmlFor="file-upload">
                  <IoIosAddCircleOutline
                    className={"cursor-pointer text-2xl text-main-orange"}
                  />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className={"hidden"}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setUploads([...uploads, e.target.files[0]]);
                    }
                  }}
                />
              </div>
              <hr className={"border-main-orange"} />
              <div className={"flex flex-wrap gap-1"}>
                {uploads.length == 0 && (
                  <div
                    className={
                      "flex h-full w-full justify-center py-2 text-sm font-bold text-main-orange/50"
                    }
                  >
                    Empty
                  </div>
                )}
                {uploads.map((file, i) => (
                  <div
                    key={`upload-${i}`}
                    className={
                      "relative h-20 w-20 cursor-pointer rounded-md hover:scale-105"
                    }
                    onClick={() =>
                      updateSelectedTextures(URL.createObjectURL(file), "image")
                    }
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {showPanel == 2 && (
            <div className={"flex flex-col gap-2 p-2"}>
              <Input ref={inputRef} placeholder={"Enter text"} />
              <Button
                className={"w-fit"}
                onClick={() => {
                  if (!inputRef.current) return;
                  updateSelectedTextures(inputRef.current.value, "text");
                }}
              >
                Add
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
