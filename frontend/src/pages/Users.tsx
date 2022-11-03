import React from "react";
import "../App.css";
import { Layout } from "../components/Layout";
import Button from "../components/Button";

const users = [
  { username: "jetse", displayName: "Jetse Verschuren", role: "Admin" },
  {
    username: "luna",
    displayName: "Luna P",
    role: "Operator",
  },
  { username: "bob", displayName: "Bob Dummy", role: "Player" },
];

export default function Users() {
  return (
    <Layout>
      <div className="text-white text-5xl text-center">Users</div>
      <hr className="border-emerald-700 my-4" />
      {users.map(({ username, displayName }) => (
        <div key={username} className="flex text-white text-2xl mb-4">
          <div className="m-auto">{displayName}</div>
          <div className="flex-grow" />
          <Button>Edit</Button>
          <Button className="ml-4">Delete</Button>
        </div>
      ))}
      <div className="flex-grow" />
      <div className="flex w-full text-2xl">
        <div className="flex-grow" />
        <Button>Add user</Button>
      </div>
    </Layout>
  );
}
