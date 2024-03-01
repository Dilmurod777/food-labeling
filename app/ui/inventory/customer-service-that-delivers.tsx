import Link from "next/link";

export default function CustomerServiceThatDelivers() {
  return (
    <div className={"flex w-full flex-col items-center gap-4 px-12 pb-8"}>
      <h2 className={"text-4xl font-bold text-black"}>
        Customer service that delivers
      </h2>
      <p className={"text-center text-lg font-normal text-black"}>
        Advice from production and operations experts
        <br />
        Questions answered in minutes, not days
        <br />
        Provide feedback and see it realized
      </p>

      <div className={"mt-6 flex flex-col items-center gap-2"}>
        <Link
          href={"#"}
          className={
            "flex items-center justify-center rounded-md bg-main-green px-8 py-4 text-[1rem] font-bold text-white " +
            "hover:bg-hover-main-green"
          }
        >
          Start managing inventory like the pros!
        </Link>
        <span className={"italic text-secondary-gray"}>or</span>
        <Link
          href={"#"}
          className={
            "text-lg font-bold text-main-blue hover:text-hover-main-blue"
          }
        >
          Schedule a Chat
        </Link>
      </div>
    </div>
  );
}
