import React, { Ref, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import "../App.css";
import Button from "../components/Button";
import { ProfileIcon } from "../components/icons/ProfileIcon";
import { useUpdate } from "../hooks/useQuery";
import { useAuth } from "../hooks/useAuth";

const Input = ({
  placeholder,
  type,
  pref,
}: {
  placeholder: string;
  type?: "password";
  pref: Ref<any>;
}) => (
  <input
    placeholder={placeholder}
    type={type}
    ref={pref}
    className="w-full p-5 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
  />
);

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string | null>(null);
  const { login, user } = useAuth();

  if (user !== null) return <Navigate to="/dashboard" />;

  const handleLogin = async (event: React.MouseEvent) => {
    setError(null);
    event.preventDefault();
    const response = await useUpdate`/auth/login`(
      {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      },
      "POST"
    );
    console.log(response);
    if (response.access_token) {
      login(response.access_token);
    } else {
      if (response.statusCode === 401) {
        setError(response.message);
      } else {
        setError("Something went wrong while trying to login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="px-8 pb-6 mt-4 text-left bg-gray-100 rounded-2xl bg-opacity-75">
        <div className="flex justify-center h-20 mb-2">
          <div className="bg-emerald-600 w-40 h-40 rounded-full -translate-y-2/4">
            <ProfileIcon />
          </div>
        </div>
        <div>
          <Input placeholder="Username" pref={usernameRef} />
        </div>
        <div>
          <Input placeholder="Password" type="password" pref={passwordRef} />
        </div>
        <div className="flex mt-2">
          {/*<span>Contact the Game Master to recover or create an account</span>*/}
          <span className="text-orange-700 m-auto">{error}</span>
          <div className="flex-grow" />
          <Button onClick={handleLogin}>Log In</Button>
        </div>
      </form>
    </div>
  );
}
