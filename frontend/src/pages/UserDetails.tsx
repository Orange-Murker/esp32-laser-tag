import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { UserEditor, UserEditorState } from "../components/UserEditor";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";

export function UserDetails() {
  const { username } = useParams();
  if (!username) return null;
  const [isLoading, error, user] = useUser(username);
  const [state, setState] = useState<UserEditorState>({
    username: "",
    usernameChangeable: false,
    displayName: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return;
    setState({
      username: user.username,
      usernameChangeable: false,
      displayName: user.displayName,
      password: "",
      role: user.role,
    });
  }, [user]);
  const [shownError, setError] = useState<string | null>(null);
  if (isLoading) return <div></div>;
  if (error != null) return <div>{error}</div>;

  const save = async (event: React.MouseEvent) => {
    event.preventDefault()

    if(state.password.length > 0) {
      if (state.password.length < 6)
        return setError("Password needs to be at least 6 characters");
      if (state.password.match(/[\d@$!%*#?&]/) === null)
        return setError(
          "Password needs at least one number or special character"
        );
    }

    await useUpdate`/users/${username}`(state, "PATCH");
    navigate("/users");
  };

  return (
    <Layout>
      <form className="w-full h-full flex flex-col">
        <div className="text-white text-5xl text-center">{username}</div>
        <hr className="border-emerald-700 my-4" />
        <UserEditor state={state} setState={setState} />
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
