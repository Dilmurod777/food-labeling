import { useFormStatus } from "react-dom";
import { MdDelete } from "react-icons/md";

export default function FormDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type={"submit"}
      className={"group flex cursor-pointer items-center gap-1"}
    >
      <MdDelete className={"text-lg text-red-500"} />
      <span className={"text-sm font-bold group-hover:text-red-500"}>
        {pending ? "Deleting..." : "Delete"}
      </span>
    </button>
  );
}
