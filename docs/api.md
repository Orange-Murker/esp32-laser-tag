# Lzrtag API

Here is a small description of the Lzrtag solutions API.
Everything is done through JSON (screw XML).
Responses are described in TypeScript notation, as that's how they're internally defined.

## Embedded

This group is designed to only be used by the embedded guns, and therefore uses tokes passed
via the URL for authentication

### Status update

A POST request to `/embedded/{token}` should adhere to the below spec.
The response body will be empty, and should be ignored.

```ts
export class StatusUpdateDto {
  health: number;
  deaths: number;
  shotsFired: number;
  hits: {
    shooter: number;
    damage: number;
    kill: boolean;
  }[];
}
```

### Game status

A GET request to `/embedded/{token}` will get a response according to the below spec.

```ts
export class GameStatusDto {
  game_running: boolean;
  team_fire: boolean;
  time_to_respawn: number;
  team: number[];
}
```
