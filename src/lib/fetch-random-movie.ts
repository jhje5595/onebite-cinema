import { MovieData } from "@/types";

export const fetchRandomMovie = async (): Promise<MovieData[]> => {
  const url = `http://localhost:12345/movie/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};
