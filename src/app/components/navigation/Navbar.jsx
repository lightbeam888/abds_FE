import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/images/logo.png";
const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-[20px] bg-dark_text px-4 py-5">
      {/* logo */}
      <button>
        <Image src={Logo} width={300} height={26} alt="logo" />
      </button>
      {/* menu */}
      <div className="flex items-center space-x-11">
        <button className="">About Us</button>
        <button className="">Tokenomics</button>
        <button className="">Staking</button>
        <button className="">Exchange</button>
        <button className="">Roadmap</button>
        <button className="">Contact</button>
      </div>
      {/* action buttons */}
      <div className="flex items-center justify-center space-x-5">
        <button className="rounded-[9px] border border-primary px-4 py-[15px] text-[11px] font-bold text-primary">
          BUY ABDS TOKEN
        </button>
        <select
          name="country"
          id="country-select"
          className="cursor-pointer rounded-md bg-[#1C1D1E] p-[7px] text-secondary_dark"
        >
          <option value="us">🇺🇸</option>
          <option value="ca">🇨🇦</option>
          <option value="gb">🇬🇧</option>
          <option value="au">🇦🇺</option>
        </select>{" "}
      </div>
    </div>
  );
};

export default Navbar;
