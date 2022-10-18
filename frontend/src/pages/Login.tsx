import React from "react";
import "../App.css";

const Input = ({ placeholder }: { placeholder: string }) => (
  <input
    placeholder={placeholder}
    className="w-full p-5 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
  />
);

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 pb-6 mt-4 text-left bg-gray-100 rounded-2xl bg-opacity-75">
        <div className="flex justify-center h-20 mb-2">
          <div className="bg-emerald-600 w-40 h-40 rounded-full -translate-y-2/4"></div>
        </div>
        <div>
          <Input placeholder={"Username"} />
        </div>
        <div>
          <Input placeholder={"Password"} />
        </div>
        <div className="flex mt-2">
          {/*<span>Contact the Game Master to recover or create an account</span>*/}
          <div className="flex-grow" />
          <button className="border border-black rounded-xl bg-white py-2 px-3 mt-3 text-slate-800">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
