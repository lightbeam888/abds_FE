import React, { useState } from "react";

import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "../../utils/config";
import { stakingABI, ABDSABI } from "../../utils/abi";
import { motion } from "framer-motion";

const Stake = () => {
  const [value, setValue] = useState("0.00");
  const [activeBoost, setActiveBoost] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const { isConnected, address } = useAccount();

  const handleStake = async () => {
    let stakeTime = (activeBoost + 2) * 3;
    if (stakeTime == 6) stakeTime = 182;
    else if (stakeTime == 9) stakeTime = 273;
    else if (stakeTime == 12) stakeTime = 365;
    else if (stakeTime == 15) stakeTime = 456;
    else if (stakeTime == 18) stakeTime = 547;

    //approve
    try {
      await writeContract(config, {
        address: "0x506F6E4847Dc177a62aC9250A9231376569EE728",
        abi: ABDSABI,
        functionName: "approve",
        args: ["0x064910a7f67De2449411F2aA6B093B058E747d1E", value],
      });
    } catch (error) {
      console.error("Approval failed.", error);
      return false;
    }

    // staking
    const result = await writeContract(config, {
      abi: stakingABI,
      address: "0x064910a7f67De2449411F2aA6B093B058E747d1E",
      functionName: "stakeTokens",
      args: [value, stakeTime, isChecked],
    });
    if (result) alert("staked successfully");
    else {
      alert("staking failed");
      return result;
    }
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    console.log("Checkbox checked:", event.target.checked);
  };

  return (
    <div className="w-full rounded-b-[15px] border-x border-b border-x-border border-b-border pt-[17px] md:pt-[38px]">
      <div className="">
        <div className="px-2 md:px-6">
          <p className="text-[10px] text-secondary_light md:text-sm">
            Stake between 500 - Infinity
          </p>
          {/* input box */}
          <div className="input mt-2 w-full">
            <input
              type="number"
              placeholder=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="relative w-full rounded-[10px] border border-border bg-[#F6F8F7] p-2 text-[17px] font-semibold text-black focus:border-primary focus:outline-none md:py-[17px] md:pl-[14px] md:text-[27px]"
            />
          </div>
          {/* boost options */}
          <BoostOptions />
          <div className="flex w-full items-center justify-between">
            {/* Checkbox with label on the left */}
            <label className="flex items-center space-x-2 text-[8px] font-light text-secondary_light md:text-[13px]">
              <input
                type="checkbox"
                className="h-4 w-4 md:h-5 md:w-5"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span>Enable Claim on Lock Time</span>
            </label>

            {/* Text on the right */}
            <span className="mt-1 text-[8px] font-light text-secondary_light md:text-[13px]">
              Lock for longer periods to increase share weight & rewards
            </span>
          </div>
        </div>

        {/* breakdown */}
        <div className="mt-4 w-full">
          <div className="flex items-center justify-between border-b border-b-border px-[10px] py-1.5 text-secondary_light md:px-6 md:py-[11px]">
            <p className="text-[10px] md:text-sm">Your Staking</p>
            <p className="text-[10px] font-semibold text-primary md:text-sm">
              {value} ADBS
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-b-border px-[10px] py-1.5 text-secondary_light md:px-6 md:py-[11px]">
            <p className="text-[10px] md:text-sm">Time Lock</p>
            <p className="text-[10px] font-semibold text-primary md:text-sm">
              {(activeBoost + 2) * 3} months
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-b-border px-[10px] py-1.5 text-secondary_light md:px-6 md:py-[11px]">
            <p className="text-[10px] md:text-sm">Reward</p>
            <p className="text-[10px] font-semibold text-primary md:text-sm">
              +{" "}
              {((((parseFloat(value) < 5000
                ? 9
                : parseFloat(value) < 100000
                  ? 12
                  : 15) *
                ((activeBoost + 2) * 3)) /
                12) *
                parseFloat(value)) /
                100}{" "}
              {"ABDS"}
            </p>
          </div>
        </div>

        {/* actions */}
      </div>
      <div className="buttons mt-[18px] flex h-[39px] w-full md:mt-7 md:h-[72px]">
        <button className="flex h-full w-1/2 items-center justify-center rounded-bl-[15px] bg-border text-[10px] font-semibold text-[#544E4E] md:text-[17px]">
          Approve
        </button>
        <button
          onClick={handleStake}
          className="flex h-full w-1/2 items-center justify-center rounded-br-[15px] bg-primary text-[10px] font-semibold text-white md:text-[17px]"
        >
          Stake Now
        </button>
      </div>
    </div>
  );
};

const BoostOptions = () => {
  const [activeBoost, setActiveBoost] = useState(0);

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <div className="mt-[17px] w-full md:mt-6">
      <p className="text-[6px] text-secondary_light sm:text-[10px] md:text-sm">
        Time Boost Option
      </p>
      <div className="grid w-full grid-cols-5 gap-1 rounded-[15px] border border-border bg-[#F6F8F7] px-[6px] py-[5px] md:gap-[10px] md:px-[15px] md:py-[7px]">
        {[6, 9, 12, 15, 18].map((month, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveBoost(index)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`flex w-full flex-col items-center justify-center rounded-[10px] bg-white p-3 ${
              activeBoost === index ? "border border-primary" : ""
            }`}
          >
            <p
              className={`text-[12px] font-semibold md:text-2xl ${
                activeBoost === index ? "text-primary" : "text-black"
              }`}
            >
              {month}
            </p>
            <p className="text-[6px] text-secondary_light sm:text-[10px] md:text-sm">
              months
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Stake;
