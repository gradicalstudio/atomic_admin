import React from "react";
import TabHeader from "../../../components/TabHeader";
import { format } from "date-fns";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-14">
      <TabHeader title="Dashboard" subTitle="An overview on atomic's growth" />

      <div className="grid grid-cols-4 gap-10">
        <div className="px-8 flex flex-col gap-2 py-4 bg-white">
          <p className="text-sm font-medium">ENQUIRY TODAY</p>
          <p className="text-4xl font-bold">3</p>
        </div>
        <div className="px-8 flex flex-col gap-2 py-4 bg-white">
          <p className="text-sm font-medium">TOTAL CLOSED ENQUIRY</p>
          <p className="text-4xl font-bold">10</p>
        </div>
        <div className="px-8 flex flex-col gap-2 py-4 bg-white">
          <p className="text-sm font-medium">OVERALL ENQUIRY</p>
          <p className="text-4xl font-bold">320</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-4xl font-medium">Enquiry Today</p>
        <p>Enquiries for the {format(new Date(), "PPP")}</p>
      </div>
    </div>
  );
}
