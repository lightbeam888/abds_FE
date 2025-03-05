"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface CardProps {
  icon: StaticImageData;
  percentage?: number;
  usd?: string;
  value?: string;
  valueType?: string;
  valueSmall?: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  percentage,
  usd,
  value,
  valueType,
  valueSmall,
}) => {
  return (
    <div className="stat_card w-full min-w-[208px] md:min-w-[254px] rounded-xl bg-white px-[15px] py-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D5FAEC] p-1">
          <Image src={icon} alt="icon" />
        </div>
        <div className="flex items-center justify-center space-x-1">
          <p className="text-[10px] md:text-sm font-semibold text-primary">{percentage}% </p>
          <div className="h-[5px] w-[5px] bg-dark_text"></div>
          <p className="text-[10px] md:text-sm font-semibold text-dark_text">${usd} today</p>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-center md:justify-start space-x-1">
        <p className="text-4xl font-semibold text-primary">{value}</p>
        {valueSmall && (
          <p className="text-[20px] font-semibold text-primary">{valueSmall}</p>
        )}
      </div>
      <p className="mt-1 text-[10px] text-center md:text-start md:text-sm font-semibold text-black">Total {valueType}</p>
    </div>
  );
};

export default Card;
