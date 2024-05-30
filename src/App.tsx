import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/index';
import Home from './pages/home/index';
import AI from './pages/AI/index';
import GitHub from './pages/github/index';
import QianKun from './pages/qiankun/index';
function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<Home />} />
       <Route path="/ai" element={<AI />} />
          <Route path="/github" element={<GitHub />} />
          <Route path="/qiankun" element={<QianKun />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
