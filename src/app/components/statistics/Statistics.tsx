"use client";

import { motion } from "framer-motion";
import Card from "@/app/components/statistics/Card";
import Icon1 from "@/app/assets/icons/icon_card1.png";
import Icon2 from "@/app/assets/icons/icon_card2.png";
import Icon3 from "@/app/assets/icons/icon_card3.png";
import Icon4 from "@/app/assets/icons/icon_card4.png";
import Icon5 from "@/app/assets/icons/icon_card5.png";
import axios from "axios";
import { useEffect, useState } from "react";

interface StatisticsProps {
  range: number;
}

const Statistics: React.FC<StatisticsProps> = ({ range }) => {
  const [usdTVL, setUsdTVL] = useState("12k");
  const [totalUser, setTotalUser] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    // console.log("this is range", range);
    if (range === 0) {
      setStartDate(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          .toISOString()
          .split("T")[0],
      );
    } else if (range === 1) {
      setStartDate(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
          .toISOString()
          .split("T")[0],
      );
    } else if (range === 2) {
      setStartDate(
        new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split("T")[0],
      );
    }
  }, [range]);

  useEffect(() => {
    console.log("Fetching from:", process.env.NEXT_PUBLIC_BACKEND_URL);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/total-stake-value`, {
        params: { startDate: new Date().toISOString().split("T")[0] },
      })
      .then((res) => {
        console.log("total-stake-value:", res.data.total_value);
        setUsdTVL(res.data.total_value + " K");
      })
      .catch((error) => console.error("Error fetching data:", error));

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/total-staking-users`, {
        params: { startDate: new Date().toISOString().split("T")[0] },
      })
      .then((res) => {
        console.log("total-stake-value:", res.data.total_users);
        setTotalUser(res.data.total_users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    console.log("this is tvl value", usdTVL);
  }, [usdTVL]);

  return (
    <motion.div
      className="mx-auto w-full px-[29px] text-dark_text md:px-[37px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div className="cards_container -mt-[52px] grid grid-cols-1 gap-[18px] md:-mt-[74px] md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -30, scale: 0.2 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <Card
            icon={Icon2}
            percentage={16.5}
            usd={usdTVL}
            value={usdTVL}
            valueType="TVL"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -30, scale: 0.2 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <Card
            icon={Icon3}
            percentage={16.5}
            usd="12k"
            value={totalUser + ""}
            valueType="STAKERS"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -30, scale: 0.2 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <Card
            icon={Icon4}
            percentage={16.5}
            usd={usdTVL}
            value={usdTVL}
            valueSmall="ABDS"
            valueType="STAKING"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
