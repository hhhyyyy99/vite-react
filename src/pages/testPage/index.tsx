import { useEffect } from 'react';
import { Header } from '../../components/Header';
export default function Test() {
  useEffect(()=>{
  },[])
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
      </div>
    </div>
  );
}
