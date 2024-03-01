import { useFormStatus } from "react-dom";
import { FaCopy } from "react-icons/fa";

export default function FormCopyButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type={"submit"}
      className={"group flex cursor-pointer items-center gap-1"}
    >
      <FaCopy className={"text-lg text-blue-500"} />
      <span className={"text-sm font-bold group-hover:text-blue-500"}>
        {pending ? "Copying..." : "Copy"}
      </span>
    </button>
  );
}
