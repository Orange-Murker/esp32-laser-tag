import React from "react";
import "../App.css";
import Button from "../components/Button";

export default function GameDashboard() {
  return (
    <div>
      <header
        style={{
          width: "100vw",
          height: "80px",
          display: "flex",
          borderBottom: "5px solid green",
        }}
      >
        <div style={{ color: "white" }}>
          LZR T4G
          <br />
          SOLUT!ONS
        </div>
        <Button>Current game</Button>
        <Button>Manage users</Button>
        <Button>Profile</Button>
      </header>
      <main>Table or something</main>
    </div>
  );
}
