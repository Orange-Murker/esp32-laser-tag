import React from "react";
import "../App.css";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { useQuery, useUpdate } from "../hooks/useQuery";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Roles } from "../auth";

export default function GameDashboard() {
  const [isLoading, error, game] = useQuery<{
    id: number;
    players: {
      username: string;
      displayName: string;
      team: number;
      gunId: number;
      stats?: {
        health: number;
        deaths: number;
        shots_fired: number;
      };
    }[];
    running: boolean;
  }>`/matches/active`;
  const navigate = useNavigate();
  const { user } = useAuth();
  if (isLoading) return <div></div>;
  if (error != null) return <div>{error}</div>;
  if (game.running == false) return <Navigate to="/games/new" />;

  const stopGame = async () => {
    const response = await useUpdate`/matches/${game.id}`({}, "DELETE");
    if (response.success) navigate("/games/new");
  };

  return (
    <Layout>
      <div className="text-white text-5xl text-center">Game #{game.id}</div>
      <hr className="border-emerald-700 my-4" />
      {/*<div className="flex text-xl text-white">*/}
      {/*  <div>*/}
      {/*    <span className="text-emerald-700">Time remaining:</span> mm:ss*/}
      {/*  </div>*/}
      {/*  <div className="flex-grow" />*/}
      {/*  <div>*/}
      {/*    <span className="text-emerald-700">Players remaining:</span> #*/}
      {/*  </div>*/}
      {/*  <div className="flex-grow" />*/}
      {/*  <div>*/}
      {/*    <span className="text-emerald-700">Game mode:</span> type*/}
      {/*  </div>*/}
      {/*</div>*/}

      <table className="text-white border border-emerald-700 rounded-xl border-separate p-4 w-full text-center align-middle mt-4">
        <thead>
          <tr className="text-emerald-700">
            <th>Player Name</th>
            <th>Player&apos;s heath</th>
            <th>Deaths</th>
            <th>Shots Fired</th>
            <th>Team</th>
            <th>Gun Id</th>
            {/*<th></th>*/}
          </tr>
        </thead>
        <tbody>
          {game.players.map((player) => (
            <tr key={player.username}>
              <td>{player.displayName}</td>
              <td>{player?.stats?.health ?? "-"}</td>
              <td>{player?.stats?.deaths ?? "-"}</td>
              <td>{player?.stats?.shots_fired ?? "-"}</td>
              <td>{player.team}</td>
              <td>{player.gunId}</td>
              {/*<td>*/}
              {/*  <Button>Kick</Button>*/}
              {/*</td>*/}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-grow" />
      {(user?.role ?? Roles.player) >= Roles.gameMaster && (
        <div className="flex w-full text-2xl">
          <div className="flex-grow" />
          <Button onClick={stopGame}>Stop Game</Button>
        </div>
      )}
    </Layout>
  );
}
