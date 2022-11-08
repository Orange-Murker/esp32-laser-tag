import React from "react";

export type GunEditorState = {
  id: string;
  idChangeable: boolean;
  displayName: string;
  secret: string;
};

export function GunEditor({
  state,
  setState,
}: {
  state: GunEditorState;
  setState(newState: GunEditorState): void;
}) {
  return (
    <div>
      <div>
        <label htmlFor="id">Id: </label>
        <input
          className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
          id="id"
          value={state.id}
          onChange={(event) =>
            setState({
              ...state,
              id: event.target.value.trim(),
            })
          }
          disabled={!state.idChangeable}
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
      <div>
        <label htmlFor="secret">Secret: </label>
        <input
          className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
          id="password"
          value={state.secret}
          type="password"
          onChange={(event) =>
            setState({
              ...state,
              secret: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
