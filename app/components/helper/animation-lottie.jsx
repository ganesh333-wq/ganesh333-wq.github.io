"use client";

import { useEffect, useState } from "react";

const AnimationLottie = ({ animationPath, width }) => {
  const [LottieComp, setLottieComp] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("lottie-react").then((mod) => {
      if (mounted) setLottieComp(() => mod.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!LottieComp) return null;

  return <LottieComp loop autoplay animationData={animationPath} style={{ width: width || "95%" }} />;
};

export default AnimationLottie;