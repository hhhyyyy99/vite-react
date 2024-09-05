import {useState} from "react";
import bigNumber from "bignumber.js";
import {getDiffToDay} from "@/utils/time";
import {useInterval} from "react-use";
import { DurationUnitType } from "dayjs/plugin/duration";
const usePool = () => {
  const baseNum = 50
  const dayTime = 24 * 60 * 60 * 1000; // 86,400,000
  const timeSpeed = 40
  const cardinalNumber = 5
  const oneMsNum = bigNumber(cardinalNumber).dividedBy(dayTime)
  const startTimeNumByMs = getDiffToDay()
  const currentMs = bigNumber(startTimeNumByMs).multipliedBy(oneMsNum)
  const base = bigNumber(baseNum).plus(currentMs)
  const [computeEarning,setComputeEarning] = useState<number>(0);
  const [currentEarning,setCurrentEarning] = useState<number>(0);

  useInterval(()=>{
    !computeEarning && setComputeEarning(base.toNumber())
    setComputeEarning(prevState => getEarningsByCompute(prevState,timeSpeed))
    setCurrentEarning(_ => getEarningsByCurrentTime(base.toNumber(),timeSpeed))
    console.log({num: computeEarning,textNum: currentEarning,startTimeNumByMs})
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
  return {computeEarning ,currentEarning,func:(unit:DurationUnitType)=>getDiffToDay(unit)}
}
export default usePool