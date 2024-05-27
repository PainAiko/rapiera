import { FunctionComponent, PropsWithChildren, memo } from "react";

export const CheckboxSingle: FunctionComponent<
  PropsWithChildren<{
    option?: string;
    checkboxClassName?: string;
    checked?: boolean
    onChange?: () => void
  }>
> = memo(({ checkboxClassName = "mr-5", option, checked=false, onChange }) => {
  return (
    <div className={`wfx-checkbox ${checkboxClassName}`}>
      <label className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="cr">
          <i className="cr-icon fa-solid fa-check"></i>
        </span>
        <span>{option}</span>
      </label>
    </div>
  );
});