import { Header } from '../../components/Header';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import './index.css';
export default function Test() {
  const list = Array.from({ length: 200 }, (_, i) => i);
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div className='scroll-container'>
        <MacScrollbar>
        {list.map(item=><p>{item}</p>)}
        </MacScrollbar>
        </div>
      </div>
    </div>
  );
}
