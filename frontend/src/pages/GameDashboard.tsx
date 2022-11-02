import React from "react";
import "../App.css";
import { Layout } from "../components/Layout";
import Button from "../components/Button";

export default function GameDashboard() {
  return (
    <Layout>
      <div className="text-white text-5xl text-center">Game #1</div>
      <hr className="border-emerald-700 my-4" />
      <div className="flex text-xl text-white">
        <div>
          <span className="text-emerald-700">Time remaining:</span> mm:ss
        </div>
        <div className="flex-grow" />
        <div>
          <span className="text-emerald-700">Players remaining:</span> #
        </div>
        <div className="flex-grow" />
        <div>
          <span className="text-emerald-700">Game mode:</span> type
        </div>
      </div>

      <table className="text-white border border-emerald-700 rounded-xl border-separate p-4 w-full text-center align-middle mt-4">
        <tr className="text-emerald-700">
          <th>Player ID</th>
          <th>Player&apos;s heath</th>
          <th>Kills : Deaths</th>
          <th>Team</th>
          <th></th>
        </tr>
        <tr>
          <td>1</td>
          <td>10</td>
          <td>#</td>
          <td>#</td>
          <td>
            <Button>Kick</Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>50</td>
          <td>#</td>
          <td>#</td>
          <td>
            <Button>Kick</Button>
          </td>
        </tr>
      </table>
      <div className="flex-grow" />
      <div className="flex w-full text-2xl">
        <div className="flex-grow" />
        <Button>Stop Game</Button>
      </div>
    </Layout>
  );
}
