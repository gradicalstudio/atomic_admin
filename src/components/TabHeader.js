import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import firebase from "firebase";

export default function TabHeader({ title, subTitle }) {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-medium">{title}</p>
        <p>{subTitle}</p>
      </div>

      <div>
        <div
          className="flex items-center gap-3 hover:bg-gray-300 px-3 py-2 cursor-pointer"
          onClick={() => setIsLogoutPopupOpen(!isLogoutPopupOpen)}
        >
          <img
            src="https://homepages.cae.wisc.edu/~ece533/images/pool.png"
            alt=""
            className="rounded-full h-10 w-10"
          />
          <p>Administrator</p>
          <BiChevronDown />
        </div>

        {isLogoutPopupOpen ? (
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
              className="flex w-full justify-center p-2 bg-white hover:bg-black hover:text-white outline-none focus:outline-none  cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
