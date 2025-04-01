import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import movies from "@/mock/mock.json";
import { MovieItem } from "@/components/movie-item";
import { fetchMovie } from "@/lib/fetch-movie";
import { InferGetServerSidePropsType } from "next";
import { fetchRandomMovie } from "@/lib/fetch-random-movie";

export const getServerSideProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovie(),
    fetchRandomMovie(),
  ]);

  return {
    props: { allMovies, recoMovies },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.index_container}>
      <section className={style.recommended_movie_section}>
        지금 가장 추천하는 영화
        <div className={style.recommended_movie_item_container}>
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} width={260} />
          ))}
        </div>
      </section>
      <section className={style.registered_movie_section}>
        등록된 모든 영화
        <div className={style.registerd_movie_item_container}>
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} width={150} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
