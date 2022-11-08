import React from "react";
import "../App.css";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";
import { Link } from "react-router-dom";
import { useGuns } from '../hooks/useGuns';

export default function Guns() {
  const [isLoading, error, guns] = useGuns();
  if (isLoading) return <div></div>;
  if (error != null) return <div>{error}</div>;

  return (
    <Layout>
      <div className="text-white text-5xl text-center">Guns</div>
      <hr className="border-emerald-700 my-4" />
      {guns.map(({ id, displayName }) => (
        <div key={id} className="flex text-white text-2xl mb-4">
          <div className="m-auto">{displayName}</div>
          <div className="flex-grow" />
          <Link to={`/guns/${id}`}><Button>Edit</Button></Link>
          <Button className="ml-4" onClick={() => useUpdate`/guns/${id}`({}, "DELETE")}>Delete</Button>
        </div>
      ))}
      <div className="flex-grow" />
      <div className="flex w-full text-2xl">
        <div className="flex-grow" />
        <Link to={"/guns/new"}><Button>Add guns</Button></Link>
      </div>
    </Layout>
  );
}
