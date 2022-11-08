import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Roles, User } from "../auth";
import Login from "../pages/Login";

type A = {
  user: User | null;
  login(token: string): void;
  logout(): void;
};

const AuthContext = createContext<A>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

function parseJWT(token: string | null): { user: User; expiry: number } | null {
  if (token === null) return null;
  try {
    const data = JSON.parse(atob(token.split(".")[1]));

    let role;
    switch (data.role) {
      case "Operator":
        role = Roles.gameMaster;
        break;
      case "Admin":
        role = Roles.admin;
        break;
      default:
        role = Roles.player;
    }

    return {
      user: {
        username: data.username,
        role,
      },
      expiry: data.exp,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

const token = window.localStorage.getItem("token");
let parsedToken = parseJWT(token);
if (parsedToken !== null) {
  // Don't load token if expired
  if (parsedToken.expiry < Date.now() / 1000) parsedToken = null;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(parsedToken?.user ?? null);

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    // debugger;
  }, []);

  // call this function when you want to authenticate the user
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const parsedToken = parseJWT(token);
    if (parsedToken === null) return;
    setUser(parsedToken.user);
  };

  // call this function to sign out logged-in user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
