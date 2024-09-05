import {useState} from "react";
import bigNumber from "bignumber.js";
import {getCurrentMs} from "@/utils/time";
import {useInterval} from "react-use";
const usePool = () => {
  const baseNum = 50
  const dayTime = 24 * 60 * 60 * 1000; // 86,400,000
  const timeSpeed = 40
  const cardinalNumber = 5
  const oneMsNum = bigNumber(cardinalNumber).dividedBy(dayTime)
  const currentTimeNumByMs = getCurrentMs()
  const currentMs = bigNumber(currentTimeNumByMs).multipliedBy(oneMsNum)
  const base = bigNumber(baseNum).plus(currentMs)
  const [num,setNum] = useState<number>(0);
  const [textNum,setTextNum] = useState<number>(0);

  useInterval(()=>{
    !num && setNum(base.toNumber())
    setNum(prevState => getEarningsByCompute(prevState,timeSpeed))
    setTextNum(_ => getEarningsByCurrentTime(base.toNumber(),timeSpeed))
    console.log({num,textNum,currentTimeNumByMs})
  },timeSpeed)

  function getEarningsByCompute(num:number,speed:number){
    const currentNum = bigNumber(num)
    const multipliedNum = oneMsNum.multipliedBy(speed)
    const result = currentNum.plus(multipliedNum)
    return result.toNumber()
  }

  // 直接计算当前时间的收益 问题在于当天时间也是依据cardinalNumber计算的
  function getEarningsByCurrentTime(baseNum: number, ms: number) {
    const base = bigNumber(baseNum)//已经领取的
    const currentMs = bigNumber(ms).multipliedBy(oneMsNum)
    const sum = base.plus(currentMs)
    return sum.toNumber()
  }
  return {num,textNum,currentTimeNumByMs}
}
export default usePool