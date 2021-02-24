import React, { useState } from "react";
import { BiBookContent } from "react-icons/bi";
import { IoIosRocket } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import Logo from "../../assets/Vector.png";
import ContentManagement from "./contentManagement";
import Dashboard from "./dashboard";
import Enquiry from "./enquiry";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  return (
    <div className="flex">
      <div className="flex bg-black w-1/4">
        <div className="flex flex-col gap-14 w-full">
          <div className="flex justify-center w-full">
            <div className="my-10 flex items-center flex-col gap-14 text-white">
              <img src={Logo} alt="" width={25} />
              <p>Hey there, Admin.</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-full px-10 text-gray-500">
            <button
              onClick={() => setCurrentTab("dashboard")}
              className={`flex gap-5 items-center focus:outline-none ${
                currentTab === "dashboard" ? "text-white" : ""
              }`}
            >
              <MdDashboard className="text-xl" />
              <p>Dashboard</p>
            </button>
            <button
              onClick={() => setCurrentTab("enquiry")}
              className={`flex gap-5 items-center focus:outline-none ${
                currentTab === "enquiry" ? "text-white" : ""
              }`}
            >
              <IoIosRocket className="text-xl" />
              <p>Enquiry</p>
            </button>
            <button
              onClick={() => setCurrentTab("contentManagement")}
              className={`flex gap-5 items-center focus:outline-none ${
                currentTab === "contentManagement" ? "text-white" : ""
              }`}
            >
              <BiBookContent className="text-xl" />
              <p>Content Management</p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex bg-gray-100 pb-60 w-full px-20 py-10">
        {currentTab === "dashboard" ? (
          <Dashboard />
        ) : currentTab === "enquiry" ? (
          <Enquiry />
        ) : (
          <ContentManagement />
        )}
      </div>
    </div>
  );
}
