"use client";

const ActionButtons = () => {
  return (
    <div className="items-center justify-center space-x-5 md:flex">
      <button className="rounded-[9px] border border-primary px-2 md:px-4 py-3 md:py-[15px] text-[11px] font-bold text-primary">
        BUY ABDS TOKEN
      </button>
      <select
        name="country"
        id="country-select"
        className="cursor-pointer rounded-md bg-[#1C1D1E] p-[7px] text-secondary_dark"
      >
        <option value="us">🇺🇸</option>
        <option value="ca">🇨🇦</option>
        <option value="gb">🇬🇧</option>
        <option value="au">🇦🇺</option>
      </select>{" "}
    </div>
  );
};

export default ActionButtons;
