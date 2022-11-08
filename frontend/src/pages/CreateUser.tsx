import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { UserEditor, UserEditorState } from "../components/UserEditor";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";

export function CreateUser() {
  const [state, setState] = useState<UserEditorState>({
    username: "",
    usernameChangeable: true,
    displayName: "",
    password: "",
    role: "Player",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const save = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (state.username === "") return setError("Username can't be empty");
    if (state.displayName === "") return setError("Name can't be empty");
    if (state.password.length < 6)
      return setError("Password needs to be at least 6 characters");
    if (state.password.match(/[\d@$!%*#?&]/) === null)
      return setError(
        "Password needs at least one number or special character"
      );
    const response = await useUpdate`/users`(state, "POST");
    if (response.error) return setError(response.error);
    if (response.statusCode) return setError("Something went wrong on the server");
    navigate("/users");
  };

  return (
    <Layout>
      <form className="w-full h-full flex flex-col">
        <div className="text-white text-5xl text-center">New User</div>
        <hr className="border-emerald-700 my-4" />
        <UserEditor state={state} setState={setState} />
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
