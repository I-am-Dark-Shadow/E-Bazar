import { useEffect, useState } from "react";


// custom hook for mobile
const useMobile = (breakpoint = 780) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    const checkPoint = window.innerWidth < breakpoint;
    setIsMobile(checkPoint);
  };

  useEffect(() => {
    // when the hook first time run then this function will run
    handleResize();

    // when the window is resize then this function will run
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },);

  return [isMobile];
  
}

export default useMobile