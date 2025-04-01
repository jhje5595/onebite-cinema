import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { MovieItem } from "@/components/movie-item";
import style from "./index.module.css";
import movies from "@/mock/mock.json";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchMovie } from "@/lib/fetch-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;
  const searchedMovies = await fetchMovie(q);
  return {
    props: {
      searchedMovies,
    },
  };
};

export default function Page({
  searchedMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (searchedMovies.length === 0) return "해당 영화가 존재하지 않습니다."; // 빈 배열 반환되는지 확인
  return (
    <div className={style.search_container}>
      {searchedMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} width={260} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
