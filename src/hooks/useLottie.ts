import { useEffect, useRef, MutableRefObject } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface UseLottieResult {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  playAnimation: () => void;
}

const useLottie = (animationData: any,option={}): UseLottieResult => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationData,
        ...option,
      });

      return () => animationRef.current?.destroy();
    }
  }, [animationData,containerRef,option]);

  const playAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current.play();
    }
  };

  return { containerRef, playAnimation };
};

export default useLottie;
