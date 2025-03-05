"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/images/logo.png";
import BurgerMenu from "@/app/assets/icons/burger_menu.png";
import Menu from "@/app/components/navigation/Menu";
import ActionButtons from "@/app/components/navigation/ActionButtons";
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  return (
    <div className="relative flex w-full items-center justify-between rounded-[11px] bg-dark_text px-3 py-2 md:rounded-[20px] md:px-4 md:py-5">
      {/* logo */}
      <button>
        <Image src={Logo} className="w-[161px] md:w-[300px]" alt="logo" />
      </button>

      {/* burger button */}
      <button
        onClick={() => setShowMobileMenu(true)}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-[#D5FAEC] md:hidden"
      >
        <Image
          src={BurgerMenu}
          className="h-[17px] w-[19px]"
          alt="burger menu"
        />
      </button>

      {/* mobile menu */}
      {showMobileMenu && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex h-full flex-col bg-[#1C1D1E] p-9 md:hidden">
          <div className="relative">
            {/* cross button */}
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-md bg-[#D5FAEC] text-2xl font-bold text-primary"
            >
              X
            </button>
            {/* logo */}
            <button>
              <Image src={Logo} className="w-[161px] md:w-[300px]" alt="logo" />
            </button>
            <div className="my-5 pl-3">
              <Menu />
            </div>
            <ActionButtons />
          </div>
        </div>
      )}

      {/* menu */}
      <div className="hidden md:flex">
        <Menu />
      </div>

      {/* action buttons */}
      <div className="hidden md:flex">
        <ActionButtons />
      </div>
    </div>
  );
};

export default Navbar;
