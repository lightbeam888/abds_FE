"use client";

import { motion } from "framer-motion";
import Card from "@/app/components/statistics/Card";
import Icon1 from "@/app/assets/icons/icon_card1.png";
import Icon2 from "@/app/assets/icons/icon_card2.png";
import Icon3 from "@/app/assets/icons/icon_card3.png";
import Icon4 from "@/app/assets/icons/icon_card4.png";
import Icon5 from "@/app/assets/icons/icon_card5.png";

const cardData = [
  {
    icon: Icon1,
    percentage: 16.5,
    usd: "12k",
    value: "0.00%",
    valueType: "APR",
  },
  {
    icon: Icon2,
    percentage: 16.5,
    usd: "12k",
    value: "$ 6K",
    valueType: "TVL",
  },
  {
    icon: Icon3,
    percentage: 16.5,
    usd: "12k",
    value: "5",
    valueType: "STAKERS",
  },
  {
    icon: Icon4,
    percentage: 16.5,
    usd: "12k",
    value: "34k",
    valueSmall: "ABDS",
    valueType: "STAKING",
  },
  {
    icon: Icon5,
    percentage: 16.5,
    usd: "12k",
    value: "500",
    valueType: "LIMIT",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.2 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// const hoverVariants = {
//   hover: {
//     scale: 1.05,
//     transition: { duration: 0.3, ease: "easeInOut" },
//   },
// };

const Statistics = () => {
  return (
    <motion.div
      className="w-full px-[29px] text-dark_text md:px-[37px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="cards_container -mt-[52px] grid grid-cols-1 gap-[18px] md:-mt-[74px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            // whileHover={hoverVariants.hover}
          >
            <Card {...card} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
