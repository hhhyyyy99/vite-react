import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { Button } from "antd";
import { Header } from "../../components/Header.tsx";

function Home() {
  const isLogged = localStorage.getItem('isLogged');
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
    return () => { }; // 清除副作用函数，避免内存泄漏。
  });


  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <div>
          <Button onClick={() => navigate('/AI')}>AI</Button>
          <Button onClick={() => navigate('/github')}>github</Button>
          <Button onClick={() => navigate('/lottie')}>lottie</Button>
          <Button onClick={() => navigate('/BraftEditor')}>BraftEditor</Button>
          <Button onClick={() => navigate('/Wallet')}>Wallet</Button>
          <Button onClick={() => navigate('/testPage')}>Test</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
