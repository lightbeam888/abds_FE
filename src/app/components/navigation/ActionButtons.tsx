"use client";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { injected } from "wagmi/connectors";

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
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="rounded-[12px] border border-primary bg-dark_text px-6 py-4 text-[13px] font-semibold text-primary md:text-sm"
        >
          connected
        </button>
      ) : (
        <button
          onClick={() =>
            connect({
              connector: injected(),
            })
          }
          className="rounded-[9px] border border-primary px-2 py-3 text-[11px] font-bold text-primary md:px-4 md:py-[15px]"
        >
          BUY ABDS TOKEN
        </button>
      )}
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
