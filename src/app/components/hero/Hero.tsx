"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/navigation/Navbar";
import Settings from "@/app/assets/icons/settings.png";
import Refresh from "@/app/assets/icons/refresh.png";

const heroVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Hero = () => {
  return (
    <div
      className="w-full bg-[#1C1D1E] px-[29px] pb-[128px] pt-[27px] md:px-[37px]"
      style={{ backgroundImage: "url(/bg.jpg)", backgroundSize: "cover" }}
    >
      <Navbar />
      <div className="mt-[55px] flex w-full flex-col items-end justify-between md:mt-[109px] md:flex-row">
        {/* Left section */}
        <motion.div
          className="left"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={heroVariants}
        >
          {/* Breadcrumb */}
          <div className="text-[12px] text-secondary_dark md:text-[20px]">
            <span>Home</span>
            <span>/</span>
            <span className="font-bold text-white">Staking</span>
          </div>
          <motion.h1
            className="mt-2 text-[26px] font-semibold md:text-[60px]"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={heroVariants}
          >
            <span className="text-primary">Stake</span> Your Amount
          </motion.h1>
          <motion.p
            className="mt-2 max-w-[562px] text-[10px] text-secondary_dark md:text-[17px]"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={heroVariants}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
        </motion.div>
        {/* Right section */}
        <motion.div
          className="mx-auto mt-[22px] flex flex-col items-center justify-end md:mx-0 md:mt-0 md:items-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          {/* <div className="buttons flex items-center justify-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-[7px] border border-[#4B4848] bg-dark_text p-[11px]"
            >
              <Image src={Settings} alt="settings" />
            </motion.button>
            <div className="md:hidden">
              <ShowingButtons />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-[7px] border border-[#4B4848] bg-dark_text p-[11px]"
            >
              <Image src={Refresh} alt="refresh" />
            </motion.button>
          </div> */}
          <div className="hidden md:flex">
            <ShowingButtons />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ShowingButtons = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative inline-flex items-center space-x-2 rounded-lg border border-secondary_dark bg-transparent px-4 py-3 text-sm md:mt-2 md:rounded-xl md:py-4 md:text-base"
    >
      <span className="text-secondary_dark">Showing:</span>
      <select
        name="filter"
        id="time-select"
        className="appearance-none rounded-lg bg-transparent font-bold text-white outline-none"
      >
        <option value="year">This Year</option>
        <option value="month">This Month</option>
        <option value="week">This Week</option>
      </select>
    </motion.div>
  );
};

export default Hero;
