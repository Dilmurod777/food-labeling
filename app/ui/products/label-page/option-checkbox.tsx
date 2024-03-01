interface Props {
  index: number;
  text: string;
  defaultChecked: boolean;
  onChange: (value: boolean) => void;
}

export default function OptionCheckbox({
  index,
  defaultChecked,
  onChange,
  text,
}: Props) {
  return (
    <div className={"flex items-center gap-2 p-3 text-sm *:cursor-pointer"}>
      <input
        type="checkbox"
        id={`label-sections-${index}`}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={`label-sections-${index}`}>{text}</label>
    </div>
  );
}
