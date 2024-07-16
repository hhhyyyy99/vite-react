import { useLayoutEffect, useState } from 'react';
import LottieWeb from './LottieWeb.tsx';
import LottieReact from './LottieReact.tsx';
import { Header } from '../../components/Header.tsx';
import useLottie from '../../hooks/useLottie.ts';
import jsonFile from "../../assets/lottieResources/minions/lottie/lottie_default_37.json"
import { clone } from 'radash';
async function getAnimationData(url: string) {
  const module = await import(url);
  return module.default;
}
export default function Lottie() {
  const customElemData = {
    lottieDisplayName: '[OK Hand]',
    businessID: 'alien_lottie_Message',
    lottieName: 'lottie_default_38',
  };
  const animationDataUrl = `../../assets/lottieResources/minions/lottie/${customElemData.lottieName}.json`;
  // 动态获取文件导入
  const [animationData, setAnimationData] = useState<any>(null);
  useLayoutEffect(() => {
    getAnimationData(animationDataUrl).then((res) => {
      setAnimationData(res);
    });
    return () => {
      setAnimationData(null);
    };
  }, []);

  const d  = clone(jsonFile);
  const options = {
    loop:true,
    autoplay: true,
  }
  const {containerRef, playAnimation} = useLottie(animationData,options);
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="home-content">
          <LottieWeb animationData={animationData} />
          <LottieReact animationData={animationData} />
          <div ref={containerRef} style={{ width: 100, fontSize: 12 }} onClick={playAnimation}></div>
        </div>
      </div>
    </>
  );
}
