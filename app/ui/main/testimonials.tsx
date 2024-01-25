interface Testimonial {
    text: string,
    author: string,
    job: string
}

export default function Testimonials() {
    const items: Testimonial[] = [
        {
            text: "So many of our small businesses struggle to get nutrition labels done, this is a much needed resource that we'll be incorporating into our curriculum.",
            author: "Leticia",
            job: "PROGRAM DEVELOPER, LA COCINA INCUBATOR"
        },
        {
            text: "I love your product as a start-up food company! Thanks so much!",
            author: "Kristy",
            job: "OWNER, PALEO SUPPLY CO"
        },
        {
            text: "This is really wonderful!!! Thank you!",
            author: "Sausan",
            job: "OWNER, BITCHIN’ BAKLAVA"
        },
        {
            text: "Great service! Will definitely use again. Will recommend highly to others.",
            author: "Alan",
            job: "OPERATIONS, CAROLINA FARMIN’"
        },
        {
            text: "Foodplanet is a brilliant product. I've gone through a number of alternatives and I really appreciate how much this has simplified my life.",
            author: "Kevin",
            job: "CO-FOUNDER, IMMI"
        },
        {
            text: "I wish I had known about this earlier! I just wasted $160 getting my nutritionals done!",
            author: "Cesario",
            job: "MANAGER, EL PAJARO KITCHEN"
        }
    ]

    return <div className={"flex flex-col items-center w-full px-12 mx-auto my-12"}>
        <h2 className={"font-bold text-4xl"}>See what our customers are saying</h2>

        <div className={"w-full mt-12 flex flex-wrap justify-between gap-y-6"}>
            {items.map((item, i) => <blockquote
                key={`${item.author}_${i}`}
                className={"w-[33%] h-auto"}
            >
                <div className={"border-l-main-green border-l-[3px] py-5 px-6"}>
                    <p className={"mb-6 text-sm font-normal italic text-[#6c6f7c]"}>
                        &quot;{item.text}&quot;
                    </p>
                    <p className={"font-bold text-sm"}>{item.author}</p>
                    <span className={"bold-thin text-xs"}>{item.job}</span>
                </div>
            </blockquote>)}
        </div>
    </div>
}