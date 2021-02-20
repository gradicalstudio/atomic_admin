import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex justify-center my-20">
      <div className="flex items-center gap-3 text-2xl">
        <AiOutlineLoading3Quarters className="text-xl animate-spin" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
