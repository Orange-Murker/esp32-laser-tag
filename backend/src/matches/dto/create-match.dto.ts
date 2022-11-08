export class CreateMatchDto {
  teams: {
    player: string;
    gun: number;
    team: number;
  }[];
  friendlyFire: boolean;
  respawnTime: number;
}
