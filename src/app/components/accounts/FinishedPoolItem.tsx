"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Token from "@/app/assets/icons/token.png";
import Clock from "@/app/assets/icons/clock.png";
import People from "@/app/assets/icons/people.png";
import Modal from "@/app/components/ui/Modal";
import RewardModal from "@/app/components/accounts/RewardModal";

const FinishedPoolItem = () => {
  // cllick the "See Details" button to open the modal
  useEffect(() => {
    document.getElementById("modal-open-tasks")?.click();
  }, []);
  return (
    <div className="finished_pool_items">
      <div className="flex items-center justify-center space-x-1">
        <Image
          src={Token}
          alt="down-arrow"
          className="h-8 w-8 object-contain md:h-12 md:w-12"
        />
        <div className="">
          <p className="text-[10px] text-[#1C1D1E] md:text-[18px] md:text-sm">
            USDT <span className="text-[8px] md:text-[10px]">(TRON)</span>
          </p>
          <div className="flex items-center space-x-[14px]">
            <p className="flex text-[8px] text-secondary_light md:text-[10px]">
              <Image
                src={Clock}
                alt="down-arrow"
                className="mr-1 object-contain"
                height={12}
                width={12}
              />
              Enabled
            </p>

            <p className="flex text-[8px] text-secondary_light md:text-[10px]">
              <Image
                src={People}
                alt="down-arrow"
                className="mr-1 object-contain"
                height={11}
                width={11}
              />
              5
            </p>
          </div>
        </div>
      </div>
      <Modal>
        <Modal.Open opens="tasks">
          <button
            className="text-[10px] font-semibold text-primary md:text-sm"
            id="modal-open-tasks"
          >
            See Details {">"}
          </button>
        </Modal.Open>
        <Modal.Body name="tasks">
          <RewardModal />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FinishedPoolItem;
