interface Props {
  extracting: boolean;
  fileUploaded: boolean;
  clickHandler: () => void;
}

export default function OCRExtractButton({
  extracting,
  fileUploaded,
  clickHandler,
}: Props) {
  return (
    <div
      className={`min-w-36 rounded-md px-4 py-4 text-center ${fileUploaded ? "cursor-pointer bg-main text-white hover:bg-hover-main" : "cursor-not-allowed bg-main-gray text-secondary-gray"}`}
      onClick={clickHandler}
    >
      {extracting ? "Extracting" : "Extract"}
    </div>
  );
}
