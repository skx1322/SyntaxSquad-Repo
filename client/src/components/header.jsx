import React from "react";
import { Link, useLocation } from "react-router-dom";
import { headerData } from "../common/component.data";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const location = useLocation();
  return (
    <header className="bg-color-background p-4 shadow-md relative">
      <nav className="flex justify-between items-center lg:px-24 md:px-12 sm:px-6">
        <div className="flex-1">
          <Link to={"/"} className="text-color-primary text-xl font-bold">
            Clevra
          </Link>
        </div>
        <div
          className={`
            ${
              isMobileMenuOpen
                ? "fixed inset-0 z-50 flex flex-col items-center justify-start pt-24 bg-secondary/60 bg-color-primary-dark transition-transform duration-300 gap-6"
                : "hidden"
            }
            md:flex md:flex-row md:static md:bg-transparent md:justify-end md:items-center md:flex-1 md:space-x-8
          `}
        >
          {headerData.map((data, index) => (
            <Link
              key={index}
              to={data.path}
              className={`text-3xl font-semibold mb-6 md:text-color-text md:text-base md:font-medium md:mb-0 hover:text-accent/60 transition-colors 
                ${
                  location.pathname === data.path ? "text-accent" : "text-black"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {data.headerName}
            </Link>
          ))}
        </div>
      </nav>
      <div className="md:hidden absolute right-4 top-4 z-50">
        <FaBars
          onClick={handleToggleMenu}
          className={`text-color-text text-2xl cursor-pointer transform transistion-normal duration-500 ${isMobileMenuOpen ? "rotate-90 text-accent" : "rotate-0"}`}
        />
      </div>
    </header>
  );
};

export default Header;
