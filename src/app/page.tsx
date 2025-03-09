"use client";
import Hero from "@/app/components/hero/Hero";
import Statistics from "@/app/components/statistics/Statistics";
import Accounts from "@/app/components/accounts/Accounts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./utils/config";
import { useState } from "react";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();
export default function Home() {
  const [statisticsState, setStatisticsState] = useState<Number>(0);
  const updateStatistics = (index: Number) => {
    setStatisticsState(index);
  };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <>
          <Hero />
          <Statistics />
          {/* left side */}
          <Accounts />
        </>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
