import { useLayoutEffect,useRef } from "react";
import lottie from "lottie-web";
const LottieAnimation = ({ animationData }:{animationData:any}) => {
  const container = useRef<HTMLDivElement>(null);
useLayoutEffect(() => {
    lottie.loadAnimation({
      container: container.current!, // 指定容器
      animationData: animationData, // 动画 JSON 文件的 URL
      renderer: "svg", // 使用 SVG 渲染
      loop: true, // 循环播放
      autoplay: true, // 自动播放
    });

    // 清除动画实例
    return () => {
      lottie.destroy();
    };
  }, [animationData]);

  return (
    <span ref={container} style={{width:100,display:"inline-block"}}></span>
  );
};

export default LottieAnimation;
