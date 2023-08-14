import Navbar from "../Navbar/Navbar";
import MenuDropDownArrow from "../Navbar/NavbarIcons/MenuDropDownArrow";
import MenuHamburger from "../Navbar/NavbarIcons/MenuHamburger";
import { useState } from "react";
export default function NestedMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="group inline-block submenu-react">
        <button
          className="outline-none focus:outline-none flex items-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="flex p-3 justify-start items-center	gap-x-3">
            <MenuHamburger />

            <span className="text-F2F2F2 ml-1.5">Menu</span>

            <div className="ml-1.5">
              <MenuDropDownArrow />
            </div>
          </div>
        </button>
        {showMenu && <Navbar />}
      </div>
    </>
  );
}