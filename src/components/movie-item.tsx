import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export function MovieItem({
  id,
  title,
  releaseDate,
  company,
  genres,
  subTitle,
  description,
  runtime,
  posterImgUrl,
  width,
}: MovieData & { width: number }) {
  return (
    <Link href={`/movie/${id}`} className={style.movie_item_container}>
      <img
        src={posterImgUrl}
        width={`${width}px`}
        height={`${(width * 3) / 2}px`} // 포스터 비율에 맞게 설정
      />
    </Link>
  );
}
