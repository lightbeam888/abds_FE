"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DownArrow from "@/app/assets/icons/down_arrow.png";
import FinishedPoolItem from "@/app/components/accounts/FinishedPoolItem";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Rewards = () => {
  return (
    <motion.div
      className="mt-[29px] flex h-full flex-col px-[29px] pt-4 text-black md:mt-0 md:pl-0 md:pr-[37px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-center text-[21px] font-bold text-primary md:text-start md:text-[25px]"
        variants={titleVariants}
      >
        YOUR REWARDS
      </motion.h2>
      <motion.div
        className="mt-4 flex h-[39px] w-full items-center justify-between rounded-t-[15px] bg-primary px-3 text-white md:h-[63px] md:px-7"
        variants={headerVariants}
      >
        <p className="text-[8px] font-bold sm:text-[10px] md:text-[17px]">
          FINISHED POOLS
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center space-x-1 text-[8px] font-bold md:space-x-2 md:text-[17px]"
        >
          <p>(4)</p>
          <Image
            src={DownArrow}
            alt="down-arrow"
            className="h-[10px] object-contain md:h-[15px]"
          />
        </motion.button>
      </motion.div>
      {/* Body - Optionally animate FinishedPoolItem list */}
      <motion.div
        className="w-full grow rounded-b-[15px] border-x border-b border-x-border border-b-border"
        variants={headerVariants}
      >
        <FinishedPoolItem />
        <FinishedPoolItem />
        <FinishedPoolItem />
        <FinishedPoolItem />
      </motion.div>
    </motion.div>
  );
};

export default Rewards;
