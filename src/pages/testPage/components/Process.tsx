import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'react-use';
import { LoadingOutlined } from '@ant-design/icons';
// 设置时间间隔常量（单位：秒）
const TIME_INTERVAL = 60;

function useFetch() {
  const { data, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ['getMock'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      console.log('获取了数据');
      return await res.json();
    },
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const manualRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isFetching) {
      setElapsedSeconds(0);
    }
  }, [isFetching]);

  useInterval(
    () => {
      if (elapsedSeconds === TIME_INTERVAL) {
        manualRefetch();
        setElapsedSeconds(0);
        return;
      }
      setElapsedSeconds((p) => (p += 1));
    },
    isFetching ? null : 1000,
  );

  const progress = useMemo(() => {
    return (elapsedSeconds / TIME_INTERVAL) * 100;
  }, [elapsedSeconds]);

  const remainingTime = useMemo(() => TIME_INTERVAL - elapsedSeconds, [elapsedSeconds]);

  const isLoading = useMemo(() => progress === 0, [progress]);

  return {
    data,
    refetch: manualRefetch,
    isFetching,
    isLoading,
    isSuccess,
    elapsedSeconds,
    remainingTime,
    progress,
  };
}

const Process = () => {
  const { remainingTime, progress, isFetching, isLoading, refetch } = useFetch();
  return (
    <div className="flex flex-col items-center">
      <h1>
        {`${isFetching}`}/{remainingTime}
      </h1>

      <div
        className={`w-[32px] h-[32px] flex justify-center items-center rounded-full ${
          isLoading ? '' : 'cursor-pointer hover:bg-gray-200'
        }`}
        onClick={refetch}
      >
        <Spin
          percent={progress}
          indicator={isLoading ? <LoadingOutlined spin /> : undefined}
        ></Spin>
      </div>
      <Button onClick={refetch}>refetch</Button>
    </div>
  );
};

export default Process;
