"use client";
import React from "react";
import Tabs from "@/app/components/accounts/Tabs";
import Stake from "@/app/components/accounts/Stake";
import Withdraw from "@/app/components/accounts/Withdraw";
import Boost from "@/app/components/accounts/Boost";
import Claim from "@/app/components/accounts/Claim";

const Accounts = () => {
  const [active, setActive] = React.useState("stake");
  return (
    <div className="px-[29px] pt-4 text-black md:pl-[37px] md:pr-0">
      <h2 className="text-center text-[21px] font-bold text-primary md:text-start md:text-[25px]">
        YOUR ACCOUNTS
      </h2>
      <Tabs active={active} handleItemClick={setActive} />
      {active === "stake" && <Stake />}
      {active === "withdraw" && <Withdraw />}
      {active === "boost" && <Boost />}
      {active === "claim" && <Claim />}
    </div>
  );
};

export default Accounts;
