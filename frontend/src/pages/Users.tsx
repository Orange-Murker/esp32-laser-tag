import React from "react";
import "../App.css";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export default function Users() {
  const [isLoading, error, users] = useUsers();
  if (isLoading) return <div></div>;
  if (error != null) return <div>{error}</div>;

  return (
    <Layout>
      <div className="text-white text-5xl text-center">Users</div>
      <hr className="border-emerald-700 my-4" />
      {users.map(({ username, displayName }) => (
        <div key={username} className="flex text-white text-2xl mb-4">
          <div className="m-auto">{displayName}</div>
          <div className="flex-grow" />
          <Link to={`/users/${username}`}><Button>Edit</Button></Link>
          <Button className="ml-4" onClick={() => useUpdate`/users/${username}`({}, "DELETE")}>Delete</Button>
        </div>
      ))}
      <div className="flex-grow" />
      <div className="flex w-full text-2xl">
        <div className="flex-grow" />
        <Link to={"/users/new"}><Button>Add user</Button></Link>
      </div>
    </Layout>
  );
}
