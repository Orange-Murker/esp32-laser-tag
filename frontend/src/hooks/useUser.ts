import { useQuery } from "./useQuery";

export function useUser(username: string) {
  return useQuery<
    {
      username: string;
      displayName: string;
      role: string;
    }
  >`/users/${username}`;
}
