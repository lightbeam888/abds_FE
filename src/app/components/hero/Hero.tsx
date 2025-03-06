"use client";
import Image from "next/image";
import Navbar from "@/app/components/navigation/Navbar";
import Settings from "@/app/assets/icons/settings.png";
import Refresh from "@/app/assets/icons/refresh.png";
import { useState } from "react";
const Hero = ({ onIndexChange }) => {
  return (
    <div className="w-full bg-[#1C1D1E] px-[29px] pb-[128px] pt-[27px] md:px-[37px]">
      <Navbar />
      <div className="mt-[55px] flex w-full flex-col items-end justify-between md:mt-[109px] md:flex-row">
        <div className="left">
          {/* track */}
          <div className="text-[12px] text-secondary_dark md:text-[20px]">
            <span>Home</span>
            <span>/</span>
            <span className="font-bold text-white">Staking</span>
          </div>
          <h1 className="text-[26px] font-semibold md:text-[60px]">
            <span className="text-primary">Stake</span> Your Amount
          </h1>
          <p className="max-w-[562px] text-[10px] text-secondary_dark md:text-[17px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
        </div>
        {/* right part */}
        <div className="mx-auto mt-[22px] flex flex-col items-center justify-end md:mx-0 md:mt-0 md:items-end">
          <div className="buttons flex items-center justify-center space-x-2">
            <button className="rounded-[7px] border border-[#4B4848] bg-dark_text p-[11px]">
              <Image src={Settings} alt="settings" />
            </button>
            <div className="md:hidden">
              <ShwoingButtons onIndexChange={onIndexChange} />
            </div>
            <button className="rounded-[7px] border border-[#4B4848] bg-dark_text p-[11px]">
              <Image src={Refresh} alt="refresh" />
            </button>
          </div>
          <div className="hidden md:flex">
            <ShwoingButtons onIndexChange={onIndexChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ShwoingButtons = ({ onIndexChange }) => {
  const [selectedOption, setSelectedOption] = useState(0); // Default value as 0

  // Step 2: Handle change
  const handleChange = (event) => {
    setSelectedOption(Number(event.target.value)); // Convert string to number
    console.log(Number(event.target.value));
    onIndexChange(Number(event.target.value));
  };
  return (
    <button className="space-x-1 rounded-[9px] border border-secondary_dark px-4 py-3 text-[10px] md:mt-[10px] md:rounded-[12px] md:py-[18px] md:text-base">
      <span className="text-secondary_dark">showing:</span>
      <select
        name="filter"
        id="time-select"
        className="rounded-lg p-2 font-bold text-[#08D1A4]"
        value={selectedOption} // Step 3: Bind the state
        onChange={handleChange} // Step 3: Handle change
      >
        <option value={0} className="bg-gray-800 text-[#08D1A4]">
          This Year
        </option>
        <option value={1} className="bg-gray-800 text-[#08D1A4]">
          This Month
        </option>
        <option value={2} className="bg-gray-800 text-[#08D1A4]">
          This Week
        </option>
      </select>
    </button>
  );
};

export default Hero;
