import React from "react";
import { GiIciclesAura } from "react-icons/gi";
import { BiChevronDown } from "react-icons/bi";

export default function TabHeader({ title, subTitle }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-medium">{title}</p>
        <p>{subTitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <GiIciclesAura className="p-4 bg-black text-white rounded-full" />
        <p>Administrator</p>
        <BiChevronDown />
      </div>
    </div>
  );
}
