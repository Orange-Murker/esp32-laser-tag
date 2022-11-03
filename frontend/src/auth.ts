export enum Roles {
  player,
  gameMaster,
  admin,
}

export type User = {
  username: string;
  role: Roles;
};
