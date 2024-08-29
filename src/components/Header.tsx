import { FC } from "react";
import { PiNotePencilFill } from "react-icons/pi";

const Header: FC = () => {
  return (
    <header className="header">
      <PiNotePencilFill />
      <h1>Card Generator</h1>
    </header>
  );
};

export default Header;
