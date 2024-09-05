import usePool from '@/hooks/usePool';

const Time = () => {
  const { computeEarning, currentEarning, func } = usePool();
  return (
    <div className="flex justify-center">
      <div className='flex flex-col gap-3'>
        <p>num: {computeEarning.toFixed(6)}</p>
        <p>num: {currentEarning.toFixed(6)}</p>
        <p>{func("millisecond")}</p>
        <p>{func("second")}</p>
        <p>{func("minute")}</p>
        <p>{func("hour")}</p>
      </div>
    </div>
  );
};
export default Time;
