"use client";
import Hero from "@/app/components/hero/Hero";
import Statistics from "@/app/components/statistics/Statistics";
import Accounts from "@/app/components/accounts/Accounts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./utils/config";

const queryClient = new QueryClient();
export default function Home() {
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
