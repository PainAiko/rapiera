import {
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { CheckboxSingle } from "./ChexkBoxSingle";

type Props = PropsWithChildren<{
  label?: string;
  options?: string[];
  checkboxClassName?: string;
  chooseOne?: boolean
  choose: Dispatch<SetStateAction<Record<string, string |  number | boolean>>>
}>

const CheckboxField: FunctionComponent<Props> = ({
  label,
  checkboxClassName = "mr-5",
  options,
  chooseOne,
  choose
}) => {
  const [checkboxList, setCheckBoxList] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (option: string) => {
    if (chooseOne) {
      const newState = Object.keys(checkboxList).reduce((state, key) => {
        state[key] = false;
        return state;
      }, {} as { [key: string]: boolean });

      newState[option] = !checkboxList[option];
      setCheckBoxList(newState);
      choose(newState);
    } else {
      const newState = {
        ...checkboxList,
        [option]: !checkboxList[option]
      };
      setCheckBoxList(newState);
      choose(newState);
    }
  };

  return (
    <div className="wfx-form">
      <label>{label}</label>
      {options?.map((option) => (
        <CheckboxSingle
          option={option}
          key={option}
          checkboxClassName={checkboxClassName}
          checked={checkboxList[option]}
          onChange={() => handleCheckboxChange(option)}
        />
      ))}
    </div>
  );
};


export default CheckboxField;
