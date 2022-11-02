import React, { PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center w-screen flex-grow p-20">
        <div className="px-8 py-6 text-left bg-gray-100 rounded-2xl bg-opacity-75 w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
