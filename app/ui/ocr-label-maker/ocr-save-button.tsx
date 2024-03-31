interface Props {
  saving: boolean;
  clickHandler: () => void;
}

export default function OCRSaveButton({ saving, clickHandler }: Props) {
  return (
    <div
      className={
        "mt-2 flex cursor-pointer items-center justify-center self-center rounded-md bg-main-orange px-4 py-2 text-lg text-white hover:bg-hover-main-orange"
      }
      onClick={clickHandler}
    >
      {saving ? "Saving" : "Save"}
    </div>
  );
}
