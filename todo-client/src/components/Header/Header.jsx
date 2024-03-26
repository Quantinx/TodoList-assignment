import "./Header.css";
import { GiNotebook } from "react-icons/gi";

export default function Header() {
  return (
    <header className="box_header">
      <div className="header">
        <h1 className="header__title">TASKIFY</h1>
        <GiNotebook className="header-icon" />
      </div>
    </header>
  );
}
