"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tabs from "@/app/components/accounts/Tabs";
import Stake from "@/app/components/accounts/Stake";
import Withdraw from "@/app/components/accounts/Withdraw";
import Boost from "@/app/components/accounts/Boost";
import Claim from "@/app/components/accounts/Claim";

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Accounts = () => {
  const [active, setActive] = React.useState("stake");

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const renderTabContent = () => {
    switch (active) {
      case "stake":
        return <Stake />;
      case "withdraw":
        return <Withdraw />;
      case "boost":
        return <Boost />;
      case "claim":
        return <Claim />;
      default:
        return null;
    }
  };

  return (
    <div className="px-[29px] pt-4 text-black md:pl-[37px] md:pr-0">
      <motion.h2
        className="text-center text-[21px] font-bold text-primary md:text-start md:text-[25px]"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        YOUR ACCOUNTS
      </motion.h2>
      <Tabs active={active} handleItemClick={setActive} />
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Accounts;
