import React from "react";
import Logo from "../../assets/ARROW-LOGO-BLACK.svg";

export default function LoginPage() {
  return (
    <div className="flex w-full">
      <div className="flex items-center justify-start px-28 w-2/3 h-screen">
        <div className="flex flex-col gap-5 w-full">
          <div>
            <img src={Logo} loading="lazy" width={190} alt="" />
          </div>
          <input
            type="text"
            className="px-3 py-2 border-2 border-gray-400 rounded-sm -mt-16 w-2/3 focus:border-blue-400 outline-none"
            placeholder="User name"
          />
          <input
            type="password"
            className="px-3 py-2 border-2 border-gray-400 rounded-sm w-2/3 focus:border-blue-400 outline-none"
            placeholder="Password"
          />
          <button className="px-2 py-2 bg-blue-50 text-blue-400 rounded-sm border border-blue-400 w-5/12 font-medium focus:outline-none">
            Login to Dashboard
          </button>
        </div>
      </div>
      <div className="w-full h-screen bg-blue-600">
        <p> </p>
      </div>
    </div>
  );
}
