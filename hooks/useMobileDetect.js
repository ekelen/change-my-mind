import { useEffect, useState } from "react";

// https://stackoverflow.com/a/61519537

const getMobileDetect = (userAgent) => {
  const isAndroid = () => userAgent.match(/Android/i);
  const isIos = () => userAgent.match(/iPhone|iPad|iPod/i);
  const isOpera = () => userAgent.match(/Opera Mini/i);
  const isWindows = () => userAgent.match(/IEMobile/i);
  const isSSR = () => userAgent.match(/SSR/i);
  const isMobile = () => isAndroid() || isIos() || isOpera() || isWindows();
  const isDesktop = () => !isMobile() && !isSSR();
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};
const useMobileDetect = () => {
  const [userAgent, setUserAgent] = useState("");
  useEffect(() => {
    setUserAgent(
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent
    );
  }, []);

  return getMobileDetect(userAgent);
};

export default useMobileDetect;
