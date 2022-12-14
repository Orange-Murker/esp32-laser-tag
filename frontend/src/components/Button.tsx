import React from "react";
import { PropsWithChildren } from "react";

export default function Button({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string, onClick?: React.MouseEventHandler }>) {
  return (
    <button
      className={
        "border border-black rounded-xl bg-white bg-opacity-75 py-2 px-3 text-slate-800 " +
          className ?? ""
      }
      {...rest}
    >
      {children}
    </button>
  );
}
