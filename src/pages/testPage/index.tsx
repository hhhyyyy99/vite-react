import { Header } from '@/components/Header';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import './index.css';
import Time from './components/Time';
export default function Test() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <Time/>
      </div>
    </div>
  );
}
