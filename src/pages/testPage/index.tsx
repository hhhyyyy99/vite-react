import 'mac-scrollbar/dist/mac-scrollbar.css';
import './index.css';
import TestProps from './components/TestProps';

const TestPage = () => {
  const numbers = [{id:1,name:"jack"},{id:2,name:"eamon"}];
  const strings = ['a', 'b', 'c'];

  const handleNumberChange = (item: {id:number,name:string}) => {
    console.log('Number changed:', item);
  };

  const handleStringChange = (item: string) => {
    console.log('String changed:', item);
  };

  return (
    <div>
      <TestProps list={numbers} onChange={handleNumberChange} />
      <TestProps list={strings} onChange={handleStringChange} />
    </div>
  );
};

export default TestPage;
