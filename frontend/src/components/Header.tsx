import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Roles } from "../auth";
import { ProfileIcon } from "./icons/ProfileIcon";

export function Header() {
  const { user, logout } = useAuth();

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
        {(user?.role ?? Roles.player) >= Roles.gameMaster && (
          <Link to="/users" className="m-auto">
            <Button className="mr-4">Manage users</Button>
          </Link>
        )}
        {(user?.role ?? Roles.player) >= Roles.gameMaster && (
          <Link to="/guns" className="m-auto">
            <Button className="mr-4">Manage guns</Button>
          </Link>
        )}
        <div className="flex-grow"></div>
        <div
          className="bg-emerald-600 w-20 h-20 rounded-full cursor-pointer"
          onClick={() => logout()}
        >
          <ProfileIcon />
        </div>
      </header>
      <div className="border-b-8 border-emerald-700 w-screen" />
    </>
  );
}
