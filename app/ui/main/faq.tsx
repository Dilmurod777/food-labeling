import items from "@/public/faq.json";


interface FAQItem {
    question: string,
    answer: string
}

export default function FAQ() {
    return <div className={"flex flex-col items-center text-black bg-[#e7ecef] py-24 px-12"}>
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

                <p className={"font-normal text-sm text-[#6c6f7c]"}>{item.answer}</p>
            </div>)}
        </div>
    </div>
}