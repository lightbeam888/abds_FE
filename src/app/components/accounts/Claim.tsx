"use client";

import React, { useEffect, useState } from "react";

import { useAccount, useContractRead } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { stakingABI, ABDSABI } from "../../utils/abi";

const Claim = () => {
  const { isConnected, address } = useAccount();
  const [currentIndex, setcurrentIndex] = useState(0);
  const [activeBoost, setActiveBoost] = useState(0);

  const [currentReward, setCurrentReward] = useState(0);

  const getStakingList = () => {
    const data = useContractRead({
      address: "0xD0938baa7E1c0a7625AA2d36CFEdBBbDFb364aC0",
      abi: stakingABI,
      functionName: "getUserStakes",
      args: [address],
    });
    return data.data;
  };
  const stakeList: any = getStakingList();
  console.log("-----", stakeList);
  const handleClaim = async () => {
    // staking
    const result = await writeContract(config, {
      abi: stakingABI,
      address: "0xD0938baa7E1c0a7625AA2d36CFEdBBbDFb364aC0",
      functionName: "Claim",
      args: [activeBoost],
    });
    if (result) alert("Claimed successfully");
    else {
      alert("Claim failed");
      return result;
    }
  };

  // const pendingReward = async () => {
  //   /* const data =  */ await readContract(config, {
  //     abi: stakingABI,
  //     address: "0xD0938baa7E1c0a7625AA2d36CFEdBBbDFb364aC0",
  //     functionName: "currentReward",
  //     // args: [],
  //   })
  //     .then((data: any) => {
  //       setCurrentReward(data);
  //     })
  //     .catch();
  // };

  // const currentReward = pendingReward();
  // pendingReward();
  return (
    <div className="w-full rounded-b-[15px] border-x border-b border-x-border border-b-border pt-[17px] md:pt-[38px]">
      {/* <div className="px-2 md:px-6">
        <p className="text-[10px] text-secondary_light md:text-sm">
          Unstake Amount
        </p>
        <div className="input mt-2 w-full">
          <input
            type="number"
            placeholder=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="relative w-full rounded-[10px] border border-border bg-[#F6F8F7] p-2 text-[17px] font-semibold text-black focus:border-primary focus:outline-none md:py-[17px] md:pl-[14px] md:text-[27px]"
          />
        </div>
      </div> */}
      <div className="mt-[14px] w-full px-2 md:mt-8 md:px-6">
        <div className="w-full">
          {/* Table Headings */}
          <div className="mb-1 flex items-center space-x-4 rounded-t-lg bg-[#08D1A4] p-3 font-semibold text-white">
            <p className="w-1/3 text-[8px] md:text-lg">Amount</p>
            <p className="w-1/3 text-[8px] md:text-lg">Start Time</p>
            <p className="w-1/3 text-[8px] md:text-lg">Duration</p>
            <p className="w-1/3 text-[8px] md:text-lg">End Time</p>
          </div>

          {/* Table Rows */}
          <ul className="flex flex-col space-y-2">
            {stakeList?.map((staking: any, index: any) => (
              <li
                key={index}
                onClick={() => {
                  setcurrentIndex(index);
                  console.log(index);
                }}
                className={`flex cursor-pointer items-center space-x-4 p-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#BBBBBB] text-white shadow-lg"
                    : "border border-[#08D1A4] bg-white text-gray-800 hover:bg-[#08D1A4]/10"
                }`}
              >
                <p className="w-1/3 font-medium"> {staking.amount} </p>
                <p className="w-1/3 font-medium">
                  {new Date(
                    Number(staking.startTime) * 1000,
                  ).toLocaleDateString()}
                </p>
                <p className="w-1/3 font-medium"> {staking.duration} </p>
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
      <div className="mt-3 px-2 md:px-6">
        <div className="grid w-full grid-cols-4 gap-1 rounded-[15px] border border-border bg-[#F6F8F7] px-[6px] py-[5px] md:gap-[10px] md:px-[15px]">
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${activeBoost === 0 ? "border border-primary" : ""}`}
            onClick={() => setActiveBoost(0)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${activeBoost == 0 ? "text-primary" : "text-black"}`}
            >
              ABDS
            </p>
          </button>

          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${activeBoost === 1 ? "border border-primary" : ""}`}
            onClick={() => setActiveBoost(1)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${activeBoost == 1 ? "text-primary" : "text-black"}`}
            >
              USDT
            </p>
          </button>
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${activeBoost === 2 ? "border border-primary" : ""}`}
            onClick={() => setActiveBoost(2)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${activeBoost == 2 ? "text-primary" : "text-black"}`}
            >
              USDC
            </p>
          </button>
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${activeBoost === 3 ? "border border-primary" : ""}`}
            onClick={() => setActiveBoost(3)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${activeBoost == 3 ? "text-primary" : "text-black"}`}
            >
              ETH
            </p>
          </button>
        </div>
      </div>

      <div className="mt-3 px-2 md:mt-8 md:px-6">
        <p className="text-[10px] text-secondary_light md:text-sm">
          Reward Amount you get
        </p>
        {/* input box */}
        <div className="input mt-2 w-full">
          <input
            value={currentReward}
            disabled={true}
            className="relative w-full rounded-[10px] border border-border bg-[#F6F8F7] p-2 text-[17px] font-semibold text-black focus:border-primary focus:outline-none md:py-[17px] md:pl-[14px] md:text-[27px]"
          />
        </div>
      </div>
      <div className="buttons mt-[18px] flex h-[38px] w-full md:mt-10 md:h-[72px]">
        <button
          onClick={handleClaim}
          className="flex h-full w-full items-center justify-center rounded-b-[15px] bg-primary text-[10px] font-semibold text-white md:text-[17px]"
        >
          Claim Now
        </button>
      </div>
    </div>
  );
};

export default Claim;
