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
