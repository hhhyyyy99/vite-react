import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('isLogged');
        navigate('/login');
    }
  return (
      <>
          <header>
              <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>主页</h1>
              <button onClick={logout}>退出</button>
          </header>
      </>
  )
}
