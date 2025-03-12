"use client";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { injected } from "wagmi/connectors";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ActionButtons = () => {
  const [walletName, setwalletName] = useState("Connect Wallet");
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="items-center justify-center space-x-5 md:flex">
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, openAccountModal }) => {
          return (
            <button
              onClick={account ? openAccountModal : openConnectModal}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "black",
                color: "white",
              }}
            >
              {account ? account.address : "Connect"}
            </button>
          );
        }}
      </ConnectButton.Custom>
      <select
        name="country"
        id="country-select"
        className="cursor-pointer rounded-md bg-[#1C1D1E] p-[7px] text-secondary_dark"
      >
        <option value="us">🇺🇸</option>
        <option value="ca">🇨🇦</option>
        <option value="gb">🇬🇧</option>
        <option value="au">🇦🇺</option>
      </select>{" "}
    </div>
  );
};

export default ActionButtons;
