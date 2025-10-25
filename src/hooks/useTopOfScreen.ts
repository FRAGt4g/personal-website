import { useEffect, useState } from "react";

const useTopOfScreen = () => {
  const [atTopOfPage, setAtTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    setAtTopOfPage(window.scrollY === 0);
    const handleScroll = () => {
      setAtTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { atTopOfPage };
};

export default useTopOfScreen;
