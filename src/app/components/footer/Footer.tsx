import React from "react";
import Image from "next/image";
import LogoLarge from "@/app/assets/images/logo_large.png";

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center bg-[#1C1D1E] px-[52px] py-6 md:py-10">
      <div className="">
        <Image src={LogoLarge} alt="ABD Systems" />
        <div className="mt-11 flex flex-col w-full items-center md:flex-row space-y-7 md:space-y-0 justify-between">
          <button className="text-sm text-white">Terms & Condition</button>
          <button className="text-sm text-white">Privacy Policy</button>
          <button className="text-sm text-white">Cookies Policy</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
