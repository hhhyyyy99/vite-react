import { Header } from '../../components/Header';
import Example from './components/example';
export default function Test() {
  const ExampleElement = () => {
    const result = Array.from({ length: 10 }, (_, index) => index).map(item=><Example key={item} {...{value:item}}/>);
    // console.log(result.map(item=>item.type()));
    console.log(result);
    return result;
  };
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div>{ExampleElement()}</div>
      </div>
    </div>
  );
}
