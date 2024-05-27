import { ChangeEventHandler, PropsWithChildren } from "react";
import Input from  "@widgets/form/Input";

interface Props extends PropsWithChildren {
  handlechange: ChangeEventHandler<HTMLInputElement>
}

function Search({handlechange}: Props) {

  return (
    <div className="search">
      <Input>
        <input
          type="search"
          placeholder="Rechercher..."
          onChange={handlechange}
        />
      </Input>
    </div>
  );
}

export default Search;
