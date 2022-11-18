# Lzrtag API

Here is a small description of the Lzrtag solutions API.
Everything is done through JSON (screw XML).
Responses are described in TypeScript notation, as that's how they're internally defined.

## Embedded

This group is designed to only be used by the embedded guns, and therefore uses tokes passed
via the URL for authentication

### Status update

A POST request to `/embedded/{token}` should adhere to the below spec where kill is optional.

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

The response body is as follows:

```ts
export class GameStatusDto {
  game_running: boolean;
  team_fire: boolean;
  time_to_respawn: number;
  team: number[];
}
```

Below you can see an example of the JSON packet sent by the gun (prettified):

```json
{
  "health": 250,
  "deaths": 0,
  "shots_fired": 10,
  "hits": [
    { "shooter": 1, "damage": 25 },
    { "shooter": 1, "damage": 25, "kill": true}
  ]
}
```

And the response by the server where the team is an array of gun IDs of people in our team:
```json
{
    "game_running": true,
    "team_fire": false,
    "time_to_respawn": 10,
    "team": [1, 2, 3],
}
```