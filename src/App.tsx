import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/index';
import Home from './pages/home/index';
import AI from './pages/AI/index';
import GitHub from './pages/github/index';
import Lottie from './pages/lottie/index';
import BraftEditor from './pages/braftEditor/index';
import Test from './pages/testPage';
import SortByName from './pages/sortByname';
function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/" element={<Home />} />
       <Route path="/ai" element={<AI />} />
       <Route path="/github" element={<GitHub />} />
       <Route path="/lottie" element={<Lottie />} />
       <Route path="/BraftEditor" element={<BraftEditor />} />
       <Route path="/testPage" element={<Test />} />
       <Route path="/sortByName" element={<SortByName />} />
       {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
