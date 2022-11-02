import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="w-screen h-28 p-4 flex">
        <div className="text-white m-auto pr-4">
          LZR T4G
          <br />
          SOLUT!ONS
        </div>
        <Link to="/dashboard" className="m-auto">
          <Button className="mr-4 align-middle">Current game</Button>
        </Link>
        <Link to="/users" className="m-auto">
          <Button>Manage users</Button>
        </Link>
        <div className="flex-grow"></div>
        <Link to="/login">
          <div className="bg-emerald-600 w-20 h-20 rounded-full" />
        </Link>
      </header>
      <div className="border-b-8 border-emerald-700 w-screen" />
    </>
  );
}
