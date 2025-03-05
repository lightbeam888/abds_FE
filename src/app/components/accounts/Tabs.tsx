"use client";
import React from "react";
import { motion } from "framer-motion";

interface TabsProps {
  active: string;
  handleItemClick: (item: string) => void;
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  active: {
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const Tabs: React.FC<TabsProps> = ({ active, handleItemClick }) => {
  return (
    <div className="mt-4 grid w-full grid-cols-4 rounded-t-[15px] border border-border">
      {["stake", "withdraw", "boost", "claim"].map((item) => (
        <motion.button
          key={item}
          className={`tab_item ${active === item ? "active" : ""}`}
          onClick={() => handleItemClick(item)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="active"
        >
          {item.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
};

export default Tabs;
