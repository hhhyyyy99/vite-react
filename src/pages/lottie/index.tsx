import { useLayoutEffect, useState } from "react";
import LottieAnimation from "./LottieAnimation.tsx";
import { Header } from "../../components/Header.tsx";
async function getAnimationData(url: string) {
    const module = await import(url);
    return module.default
}
export default function Lottie() {
    const customElemData = {
        lottieDisplayName: "[OK Hand]",
        businessID: "alien_lottie_Message",
        lottieName: "lottie_default_38",
    };
   const animationDataUrl = `../../assets/lottie/minions/lottie/${customElemData.lottieName}.json`
   // 动态获取文件导入
   const [animationData, setAnimationData] = useState<any>(null);
   useLayoutEffect(() => {
       getAnimationData(animationDataUrl).then(res => {
        console.log(res)
           setAnimationData(res)
       })
       return () => {
           setAnimationData(null)
       }
   },[])
    return (<>
        <div className="home-container">
            <Header />
            <div className="home-content">
                <LottieAnimation animationData={animationData} />
            </div>
        </div>
    </>)
}
