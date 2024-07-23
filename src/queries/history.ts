import { GoogleBookData } from "@/types/google/volume";
import { useQuery } from "@tanstack/react-query";

export const useHistory = (userId: string) =>
  useQuery<GoogleBookData[]>({
    queryKey: ["userHistory", userId],
    queryFn: async () => {
      const response = await fetch(
        `/.netlify/functions/history?userId=${userId}`
      );
      const jsonData = (await response.json()) as GoogleBookData[];
      const sortedData = jsonData.reverse();
      return sortedData;
    },
  });
