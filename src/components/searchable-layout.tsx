import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const q = router.query.q as string;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // 엔터 입력시 검색 가능하게 함
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  // 리렌더링 해도 input에 검색값이 남아있도록 하기 위함
  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
