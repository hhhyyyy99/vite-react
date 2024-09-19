import { Header } from '@/components/Header';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import './index.css';
import TestInput from './components/TestInput';

export default function Test() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <TestInput/>
      </div>
    </div>
  );
}
