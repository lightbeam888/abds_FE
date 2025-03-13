"use client";
import Hero from "@/app/components/hero/Hero";
import Statistics from "@/app/components/statistics/Statistics";
import Accounts from "@/app/components/accounts/Accounts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { useState } from "react";
// import { config } from "./utils/config";

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: "ABDS",
  projectId: "49d10d1f841ad455ed7e95a9d3548489",
  chains: [mainnet, polygon],
  ssr: true,
});
export default function Home() {
  const [range, setRange] = useState(0);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <>
            <Hero handleRange={setRange} />
            <Statistics range={range} />
            {/* left side */}
            <Accounts />
          </>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
