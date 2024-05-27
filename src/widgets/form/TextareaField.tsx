import { FunctionComponent, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  label?: string
  value: string;
  onChange: (value: string) => void;
}>
const TextareaField: FunctionComponent<Props> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value); // Remonte la nouvelle valeur vers le parent
  };
  return <div className="wfx-form">
  <label>{label}</label>
  <textarea value={value} onChange={handleChange}></textarea>
</div>
}

export default TextareaField
