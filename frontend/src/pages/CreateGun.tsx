import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";
import { GunEditor, GunEditorState } from '../components/GunEditor';

export function CreateGun() {
  const [state, setState] = useState<GunEditorState>({
    id: "auto",
    idChangeable: false,
    displayName: "",
    secret: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const save = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (state.displayName === "") return setError("Name can't be empty");
    if (state.secret.length < 20)
      return setError("Secret needs to be at least 20 characters");
    const response = await useUpdate`/guns`(state, "POST");
    if (response.error) return setError(response.error);
    if (response.statusCode) return setError("Something went wrong on the server");
    navigate("/guns");
  };

  return (
    <Layout>
      <form className="w-full h-full flex flex-col">
        <div className="text-white text-5xl text-center">New Gun</div>
        <hr className="border-emerald-700 my-4" />
        <GunEditor state={state} setState={setState} />
        <div className="text-orange-700">{error}</div>
        <div className="flex-grow" />
        <div className="flex w-full text-2xl">
          <div className="flex-grow" />
          <Button onClick={save}>Save</Button>
        </div>
      </form>
    </Layout>
  );
}
