interface Testimonial {
  text: string;
  author: string;
  job: string;
}

export default function Testimonials() {
  const items: Testimonial[] = [
    {
      text: "So many of our small businesses struggle to get nutrition labels done, this is a much needed resource that we'll be incorporating into our curriculum.",
      author: "Leticia",
      job: "PROGRAM DEVELOPER, LA COCINA INCUBATOR",
    },
    {
      text: "I love your product as a start-up food company! Thanks so much!",
      author: "Kristy",
      job: "OWNER, PALEO SUPPLY CO",
    },
    {
      text: "This is really wonderful!!! Thank you!",
      author: "Sausan",
      job: "OWNER, BITCHIN’ BAKLAVA",
    },
    {
      text: "Great service! Will definitely use again. Will recommend highly to others.",
      author: "Alan",
      job: "OPERATIONS, CAROLINA FARMIN’",
    },
    {
      text: "Foodplanet is a brilliant product. I've gone through a number of alternatives and I really appreciate how much this has simplified my life.",
      author: "Kevin",
      job: "CO-FOUNDER, IMMI",
    },
    {
      text: "I wish I had known about this earlier! I just wasted $160 getting my nutritionals done!",
      author: "Cesario",
      job: "MANAGER, EL PAJARO KITCHEN",
    },
  ];

  return (
    <div className={"mx-auto my-12 flex w-full flex-col items-center px-12"}>
      <h2 className={"text-4xl font-bold"}>
        See what our customers are saying
      </h2>

      <div className={"mt-12 flex w-full flex-wrap justify-between gap-y-6"}>
        {items.map((item, i) => (
          <blockquote key={`${item.author}_${i}`} className={"h-auto w-[33%]"}>
            <div className={"border-l-[3px] border-l-main-green px-6 py-5"}>
              <p className={"mb-6 text-sm font-normal italic text-[#6c6f7c]"}>
                &quot;{item.text}&quot;
              </p>
              <p className={"text-sm font-bold"}>{item.author}</p>
              <span className={"bold-thin text-xs"}>{item.job}</span>
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
