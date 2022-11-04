import React, { useRef, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useGuns } from "../hooks/useGuns";
import Button from "./Button";

export type GameEditorState = {
  teams: {
    player: string;
    gun: number;
    team: number;
  }[];
  friendlyFire: boolean;
  respawnTime: number;
};

export function GameEditor({
  state,
  setState,
}: {
  state: GameEditorState;
  setState(newState: GameEditorState): void;
}) {
  const [isLoadingUsers, errorUsers, users] = useUsers();
  const [isLoadingGuns, errorGuns, guns] = useGuns();

  const userRef = useRef<HTMLSelectElement>(null);
  const gunRef = useRef<HTMLSelectElement>(null);

  const selectedUsernames = state.teams.map((team) => team.player);
  const selectedGuns = state.teams.map((team) => team.gun);

  if (isLoadingUsers || isLoadingGuns) return <div></div>;
  if (errorUsers != null || errorGuns != null) return <div>error</div>;

  const addUser = () => {
    const player = userRef.current?.value;
    const gun = parseInt(gunRef.current?.value ?? "");
    if (!player || isNaN(gun)) return;
    setState({
      ...state,
      teams: state.teams.concat({
        player,
        gun,
        team: 0,
      }),
    });
  };

  const removeUser = (username: string) => {
    setState({
      ...state,
      teams: state.teams.filter((team) => team.player !== username),
    });
  };

  return (
    <div>
      <label htmlFor="friendly_fire">Friendly fire: </label>
      <input
        // className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
        id="friendly_fire"
        type="checkbox"
        checked={state.friendlyFire}
        onChange={(event) =>
          setState({
            ...state,
            friendlyFire: event.target.checked,
          })
        }
      />
      <br />
      <label htmlFor="respawn_time">Respawn time: </label>
      <input
        className="p-1 border border-black rounded-xl placeholder:text-slate-800 mt-3 bg-gray-100 bg-opacity-75"
        id="respawn_time"
        type="number"
        value={isNaN(state.respawnTime) ? "" : state.respawnTime}
        onChange={(event) =>
          setState({
            ...state,
            respawnTime: parseInt(event.target.value),
          })
        }
      />

      <table className="text-white border border-emerald-700 rounded-xl border-separate p-4 w-full text-center align-middle mt-4">
        <thead>
          <tr className="text-emerald-700">
            <th>Player</th>
            <th>Gun</th>
            <th>Team</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.teams.map((team, i) => (
            <tr key={i}>
              <td>{team.player}</td>
              <td>{team.gun}</td>
              <td>{team.team}</td>
              <td>
                <Button onClick={() => removeUser(team.player)}>Pop</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pt-3">
        <select
          className="border border-black rounded-xl bg-white py-2 px-3 text-slate-800 mr-3"
          ref={userRef}
        >
          {users
            .filter((user) => !selectedUsernames.includes(user.username))
            .map((user) => (
              <option key={user.username} value={user.username}>
                {user.displayName}
              </option>
            ))}
        </select>
        <select
          className="border border-black rounded-xl bg-white py-2 px-3 text-slate-800 mr-3"
          ref={gunRef}
        >
          {guns
            .filter((gun) => !selectedGuns.includes(gun.id))
            .map((gun) => (
              <option key={gun.id} value={gun.id}>
                {gun.displayName}
              </option>
            ))}
        </select>
        <Button onClick={addUser}>Add</Button>
      </div>
    </div>
  );
}
