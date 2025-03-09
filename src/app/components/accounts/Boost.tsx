"use client";
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { useAccount, useContractRead } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { stakingABI, ABDSABI } from "../../utils/abi";

interface StakeData {
  amount: string;
  startTime: string;
  duration: string;
}

const Boost: React.FC = () => {
  const [activeBoost, setActiveBoost] = useState<number>(0);
  const [value] = useState<string>("0.00"); // Kept but unused
  const { isConnected, address } = useAccount();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: stakeList } = useContractRead({
    address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
    abi: stakingABI,
    functionName: "getUserStakes",
    args: [address],
  }) as { data: StakeData[] | undefined };

  const handleBoost = async (): Promise<void> => {
    let boostTime = (activeBoost + 2) * 3;
    if (boostTime === 6) boostTime = 182;
    else if (boostTime === 9) boostTime = 273;
    else if (boostTime === 12) boostTime = 365;
    else if (boostTime === 15) boostTime = 456;
    else if (boostTime === 18) boostTime = 547;

    try {
      const result = await writeContract(config, {
        abi: stakingABI,
        address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
        functionName: "boost",
        args: [currentIndex, boostTime],
      });

      if (result) {
        alert("staked successfully");
      } else {
        alert("staking failed");
      }
    } catch (error: any) {
      console.error("Boost failed:", error);
      alert("staking failed");
    }
  };

  const boostOptions = [
    { months: 6, bonus: "+ 2%", index: 0 },
    { months: 9, bonus: "+ 5%", index: 1 },
    { months: 12, bonus: "+ 9%", index: 2 },
  ];

  return (
    <div className="w-full rounded-b-[15px] border-x border-b border-x-border border-b-border pt-[17px] md:pt-[38px]">
      <div className="mt-3 px-2 md:px-6">
        <div className="mt-[17px] w-full md:mt-6">
          <p className="text-[6px] text-secondary_light sm:text-[10px] md:text-sm">
            Time Boost Option
          </p>
          <div className="grid w-full grid-cols-3 gap-1 rounded-[15px] border border-border bg-[#F6F8F7] px-[6px] py-[5px] md:gap-[10px] md:px-[15px] md:py-[7px]">
            {boostOptions.map((option) => (
              <button
                key={option.index}
                className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
                  activeBoost === option.index ? "border border-primary" : ""
                }`}
                onClick={() => setActiveBoost(option.index)}
              >
                <p
                  className={`text-[12px] font-semibold md:text-2xl ${
                    activeBoost === option.index ? "text-primary" : "text-black"
                  }`}
                >
                  {option.months} months
                </p>
                <p className="text-[6px] text-secondary_light sm:text-[10px] md:text-sm">
                  {option.bonus}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[14px] w-full px-2 md:mt-8 md:px-6">
          <ul className="flex flex-col space-y-2">
            {stakeList?.map((staking, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  console.log(index);
                }}
                className={`flex cursor-pointer items-center space-x-4 p-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#08D1A4] text-white shadow-lg"
                    : "border border-[#08D1A4] bg-white text-gray-800 hover:bg-[#08D1A4]/10"
                }`}
              >
                <p className="w-1/3 font-medium">{staking.amount}</p>
                <p className="w-1/3 font-medium">
                  {new Date(
                    Number(staking.startTime) * 1000,
                  ).toLocaleDateString()}
                </p>
                <p className="w-1/3 font-medium">{staking.duration}</p>
                <p className="w-1/3 font-medium">
                  {new Date(
                    new Date(Number(staking.startTime) * 1000).setDate(
                      new Date(Number(staking.startTime) * 1000).getDate() +
                        Number(staking.duration),
                    ),
                  ).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="buttons mt-[18px] flex h-[39px] w-full md:mt-7 md:h-[72px]">
        <button className="flex h-full w-1/2 items-center justify-center rounded-bl-[15px] bg-border text-[10px] font-semibold text-[#544E4E] md:text-[17px]">
          Approve
        </button>
        <button
          onClick={handleBoost}
          className="flex h-full w-1/2 items-center justify-center rounded-br-[15px] bg-primary text-[10px] font-semibold text-white md:text-[17px]"
        >
          Boost Now
        </button>
      </div>
    </div>
  );
};

export default Boost;
