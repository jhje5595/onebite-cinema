import { useRouter } from "next/router";
import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchDetailMovie } from "@/lib/fetch-detail-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movieDetail = await fetchDetailMovie(Number(id));
  return {
    props: {
      movieDetail,
    },
  };
};

export default function Page({
  movieDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movieDetail) return "잘못된 접근입니다.";
  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movieDetail;
  return (
    <div className={style.detail_container}>
      <div
        style={{ backgroundImage: `url(${posterImgUrl})` }}
        className={style.cover_img_container}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  );
}
