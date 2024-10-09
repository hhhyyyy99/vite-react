interface Props<T> {
  list: T[];
  onChange?: (item: T) => void;
}

const TestProps = <T,>(props: Props<T>) => {
  return (
    <div className='flex justify-center gap-2'>
      {props.list.map((item, index) => (
        <div key={index} onClick={() => props.onChange?.(item)}>
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
};

export default TestProps;
