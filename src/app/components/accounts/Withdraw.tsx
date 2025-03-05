"use client";
import React, { useState } from "react";

import { useAccount, useContractRead } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { stakingABI, ABDSABI } from "../../utils/abi";

const Withdraw = () => {
  const [value, setValue] = React.useState("0.00");
  const [value2, setValue2] = React.useState("0.00");
  const { isConnected, address } = useAccount();
  const [currentIndex, setcurrentIndex] = useState(0);

  let stakeList = [];
  const getStakingList = () => {
    const data = useContractRead({
      address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
      abi: stakingABI,
      functionName: "getUserStakes",
      args: [address],
    });
    return data.data;
  };
  stakeList = getStakingList();

  const handleWithdraw = async () => {
    // staking
    const result = await writeContract(config, {
      abi: stakingABI,
      address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
      functionName: "withdraw",
      args: [],
    });
    if (result) alert("withdraw successfully");
    else {
      alert("withdraw failed");
      return result;
    }
  };

  const pendingReward = () => {
    const data = useContractRead({
      address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
      abi: stakingABI,
      functionName: "currentReward",
      args: [],
    });
    console.log(data);
  };

  const currentReward = pendingReward();
  // console.log(currentReward);
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
          <div className="flex items-center space-x-4 rounded-t-lg bg-[#043124] p-3 font-semibold text-white">
            <p className="w-1/3">Amount</p>
            <p className="w-1/3">Start Time</p>
            <p className="w-1/3">Duration</p>
            <p className="w-1/3">End Time</p>
          </div>

          {/* Table Rows */}
          <ul className="flex flex-col space-y-2">
            {stakeList?.map((staking, index) => (
              <li
                key={index}
                onClick={() => {
                  setcurrentIndex(index);
                  console.log(index);
                }}
                className={`flex cursor-pointer items-center space-x-4 p-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#08D1A4] text-white shadow-lg"
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
          onClick={handleWithdraw}
          className="flex h-full w-full items-center justify-center rounded-b-[15px] bg-primary text-[10px] font-semibold text-white md:text-[17px]"
        >
          Withdraw Now
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
