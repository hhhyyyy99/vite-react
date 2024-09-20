import { Header } from '@/components/Header';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import './index.css';
import Process from './components/Process';

export default function Test() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <Process/>
      </div>
    </div>
  );
}
