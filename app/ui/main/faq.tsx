import defaultItems from "@/public/faq/default-faq.json";
import { FAQItem } from "@/app/lib/interfaces";

export default function FAQ({ items = defaultItems }: { items?: FAQItem[] }) {
  return (
    <div
      className={
        "flex w-full flex-col items-center bg-main-gray px-12 py-12 pb-4 text-black"
      }
    >
      <h2 className={"text-4xl font-bold"}>Frequently asked questions</h2>

      <div className={"mb-12 mt-6 h-[8px] w-[85px] bg-main"} />

      <div className={"flex flex-col gap-6"}>
        {items.map((item: FAQItem, i) => (
          <div
            key={`faq_${i}`}
            className={"rounded-[6px] bg-white p-3 text-[#16181e]"}
            style={{
              boxShadow: "0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05",
            }}
          >
            <h3 className={"mb-3 text-lg font-extrabold text-main"}>
              {item.question}
            </h3>

            <p
              className={"text-sm font-normal text-[#6c6f7c]"}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
