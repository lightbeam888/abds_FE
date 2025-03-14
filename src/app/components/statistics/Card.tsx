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
    <div className="flex w-full items-center justify-center">
      <div className="stat_card w-full min-w-[208px] max-w-[230px] rounded-xl bg-white px-[10px] py-2 md:min-w-[254px] md:max-w-[88%] md:px-4 md:py-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D5FAEC]">
            <Image src={icon} alt="icon" />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-[10px] font-semibold text-primary md:text-sm">
              {percentage}%{" "}
            </p>
            <div className="h-[5px] w-[5px] bg-dark_text"></div>
            <p className="text-[10px] font-semibold text-dark_text md:text-sm">
              ${usd} today
            </p>
          </div>
        </div>
        <div className="mt-1 flex items-end justify-center space-x-1 md:mt-3 md:justify-start">
          <p className="text-[26px] font-semibold leading-[26px] text-primary">
            {value}
          </p>
          {valueSmall && (
            <p className="align-bottom text-[20px] font-semibold leading-[20px] text-primary">
              {valueSmall}
            </p>
          )}
        </div>
        <p className="mt-[3px] text-center text-[10px] font-semibold text-black md:text-start md:text-sm">
          Total {valueType}
        </p>
      </div>
    </div>
  );
};

export default Card;
