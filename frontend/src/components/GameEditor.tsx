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

  //Used for disabling settings when preset is chosen
  const [preset, setPreset] = useState("Custom");

  const userRef = useRef<HTMLSelectElement>(null);
  const gunRef = useRef<HTMLSelectElement>(null);
  const teamRef = useRef<HTMLInputElement>(null);

  const selectedUsernames = state.teams.map((team) => team.player);
  const selectedGuns = state.teams.map((team) => team.gun);

  if (isLoadingUsers || isLoadingGuns) return <div></div>;
  if (errorUsers != null || errorGuns != null) return <div>error</div>;

  const addUser = () => {
    const player = userRef.current?.value;
    const gun = parseInt(gunRef.current?.value ?? "");
    const team = parseInt(teamRef.current?.value ?? "");
    if (!player || isNaN(gun) || isNaN(team)) return;
    setState({
      ...state,
      teams: state.teams.concat({
        player,
        gun,
        team,
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
    <div className="mb-3">
      <table className="text-black border-transparent p-4 w-full align-middle mt-4 table-fixed text-center">
        <thead>
          <tr>
            <th>
              <label>Game mode:</label>
            </th>
            <th>
              <label htmlFor="friendly_fire">Friendly fire: </label>
            </th>
            <th>
              <label htmlFor="respawn_time">Respawn time:</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                className="border border-black rounded-xl bg-white py-2 px-3 text-slate-800 w-48 h-10"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  //changing game settings according to the preset
                  setPreset(e.target.value);
                  switch (e.target.value) {
                    case "Custom": {
                      break;
                    }
                    case "Solo Deathmatch": {
                      setState({
                        ...state,
                        friendlyFire: true,
                        respawnTime: 3,
                      });
                      break;
                    }
                    case "Team Deathmatch": {
                      setState({
                        ...state,
                        friendlyFire: false,
                        respawnTime: 3,
                      });
                      break;
                    }
                    case "Solo Battle Royale": {
                      setState({
                        ...state,
                        friendlyFire: true,
                        respawnTime: -1,
                      });
                      break;
                    }
                    case "Team Battle Royale": {
                      setState({
                        ...state,
                        friendlyFire: false,
                        respawnTime: -1,
                      });
                      break;
                    }
                  }
                }}
              >
                <option selected>Custom</option>
                <option>Solo Deathmatch</option>
                <option>Team Deathmatch</option>
                <option>Solo Battle Royale</option>
                <option>Team Battle Royale</option>
              </select>
            </td>
            <td>
              <input
                disabled={preset !== "Custom"}
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
            </td>
            <td>
              <input
                className="border border-black rounded-xl bg-white py-2 px-3 text-slate-800 p-1 placeholder:text-slate-800 w-48 h-10"
                disabled={preset !== "Custom"}
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
            </td>
          </tr>
        </tbody>
      </table>

      <table className="text-white border border-emerald-700 rounded-xl border-separate p-4 w-full align-middle mt-4 table-fixed text-center">
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
          <tr>
            <td>
              <select
                className="border border-black rounded-xl bg-white py-2 text-slate-800 w-48"
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
            </td>
            <td>
              <select
                className="border border-black rounded-xl bg-white py-2 text-slate-800 w-48"
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
            </td>
            <td>
              <input
                className="p-1 placeholder:text-slate-800 border border-black rounded-xl bg-white py-2 text-slate-800 w-48"
                ref={teamRef}
                placeholder="Team"
                type="number"
              />
            </td>
            <td>
              <Button onClick={addUser} className="w-48">
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
