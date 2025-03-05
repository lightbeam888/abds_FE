"use client";

import { useEffect } from "react";

const ProgressBar = ({ progress = 50 }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes moveStripes {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 70.71px 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Container */}
      <div className="relative h-[16px] overflow-hidden rounded-full bg-[#F6F8F7] md:h-[29px]">
        {/* Base fill color */}
        <div
          className="relative h-full rounded-full bg-primary"
          style={{
            width: `${progress}%`,
          }}
        >
          {/* Striped overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.2) 25px,
                transparent 25px,
                transparent 50px
              )`,
              backgroundSize: "70.71px 70.71px", // 50px * √2 to maintain perfect 45° stripes
              animation: "moveStripes 1s linear infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
