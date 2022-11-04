import React, { useState } from "react";
import { GameEditor, GameEditorState } from "../components/GameEditor";
import { Layout } from "../components/Layout";
import Button from "../components/Button";
import { useUpdate } from "../hooks/useQuery";
import { Navigate, useNavigate } from 'react-router-dom';

export function CreateGame() {
  const [gameState, setGameState] = useState<GameEditorState>({
    teams: [],
    friendlyFire: true,
    respawnTime: -1,
  });
  const createUser = useUpdate`/matches`;
  const navigate = useNavigate();

  const submit = async () => {
    const response = await createUser(gameState, "POST");
    if(response.statusCode) return;
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="text-white text-5xl text-center">Start Game</div>
      <hr className="border-emerald-700 my-4" />
      <GameEditor state={gameState} setState={setGameState} />
      <div className="flex-grow" />
      <div className="flex w-full text-2xl">
        <div className="flex-grow" />
        <Button onClick={submit}>Start Game</Button>
      </div>
    </Layout>
  );
}
