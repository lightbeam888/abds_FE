"use client";

import React from "react";
import Image from "next/image";
import DownArrow from "@/app/assets/icons/down_arrow.png";

const Rewards = () => {
  return (
    <div className="mt-[29px] flex h-full flex-col px-[29px] pt-4 text-black md:mt-0 md:pl-0 md:pr-[37px]">
      <h2 className="text-center text-[21px] font-bold text-primary md:text-start md:text-[25px]">
        YOUR REWARDS
      </h2>
      <div className="mt-4 flex h-[39px] w-full items-center justify-between rounded-t-[15px] bg-primary px-3 text-white md:h-[63px] md:px-7">
        <p className="text-[8px] font-bold sm:text-[10px] md:text-[17px]">
          FINISHED POOLS
        </p>
        <button className="flex items-center justify-center space-x-1 text-[8px] font-bold md:space-x-2 md:text-[17px]">
          <p>(4)</p>
          <Image
            src={DownArrow}
            alt="down-arrow"
            className="h-[10px] object-contain md:h-[15px]"
          />
        </button>
      </div>
      {/* body */}
    </div>
  );
};

export default Rewards;
