import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';


dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.duration({ months: 12 })
export const transformTimeByTimezone = (time:string) =>{
  if(!time) return time
  const chainDayjs = dayjs(time).tz("Asia/Shanghai",true)
  const timezone = dayjs.tz.guess();
  return chainDayjs.tz(timezone).format('YYYY-MM-DD HH:mm:ss')
}
export const getCurrentMs = () => {
  console.log("getCurrentMs")
  const current = dayjs()
  const startOfDay = current.startOf('day');
  // 计算两个时间点之间的差值，并以毫秒为单位返回
  return current.diff(startOfDay, 'millisecond')
}