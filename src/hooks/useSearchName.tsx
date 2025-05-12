import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";

// Header 컴포넌트와 SearchPage 컴포넌트에서 같이 사용하고 있음. -> 2.13 정준영
const useSearchName = (q: string) => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState(q || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchedName },
    });
    setSearchedName("");
  };

  return { searchedName, handleChange, handleSubmit };
};

export default useSearchName;
