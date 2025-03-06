"use client";
import React from "react";

interface TabsProps {
  active: string;
  handleItemClick: (item: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ active, handleItemClick }) => {
  console.log(active);
  return (
    <div className="mt-4 grid w-full grid-cols-4 rounded-t-[15px] border border-border">
      <button
        className={`tab_item ${active == "stake" ? "active" : ""}`}
        onClick={() => handleItemClick("stake")}
      >
        STAKE
      </button>
      <button
        className={`tab_item ${active == "withdraw" ? "active" : ""}`}
        onClick={() => handleItemClick("withdraw")}
      >
        WITHDRAW
      </button>
      <button
        className={`tab_item ${active == "boost" ? "active" : ""}`}
        onClick={() => handleItemClick("boost")}
      >
        BOOST
      </button>
      <button
        className={`tab_item ${active == "claim" ? "active" : ""}`}
        onClick={() => handleItemClick("claim")}
      >
        Claim
      </button>
    </div>
  );
};

export default Tabs;
