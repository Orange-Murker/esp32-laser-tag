export class GotShotDto {
  health: number;
  deaths: number;
  shots_fired: number;
  hits: {
    shooter: number;
    damage: number;
  }[];
}
