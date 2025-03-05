import React, { useState, useEffect } from "react";
import Modal from "@/app/components/ui/Modal";
import Image from "next/image";
import Close from "@/app/assets/icons/cross.png";
import Clock from "@/app/assets/icons/clock.png";
import People from "@/app/assets/icons/people.png";
import Token from "@/app/assets/icons/token.png";
import StopWatch from "@/app/assets/icons/stopwatch.png";
import Money from "@/app/assets/icons/money.png";
import Wallet from "@/app/assets/icons/wallet.png";
import Pie from "@/app/assets/icons/pie.png";
import profile from "@/app/assets/icons/profile.png";
import stopwatchWhite from "@/app/assets/icons/stopwatch_white.png";
import CopyPrimary from "@/app/assets/icons/copy_primary.png";
import CopySecondary from "@/app/assets/icons/copy_secondary.png";
import Refreh from "@/app/assets/icons/refresh.png";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { injected } from "wagmi/connectors";
const RewardModal = () => {
  const [activeTab, setActiveTab] = useState("pool");
  const [walletName, setwalletName] = useState("Connect Wallet");
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    // if(isConnected)
  }, [isConnected, address]);
  return (
    <div className="scale-in m-10 flex flex-col rounded-[40px] border border-border bg-white text-secondary_light">
      {/* top bar */}
      <div className="flex h-[75px] w-full items-center justify-between border-b border-b-border px-6 py-4">
        <Modal.Close>
          <button className="flex items-center justify-center rounded-[9px] border border-[#50D0A1] bg-[#D5FAEC] p-[10px]">
            <Image src={Close} alt="close" />
          </button>
        </Modal.Close>

        {isConnected ? (
          <div>
            {/* <p>Connected to: {address}</p> */}
            <button
              onClick={() => disconnect()}
              className="rounded-[12px] border border-red-500 bg-[#FAE5E5] px-6 py-4 text-[13px] font-semibold text-red-500 md:text-sm"
            >
              {address}
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              connect({
                connector: injected(),
              })
            }
            className="rounded-[12px] border border-primary bg-[#D5FAEC] px-6 py-4 text-[13px] font-semibold text-primary md:text-sm"
          >
            {walletName}
          </button>
        )}
      </div>
      {/* body */}

      <div className="grid w-full gap-8 py-7 md:grid-cols-2">
        {/* left */}
        <div className="pl-6 pr-6 md:pr-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center space-x-4">
              <Image
                src={Token}
                alt="down-arrow"
                className="h-[61px] w-[61px] object-contain"
              />
              <div className="">
                <p className="text-[20px] text-[#1C1D1E]">USDT(TRON)</p>
                <div className="flex items-center space-x-[14px]">
                  <p className="flex text-[13px] text-secondary_light">
                    <Image
                      src={Clock}
                      alt="down-arrow"
                      className="mr-1 object-contain"
                      height={19}
                      width={19}
                    />
                    Enabled
                  </p>

                  <p className="flex text-[13px] text-secondary_light">
                    <Image
                      src={People}
                      alt="down-arrow"
                      className="mr-1 object-contain"
                      height={19}
                      width={16}
                    />
                    5
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-base font-semibold text-primary">Ended</p>
              <Image src={StopWatch} className="h-4 w-4" alt="close" />
            </div>
          </div>

          {/* infos */}
          <div className="mt-9 w-full">
            {/* row 1 */}
            <div className="grid grid-cols-2 gap-[18px]">
              <div className="w-full">
                <p className="text-sm text-secondary_light">Harvestation</p>
                <div className="mt-2 flex w-full space-x-1 rounded-[14px] border border-border p-4">
                  <Image src={Money} alt="money" className="h-5 w-5" />
                  <p className="text-[#6D6363]">0 USDT</p>
                </div>
              </div>

              <div className="w-full">
                <p className="text-sm text-secondary_light">Your Wallet</p>
                <div className="mt-2 flex w-full space-x-1 rounded-[14px] border border-border p-4">
                  <Image src={Wallet} alt="money" className="h-5 w-5" />
                  <p className="text-[#6D6363]">0 USDT</p>
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="mt-5 w-full">
              <p className="text-sm text-secondary_light">
                Your predicted earning after 0 secounds
              </p>
              <div className="mt-2 flex w-full space-x-1 rounded-[14px] border border-border p-4">
                <Image src={Money} alt="money" className="h-5 w-5" />
                <p className="text-[#6D6363]">0 USDT</p>
              </div>
              <p className="mt-2 text-end text-sm text-[#FF6A00]">
                * if you subscribe to this pool
              </p>
            </div>
            {/* row 3 */}
            <div className="mt-5 w-full">
              <p className="text-sm text-secondary_light">
                Optimistic prediction
              </p>
              <div className="mt-2 flex w-full items-center justify-between space-x-1 rounded-[14px] border border-border p-3">
                <div className="flex items-center space-x-1">
                  <Image src={Pie} alt="money" className="h-5 w-5" />
                  <p className="text-[#6D6363]">0 USDT</p>
                </div>
                <ToggleSwitch />
              </div>
              <p className="mt-2 text-sm text-secondary_light">
                Your estimated reward is no additional users subscribe to this
                reward stream.
              </p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-full pl-6 pr-6 md:pl-0">
          {/* balance */}
          <div className="flex w-full items-center justify-start space-x-4">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-primary bg-[#D5FAEC]">
              <Image src={profile} alt="profile" className="h-[30px] w-7" />
            </div>
            <div className="">
              <p className="text-[20px] font-semibold text-[#353131]">
                Your Stake Balance: 0
              </p>
              <p className="text-[11px] text-[#353131]">
                You need to stake before you can subscribe to rewards
              </p>
            </div>
          </div>
          {/* reward details */}
          <div className="mt-[22px] w-full">
            <button className="flex h-[62px] w-full items-center justify-center space-x-1 rounded-[14px] border border-border bg-primary px-2 text-white">
              <Image src={stopwatchWhite} alt="stopwatch" className="h-5 w-5" />
              <p className="text-[19px] font-semibold">
                Reward Emission has ended
              </p>
            </button>
            <div className="mt-4 w-full">
              {/* row */}
              <div className="flex w-full items-center justify-between border-b border-border py-1.5">
                <p className="text-xs text-secondary_light">Block Reward</p>
                <p className="text-xs font-semibold text-primary">0.022 USDT</p>
              </div>
              {/* row */}
              <div className="flex w-full items-center justify-between border-b border-border py-1.5">
                <p className="text-xs text-secondary_light">Num subscribers</p>
                <p className="text-xs font-semibold text-primary">5</p>
              </div>
              {/* row */}
              <div className="flex w-full items-center justify-between border-b border-border py-1.5">
                <p className="text-xs text-secondary_light">
                  Remaining rewards
                </p>
                <p className="text-xs font-semibold text-primary">0 USDT</p>
              </div>
              {/* row */}
              <div className="flex w-full items-center justify-between border-b border-border py-1.5">
                <p className="text-xs text-secondary_light">Pool Balance</p>
                <p className="text-xs font-semibold text-primary">5.33 USDT</p>
              </div>
              {/* row */}
              <div className="flex w-full items-center justify-between border-b border-border py-1.5">
                <p className="text-xs text-secondary_light">
                  Remaining rewards
                </p>
                <p className="text-xs font-semibold text-primary">0</p>
              </div>
              {/* row */}
              <div className="flex w-full items-center justify-between py-1.5">
                <p className="text-xs text-secondary_light">Contract</p>
                <div className="flex items-center space-x-1">
                  <Image src={CopyPrimary} alt="copy" className="h-5 w-5" />
                  <p className="text-xs font-semibold text-primary">
                    0x9b6cb...77bbc
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* pools and subscribers */}
          <div className="mt-11 w-full">
            {/* tabs */}
            <div className="tab w-full space-x-11 border-b border-b-border">
              <button
                onClick={() => setActiveTab("pool")}
                className={`py-1.5 text-sm ${activeTab == "pool" ? "border-b border-b-primary font-semibold text-primary" : "text-secondary_light"}`}
              >
                Pool Info
              </button>
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`py-1.5 text-sm ${activeTab == "subscribers" ? "border-b border-b-primary font-semibold text-primary" : "text-secondary_light"}`}
              >
                Subscribers(5)
              </button>
            </div>
            {/* content */}
            {activeTab == "pool" ? <PoolInfo /> : <Subscribers />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ initialState = false, onChange = () => {} }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) {
      onChange();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex h-8 w-[64px] cursor-pointer items-center rounded-lg p-1 transition-colors duration-200 ease-in-out ${isOn ? "bg-primary" : "bg-gray-200"} `}
      role="switch"
      aria-checked={isOn}
    >
      {/* Text Label */}
      <span
        className={`absolute left-2 text-sm font-medium transition-colors duration-200 ${isOn ? "text-white" : "text-gray-400"} `}
      >
        ON
      </span>

      {/* Toggle Knob */}
      <div
        className={`h-6 w-6 transform rounded-md bg-white shadow-md transition-transform duration-200 ease-in-out ${isOn ? "translate-x-8" : "translate-x-0"} `}
      />
    </button>
  );
};

const PoolInfo = () => {
  return (
    <div className="w-full">
      {/* row */}
      <div className="mt-4 w-full">
        <p className="text-sm text-secondary_light">Block info</p>
        <div className="mt-2 w-full rounded-[14px] border-border bg-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Start block date</p>
            <p className="text-[12px] text-secondary_light">2 Oct 2024 11:28</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Start block date</p>
            <p className="text-[12px] text-secondary_light">2 Nov 2024 10:28</p>
          </div>
        </div>
      </div>

      {/* row */}
      <div className="mt-4 w-full">
        <p className="text-sm text-secondary_light">Pool stats</p>
        <div className="mt-2 w-full rounded-[14px] border-border bg-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Shares</p>
            <p className="text-[12px] text-secondary_light">63 K</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Block Reward</p>
            <p className="text-[12px] text-secondary_light">0.022 USDT</p>
          </div>
        </div>
      </div>

      {/* row */}
      <div className="mt-4 w-full">
        <p className="text-sm text-secondary_light">Your stats</p>
        <div className="mt-2 w-full rounded-[14px] border-border bg-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Shares</p>
            <p className="text-[12px] text-secondary_light">0 (0.00%)</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-secondary_light">Block Reward</p>
            <p className="text-[12px] text-secondary_light">0 USDT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Subscribers = () => {
  return (
    <div className="w-full">
      {/* heading */}
      <button className="mt-3 flex w-full items-center justify-between">
        <p className="text-sm text-secondary_light">Subsribers (5)</p>
        <div className="flex items-center justify-center space-x-1.5">
          <p className="text-xs text-primary">Refresh</p>
          <Image src={Refreh} alt="clock" className="h-4 w-4" />
        </div>
      </button>
      {/* infos */}
      <div className="mt-2 w-full rounded-[12px] border border-border">
        {/* heading */}
        <div className="grid w-full grid-cols-3 rounded-t-[12px] bg-primary p-3 text-xs font-semibold text-white">
          <p>USER</p>
          <p className="text-center">SHARE WEIGHT</p>
          <p className="text-end">UNHARVESTED</p>
        </div>
        {/* row */}
        <div className="grid w-full grid-cols-3 border-b border-b-[#D3D0D0] bg-border p-3 text-xs text-secondary_light">
          <div className="flex items-center justify-start space-x-1">
            <Image src={CopySecondary} alt="profile" className="h-5 w-5" />
            <p>0x9b6cb...77bbc</p>
          </div>
          <p className="text-center">25.6 K</p>
          <p className="text-end">0</p>
        </div>

        {/* row */}
        <div className="grid w-full grid-cols-3 border-b border-b-[#D3D0D0] bg-border p-3 text-xs text-secondary_light">
          <div className="flex items-center justify-start space-x-1">
            <Image src={CopySecondary} alt="profile" className="h-5 w-5" />
            <p>0x9b6cb...77bbc</p>
          </div>
          <p className="text-center">25.6 K</p>
          <p className="text-end">0</p>
        </div>

        {/* row */}
        <div className="grid w-full grid-cols-3 border-b border-b-[#D3D0D0] bg-border p-3 text-xs text-secondary_light">
          <div className="flex items-center justify-start space-x-1">
            <Image src={CopySecondary} alt="profile" className="h-5 w-5" />
            <p>0x9b6cb...77bbc</p>
          </div>
          <p className="text-center">25.6 K</p>
          <p className="text-end">0</p>
        </div>

        {/* row */}
        <div className="grid w-full grid-cols-3 border-b border-b-[#D3D0D0] bg-border p-3 text-xs text-secondary_light">
          <div className="flex items-center justify-start space-x-1">
            <Image src={CopySecondary} alt="profile" className="h-5 w-5" />
            <p>0x9b6cb...77bbc</p>
          </div>
          <p className="text-center">25.6 K</p>
          <p className="text-end">0</p>
        </div>

        {/* row */}
        <div className="grid w-full grid-cols-3 rounded-b-[12px] bg-border p-3 text-xs text-secondary_light">
          <div className="flex items-center justify-start space-x-1">
            <Image src={CopySecondary} alt="profile" className="h-5 w-5" />
            <p>0x9b6cb...77bbc</p>
          </div>
          <p className="text-center">25.6 K</p>
          <p className="text-end">0</p>
        </div>
      </div>
    </div>
  );
};
export default RewardModal;
