import { useQuery } from "./useQuery";

export function useGuns() {
  return useQuery<
    {
      id: number;
      displayName: string;
    }[]
  >`/guns`;
}
