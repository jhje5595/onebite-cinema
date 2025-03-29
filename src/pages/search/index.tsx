import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./index.module.css";
import movies from "@/mock/mock.json";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  function getSearchedMovie() {
    if (!q) return;
    const searchMovie = movies.filter((movie) => movie.title.includes(q));
    return searchMovie;
  }

  const searchedMovie = getSearchedMovie();
  return (
    <div className={style.search_container}>
      {searchedMovie?.map((movie) => (
        <MovieItem key={movie.id} {...movie} width={260} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
