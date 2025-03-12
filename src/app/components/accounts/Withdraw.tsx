"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useContractRead, useReadContract } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { stakingABI, ABDSABI } from "../../utils/abi";
import axios from "axios";

interface StakeData {
  amount: string;
  startTime: string;
  duration: string;
}

const Withdraw: React.FC = () => {
  const [value] = useState<string>("0.00");
  const [value2] = useState<string>("0.00"); // Kept as it was in original, though unused
  const { isConnected, address } = useAccount();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentReward, setCurrentReward] = useState<string>("0");

  const withdrawTokens = async (
    _address: string | undefined,
  ): Promise<void> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/withdraw`,
        { _address },
      );
      console.log(response.data);
    } catch (error: any) {
      console.error(
        "Error withdrawing tokens:",
        error.response?.data || error.message,
      );
    }
  };

  const { data: stakeList } = useReadContract({
    address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
    abi: stakingABI,
    functionName: "getUserStakes",
    args: [address],
  }) as { data: StakeData[] | undefined };

  console.log("this is user stake", stakeList);

  const handleWithdraw = async (): Promise<void> => {
    try {
      const result = await writeContract(config, {
        abi: stakingABI,
        address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
        functionName: "withdraw",
        args: [],
      });

      if (result) {
        await withdrawTokens(address);
      } else {
        alert("withdraw failed");
      }
    } catch (error: any) {
      console.error("Withdraw failed:", error);
      alert("withdraw failed");
    }
  };

  const fetchPendingReward = async (): Promise<void> => {
    try {
      const data: any = await readContract(config, {
        abi: stakingABI,
        address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
        functionName: "currentReward",
        args: [address],
      });
      console.log(data);
      setCurrentReward(data.toString());
    } catch (error: any) {
      console.error("Error fetching pending reward:", error);
    }
  };
  // console.log(stakeList?.length);
  useEffect(() => {
    if (address) {
      fetchPendingReward();
    }
  }, [address]);

  return (
    <div className="w-full rounded-b-[15px] border-x border-b border-x-border border-b-border pt-[17px] md:pt-[38px]">
      <div className="mt-[14px] w-full px-2 md:mt-8 md:px-6">
        <div className="w-full">
          <div className="mb-1 flex items-center space-x-2 rounded-t-lg bg-[#08D1A4] p-3 font-semibold text-white">
            <p className="w-1/3 text-[10px] md:text-lg">Amount</p>
            <p className="w-1/3 text-[10px] md:text-lg">Start Time</p>
            <p className="w-1/3 text-[10px] md:text-lg">Duration</p>
            <p className="w-1/3 text-[10px] md:text-lg">End Time</p>
          </div>

          <ul className="flex flex-col space-y-2">
            {stakeList?.map((staking, index) => (
              <li
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  console.log(index);
                }}
                className={`flex cursor-pointer items-center space-x-2 p-3 transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#BBBBBB] text-white shadow-lg"
                    : "border border-[#08D1A4] bg-white text-gray-800 hover:bg-[#08D1A4]/10"
                }`}
              >
                <p className="w-1/3 font-medium">
                  {staking.amount / BigInt(10 ** 18)}
                </p>
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

      <div className="mt-3 px-2 md:mt-8 md:px-6">
        <p className="text-[10px] text-secondary_light md:text-sm">
          Reward Amount you get
        </p>
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
