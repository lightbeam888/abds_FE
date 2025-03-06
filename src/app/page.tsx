"use client";
import Hero from "@/app/components/hero/Hero";
import Statistics from "@/app/components/statistics/Statistics";
import Accounts from "@/app/components/accounts/Accounts";
import Rewards from "@/app/components/accounts/Rewards";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./utils/config";
import { useState } from "react";

const queryClient = new QueryClient();
export default function Home() {
  const [statisticsState, setStatisticsState] = useState(0);
  const updateStatistics = (index) => {
    setStatisticsState(index);
  };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <>
          <Hero onIndexChange={updateStatistics} />
          <Statistics indexState={statisticsState} />
          <div className="mt-[60px] grid w-full gap-5 lg:grid-cols-2">
            {/* left side */}
            <Accounts />
            <Rewards />
          </div>
        </>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
