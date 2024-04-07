import { GetOCRLanguage, OCRLanguage } from "@/app/lib/constants/label";

interface Props {
  defaultLanguage: OCRLanguage;
  onChange: (language: OCRLanguage) => void;
}

export default function OCRLanguageSelect({
  defaultLanguage,
  onChange,
}: Props) {
  return (
    <select
      className={"w-fit border-[1px] border-main-gray px-3 py-2 outline-none"}
      onChange={(e) => onChange(GetOCRLanguage(e.target.value))}
      defaultValue={defaultLanguage}
    >
      <option value={OCRLanguage.English}>English</option>
      <option value={OCRLanguage.Korean}>Korean</option>
      {/*<option value={OCRLanguage.Spanish}>Spanish</option>*/}
      {/*<option value={OCRLanguage.French}>French</option>*/}
      {/*<option value={OCRLanguage.Russian}>Russian</option>*/}
    </select>
  );
}
