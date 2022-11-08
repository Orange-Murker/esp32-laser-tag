import React from "react";

export type UserEditorState = {
  username: string;
  usernameChangeable: boolean;
  displayName: string;
  role: string;
  password: string;
};

export function UserEditor({
  state,
  setState,
}: {
  state: UserEditorState;
  setState(newState: UserEditorState): void;
}) {
  return (
    <div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
          id="username"
          value={state.username}
          onChange={(event) =>
            setState({
              ...state,
              username: event.target.value.trim(),
            })
          }
          disabled={!state.usernameChangeable}
        />
      </div>
      <div>
        <label htmlFor="displayName">Name: </label>
        <input
          className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
          id="displayName"
          value={state.displayName}
          onChange={(event) =>
            setState({
              ...state,
              displayName: event.target.value,
            })
          }
        />
      </div>
      <div className="mt-3">
        <label htmlFor="role">Role: </label>
        <select
          className="border border-black rounded-xl bg-gray-100 bg-opacity-75 py-2 px-3 mr-3"
          id="role"
          value={state.role}
          onChange={(event) =>
            setState({
              ...state,
              role: event.target.value,
            })
          }
        >
          <option value="Player">Player</option>
          <option value="Operator">Game Master</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
          id="password"
          value={state.password}
          type="password"
          onChange={(event) =>
            setState({
              ...state,
              password: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
