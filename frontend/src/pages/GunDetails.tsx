import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useGun } from "../hooks/useGun";
import { GunEditor, GunEditorState } from "../components/GunEditor";
import { useUpdate } from "../hooks/useQuery";

export function GunDetails() {
  const { idOptional } = useParams();
  const id = idOptional ?? "";
  const [isLoading, error, gun] = useGun(id);
  const [state, setState] = useState<GunEditorState>({
    id: "",
    idChangeable: false,
    displayName: "",
    secret: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!gun) return;
    setState({
      id: gun.id.toString(),
      idChangeable: false,
      displayName: gun.displayName,
      secret: "",
    });
  }, [gun]);
  const [shownError, setError] = useState<string | null>(null);
  if (isLoading) return <div></div>;
  if (error != null) return <div>{error}</div>;

  const save = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (state.secret.length > 0 && state.secret.length < 20) {
      return setError("Secret needs to be at least 20 characters");
    }

    const response = await useUpdate`/guns/${id}`(state, "PATCH");
    if (response.error) return setError(response.error);
    if (response.statusCode) return setError("Something went wrong on the server");
    navigate("/guns");
  };

  return (
    <Layout>
      <form className="w-full h-full flex flex-col">
        {/*<div className="text-white text-5xl text-center">{username}</div>*/}
        <hr className="border-emerald-700 my-4" />
        <GunEditor state={state} setState={setState} />
        <div className="text-orange-700">{shownError}</div>
        <div className="flex-grow" />
        <div className="flex w-full text-2xl">
          <div className="flex-grow" />
          <Button onClick={save}>Save</Button>
        </div>
      </form>
    </Layout>
  );
}
