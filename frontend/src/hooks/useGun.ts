import { useQuery } from "./useQuery";

export function useGun(id: string) {
  return useQuery<
    {
      id: number;
      displayName: string;
    }
  >`/guns/${id}`;
}
