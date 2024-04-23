import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
  const isLogged = localStorage.getItem('isLogged');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
    return () => {}; // 清除副作用函数，避免内存泄漏。
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // 模拟登录
    if (username === 'admin' && password === '123456') {
      // 登录成功，跳转到首页
      localStorage.setItem('isLogged', 'true');
      navigate('/');
    } else {
      // 登录失败，提示错误信息
      alert('登录失败，请检查用户名或密码是否正确！');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>登录（本机测试）</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
