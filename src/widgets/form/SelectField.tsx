import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
} from "react";

type Props = PropsWithChildren<{
  label?: string;
  selectedvalue?: string | number;
  options: { title: string; value: string | number }[];
  getvalue: Dispatch<SetStateAction<{ title: string; value: string | number }>>;
}>;

const SelectField: FunctionComponent<Props> = ({
  label,
  options,
  selectedvalue,
  getvalue,
  children,
}) => {
  const handlechange = (e: ChangeEvent<HTMLSelectElement>) => {
    getvalue(
      options.find((option) => option.value == e.target.value) as {
        title: string;
        value: string | number;
      }
    );
  };

  return (
    <div className="wfx-form position-relative">
      <label>{label}</label>
      <select
        value={options?.find((option) => option.title === selectedvalue)?.value}
        onChange={handlechange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
};

export default SelectField;
