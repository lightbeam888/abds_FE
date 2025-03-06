"use client";
import Card from "@/app/components/statistics/Card";
import Icon1 from "@/app/assets/icons/icon_card1.png";
import Icon2 from "@/app/assets/icons/icon_card2.png";
import Icon3 from "@/app/assets/icons/icon_card3.png";
import Icon4 from "@/app/assets/icons/icon_card4.png";
import Icon5 from "@/app/assets/icons/icon_card5.png";
// import dotenv from "dotenv";
import axios from "axios";
import { useEffect, useState } from "react";

// dotenv.config();

const Statistics = (indexState) => {
  const [TVL, setTVL] = useState(0);
  const [totalStaker, setTotalStaker] = useState(0);
  const [totalStaking, setTotalStaking] = useState(0);
  console.log(indexState);

  const getTotalStakingUsers = async (startDate) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/total-staking-users?startDate=${startDate}`,
      );
      return response.data.total_users;
    } catch (error) {
      return 0;
    }
  };

  const getTotalStakeValue = async (startDate) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/total-stake-value",
        {
          params: { startDate: startDate }, // Pass startDate as a query parameter
        },
      );

      console.log(response.data);
      return response.data.total_value;
      // console.log(response.data); // Total stake value
    } catch (error) {
      console.log("returning zero");
      return 0;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setTVL(
        await getTotalStakeValue(
          indexState == 0
            ? new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString()
                .split("T")[0]
            : indexState == 1
              ? new Date(new Date().setMonth(new Date().getMonth() - 1))
                  .toISOString()
                  .split("T")[0]
              : new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                  .toISOString()
                  .split("T")[0],
        ),
      );
      setTotalStaker(
        await getTotalStakingUsers(
          indexState == 0
            ? new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString()
                .split("T")[0]
            : indexState == 1
              ? new Date(new Date().setMonth(new Date().getMonth() - 1))
                  .toISOString()
                  .split("T")[0]
              : new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                  .toISOString()
                  .split("T")[0],
        ),
      );
    }
    fetchData();
    // setTotalStaker()
  }, [indexState]);

  return (
    <div className="w-full px-[29px] text-dark_text md:px-[37px]">
      <div className="cards_container -mt-[72px] grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card
          icon={Icon1}
          percentage={16.5}
          usd="21%"
          value="0.00%"
          valueType="APR"
        />
        <Card
          icon={Icon2}
          percentage={16.5}
          usd="12k"
          value={"$ " + new Number(TVL)}
          valueType="TVL"
        />
        <Card
          icon={Icon3}
          percentage={16.5}
          usd="12k"
          value={totalStaker + "k"}
          valueType="STAKERS"
        />
        <Card
          icon={Icon4}
          percentage={16.5}
          usd="12k"
          value={"" + new Number(TVL) + ""}
          valueSmall="ABDS"
          valueType="STAKING"
        />
        <Card
          icon={Icon5}
          percentage={16.5}
          usd="12k"
          value="500"
          valueType="LIMIT"
        />
      </div>
    </div>
  );
};

export default Statistics;
