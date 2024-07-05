import {useLottie} from "lottie-react";
const LottieReact = ({ animationData }:{animationData:any}) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <div style={{width:100,display:"inline-block"}}>{View}</div>;
};

export default LottieReact;
