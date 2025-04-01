import { MovieData } from "@/types";

export const fetchDetailMovie = async (
  id: number
): Promise<MovieData | null> => {
  const url = `http://localhost:12345/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};
