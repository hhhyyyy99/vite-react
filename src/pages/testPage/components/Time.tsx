import usePool from '@/hooks/usePool';
import { Button } from 'antd';

const Time = () => {
  const { num, textNum } = usePool();
  return (
    <div className="flex justify-center">
      <div className='flex flex-col gap-3'>
        <p>num: {num.toFixed(6)}</p>
        <p>num: {textNum.toFixed(6)}</p>
      </div>
    </div>
  );
};
export default Time;
