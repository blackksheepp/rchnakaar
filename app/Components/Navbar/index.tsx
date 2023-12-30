import React from "react";
import Image from "next/image";

interface NavbarProps {
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  return (
    <nav>
      <div className="flex p-s1 lg:px-28 pt-4 pb-1 lg:pt-4 lg:pb-0 flex-row">
        <Image
          src="/img/LOGO.png"
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="dropshadow w-40 h-auto mr-auto"
        />
        <div className="flex flex-row cursor-pointer">
          <Image
            src="/img/cart.png"
            alt="cart"
            width={0}
            height={0}
            sizes="100vw"
            className="dropshadow w-14 h-auto ml-auto"
            onClick={onClick}
          />
          <p
            className="hidden md:flex lg:flex text-accent font-retro text-2xl md:text-[1.5rem] md:pt-2 dropshadow"
            onClick={onClick}
          >
            Cart
          </p>
        </div>
      </div>
      <div className="bg-accent w-full h-[1px] lg:h-[2px] mt-4"></div>
    </nav>
  );
};

export default Navbar;
