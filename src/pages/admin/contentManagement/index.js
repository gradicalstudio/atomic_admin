import React, { useState } from "react";
import TabHeader from "../../../components/TabHeader";
import HeroSection from "./HeroSection";

import HotDesk from "./HotDesk";
import DedicatedDesk from "./DedicatedDesk";
import PrivateOffice from "./PrivateOffice";
import EventsSection from "./EventsSection";
import AboutSection from "./AboutSection";

export default function ContentManagement() {
  const [currentSection, setCurrentSection] = useState("heroSection");

  return (
    <div className="w-full flex flex-col gap-14">
      <TabHeader
        title="Content Management"
        subTitle="Manage the website's content here, from the images to the title in our landing page."
      />

      <div className="flex gap-14 items-center">
        <button
          onClick={() => setCurrentSection("heroSection")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "heroSection" ? "text-black" : "text-gray-400 "
          }`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setCurrentSection("aboutSection")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "aboutSection" ? "text-black" : "text-gray-400 "
          }`}
        >
          About Section
        </button>
        <button
          onClick={() => setCurrentSection("hotDesk")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "hotDesk" ? "text-black" : "text-gray-400 "
          }`}
        >
          Hot-Desk
        </button>
        <button
          onClick={() => setCurrentSection("dedicatedDesk")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "dedicatedDesk" ? "text-black" : "text-gray-400 "
          }`}
        >
          Dedicated Desk
        </button>
        <button
          onClick={() => setCurrentSection("privateOffice")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "privateOffice" ? "text-black" : "text-gray-400 "
          }`}
        >
          Private Desk
        </button>
        <button
          onClick={() => setCurrentSection("eventSection")}
          className={`text-xl font-medium focus:outline-none ${
            currentSection === "eventSection" ? "text-black" : "text-gray-400 "
          }`}
        >
          Event Section
        </button>
      </div>

      <div className="bg-white px-10 py-10 w-9/12">
        {currentSection === "heroSection" ? (
          <HeroSection />
        ) : currentSection === "hotDesk" ? (
          <HotDesk />
        ) : currentSection === "dedicatedDesk" ? (
          <DedicatedDesk />
        ) : currentSection === "privateOffice" ? (
          <PrivateOffice />
        ) : currentSection === "eventSection" ? (
          <EventsSection />
        ) : currentSection === "aboutSection" ? (
          <AboutSection />
        ) : (
          <p>Other section</p>
        )}
      </div>
    </div>
  );
}

// : currentSection === "hotDesk" ? (
//           <HotDesk data={pageData} loading={loading} />
//         ) : currentSection === "dedicatedDesk" ? (
//           <DedicatedDesk data={pageData} loading={loading} />
//         ) : currentSection === "privateOffice" ? (
//           <PrivateOffice data={pageData} loading={loading} />
//         ) : currentSection === "eventSection" ? (
//           <EventsSection data={pageData} loading={loading} />
//         )
