export class StatusUpdateDto {
  health: number;
  deaths: number;
  shots_fired: number;
  hits: {
    shooter: number;
    damage: number;
    kill?: boolean;
  }[];
}
