import defaultItems from "@/public/faq/default-faq.json";
import {FAQItem} from "@/app/lib/models";


export default function FAQ({items = defaultItems}: { items?: FAQItem[] }) {
    return <div className={"flex flex-col items-center text-black bg-main-gray py-24 px-24"}>
        <h2 className={"font-bold text-4xl"}>Frequently asked questions</h2>

        <div className={"h-[8px] w-[85px] mt-6 mb-12 bg-main-green"}/>

        <div className={"flex flex-col gap-6"}>
            {items.map((item: FAQItem, i) => <div
                key={`faq_${i}`}
                className={"text-[#16181e] rounded-[6px] bg-white p-3"}
                style={{
                    boxShadow: "0 0.5em 1em -0.125em #0a0a0a1a, 0 0 0 1px #0a0a0a05"
                }}
            >
                <h3 className={"text-main-blue font-normal text-lg mb-3"}>{item.question}</h3>

                <p className={"font-normal text-sm text-[#6c6f7c]"} dangerouslySetInnerHTML={{__html: item.answer}}/>
            </div>)}
        </div>
    </div>
}