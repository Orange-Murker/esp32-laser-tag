import { useQuery } from "./useQuery";

export function useUsers() {
  return useQuery<
    {
      username: string;
      displayName: string;
      role: string;
    }[]
  >`/users`;
}
