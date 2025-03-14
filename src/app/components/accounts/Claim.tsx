"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAccount, useReadContract, useWalletClient } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { parseEther } from "viem";
import { stakingABI } from "../../utils/abi";

interface StakeData {
  amount: string;
  startTime: string;
  duration: string;
}

const Claim: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeBoost, setActiveBoost] = useState<number>(0);
  const [currentReward, setCurrentReward] = useState<string>("0");
  const [isClient, setIsClient] = useState(false);
  const { data: walletClient } = useWalletClient();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: stakeList } = useReadContract({
    address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
    abi: stakingABI,
    functionName: "getUserStakes",
    args: [address],
  }) as { data: StakeData[] | undefined };
  if (!walletClient) return;
  const handleClaim = async (): Promise<void> => {
    try {
      const result = await walletClient.writeContract({
        abi: stakingABI,
        address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
        functionName: "Claim",
        args: [activeBoost],
      });
      if (result) {
        alert("Claimed successfully");
      } else {
        alert("Claim failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Claim failed:", error.message);
      } else {
        console.error("Claim failed:", error);
      }
      alert("Claim failed");
    }
  };

  const fetchPendingReward = async (): Promise<void> => {
    try {
      const data = (await readContract(config, {
        abi: stakingABI,
        address: "0x12CBe0b5a52f2DE868d4B4b7012B3C6Af3543764",
        functionName: "currentReward",
        args: [address],
      })) as string;
      setCurrentReward(data.toString());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching pending reward:", error.message);
      } else {
        console.error("Error fetching pending reward:", error);
      }
    }
  };

  useEffect(() => {
    if (address) {
      fetchPendingReward();
    }
  }, [address, fetchPendingReward]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full rounded-b-[15px] border-x border-b border-x-border border-b-border pt-[17px] md:pt-[38px]">
      <div className="mt-[14px] w-full px-2 md:mt-8 md:px-6">
        <div className="w-full">
          {/* Table Headings */}
          <div className="mb-1 rounded-t-lg bg-[#08D1A4] px-3 py-1.5 font-semibold text-white md:px-6 md:py-3">
            <div className="flex">
              <p className="flex-[0.8] text-left text-[0.7rem] md:text-lg">
                Amount
              </p>
              <p className="flex-1 text-center text-[0.7rem] md:text-lg">
                Start Time
              </p>
              <p className="flex-1 text-center text-[0.7rem] md:text-lg">
                Duration
              </p>
              <p className="flex-[0.8] text-center text-[0.7rem] md:text-lg">
                End Time
              </p>
            </div>
          </div>

          {/* Table Rows */}
          {isConnected ? (
            <ul className="flex flex-col space-y-2">
              {stakeList?.map((staking: StakeData, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    console.log(index);
                  }}
                  className={`flex cursor-pointer items-center justify-between border-b-2 px-3 py-1.5 transition-all duration-300 md:py-3 md:pl-10 md:pr-8 ${
                    index === currentIndex
                      ? "bg-gray-400/85 font-extrabold text-white shadow-md"
                      : "bg-white text-gray-800 hover:bg-[#08D1A4]/20"
                  }`}
                >
                  <p className="flex-[0.8] text-left text-[12px] font-medium md:text-base">
                    {Number(staking.amount) / 1e18}
                  </p>
                  <p className="flex-1 text-center text-[12px] font-medium md:text-base">
                    {new Date(
                      Number(staking.startTime) * 1000,
                    ).toLocaleDateString()}
                  </p>
                  <p className="flex-1 text-center text-[12px] font-medium md:text-base">
                    {staking.duration}
                  </p>
                  <p className="flex-[0.8] text-center text-[12px] font-medium md:text-base">
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
          ) : (
            <div className="pl-3 text-gray-600">
              Your wallet isn&apos;t connected yet.
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 px-2 md:px-6">
        <div className="grid w-full grid-cols-4 gap-1 rounded-[15px] border border-border bg-[#F6F8F7] px-[6px] py-[5px] md:gap-[10px] md:px-[15px]">
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
              activeBoost === 0 ? "border border-primary" : ""
            }`}
            onClick={() => setActiveBoost(0)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${
                activeBoost === 0 ? "text-primary" : "text-black"
              }`}
            >
              ABDS
            </p>
          </button>

          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
              activeBoost === 1 ? "border border-primary" : ""
            }`}
            onClick={() => setActiveBoost(1)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${
                activeBoost === 1 ? "text-primary" : "text-black"
              }`}
            >
              USDT
            </p>
          </button>
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
              activeBoost === 2 ? "border border-primary" : ""
            }`}
            onClick={() => setActiveBoost(2)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${
                activeBoost === 2 ? "text-primary" : "text-black"
              }`}
            >
              USDC
            </p>
          </button>
          {/* boost option */}
          <button
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
              activeBoost === 3 ? "border border-primary" : ""
            }`}
            onClick={() => setActiveBoost(3)}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${
                activeBoost === 3 ? "text-primary" : "text-black"
              }`}
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
            value={
              parseEther(currentReward).toString() === "0"
                ? "0"
                : (Number(currentReward) / 1e18).toFixed(2)
            }
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
