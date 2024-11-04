import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const useSearchName = () => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState("");

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
