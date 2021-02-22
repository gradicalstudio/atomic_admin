import React, { useState } from "react";

import Switch from "react-switch";
import { toast } from "react-toastify";
import { db } from "../firebase";

const requirementDictionary = {
  "Book a space": {
    label: "Workspace",
    color: "bg-purple-600",
  },
  "Run an event": {
    label: "Event",
    color: "bg-blue-600",
  },
  "Community Related": {
    label: "Community",
    color: "bg-black",
  },
};

export default function EnquiryCard({ data }) {
  const [status, setStatus] = useState(data.status);

  const updateStatus = (currentStatus) => {
    db.collection("enquiries")
      .doc(data.id)
      .update({
        status: currentStatus,
      })
      .then(() => {
        toast.success("Status updated successfully");
      })
      .catch((error) => {
        toast.error("Failed to change status");
        console.log(error);
      });
  };

  return (
    <div className="bg-white flex flex-col gap-5 p-5 rounded-md ">
      <div className="flex justify-between items-center gap-3">
        <p className="text-xl truncate max-w-full font-medium">
          {data.fullName}
        </p>
        <div
          className={`${
            requirementDictionary[data.requirement].color
          } text-white px-3 py-2 text-sm rounded-full`}
        >
          {requirementDictionary[data.requirement].label}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <p className="text-sm text-gray-400 font-medium">+{data.phoneNumber}</p>
        <p className="text-sm text-gray-400 font-medium">{data.email}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-md text-gray-400 font-medium">Seats</p>
          <p className=" font-medium">{data.noOfSeats}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-md text-gray-400 font-medium">Company</p>
          <p className=" font-medium">{data.companyName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-md text-gray-400 font-medium">Description</p>
        <p className=" font-medium">
          {data.additionalNotes ? data.additionalNotes : "-"}
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <span>Close</span>
        <Switch
          onChange={(checked) => {
            setStatus(!status);
            console.log("Checked", checked);
            updateStatus(checked);
          }}
          checked={status}
        />
        <span>Open</span>
      </div>
    </div>
  );
}
