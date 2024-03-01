interface Props {
  perPage: number;
  page: number;
  totalPages: number;
  setPage: (index: number) => void;
}

export default function Pagination({
  perPage,
  page,
  totalPages,
  setPage,
}: Props) {
  return (
    <nav
      className="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="mb-4 w-full text-sm font-normal text-black">
        Showing{" "}
        <span className="font-semibold">
          {perPage * page + 1}-{Math.min(perPage * (page + 1), totalPages)}
        </span>{" "}
        of <span className="font-semibold">{totalPages}</span>
      </span>
      <ul className="inline-flex h-8 -space-x-px text-sm *:flex *:h-8 *:items-center *:justify-center *:border *:border-main-gray *:px-3 *:leading-tight">
        <li
          className={`rounded-l-lg ${page - 1 >= 0 ? "cursor-pointer bg-white text-black hover:bg-main-orange hover:text-white" : "cursor-not-allowed bg-main-gray text-gray-400"}`}
          onClick={() => {
            if (page - 1 < 0) return;
            setPage(page - 1);
          }}
        >
          Previous
        </li>
        <li
          className={"bg-main-orange text-white"}
          onClick={() => setPage(page)}
        >
          {page + 1}
        </li>
        <li
          className={`rounded-r-lg ${page + 1 < totalPages ? "cursor-pointer bg-white text-black hover:bg-main-orange hover:text-white" : "cursor-not-allowed bg-main-gray text-gray-400"}`}
          onClick={() => {
            if (page + 1 >= totalPages) return;
            setPage(page + 1);
          }}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}
