import React from "react";
import TabHeader from "../../../components/TabHeader";
import { format } from "date-fns";

export default function Enquiry() {
  return (
    <div className="w-full flex flex-col gap-14">
      <TabHeader title="Enquiry" subTitle="All your enquiries come here." />

      <div className="flex flex-col gap-2">
        <p className="text-4xl font-medium">{format(new Date(), "PPP")}</p>
      </div>
    </div>
  );
}
