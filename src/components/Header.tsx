import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('isLogged');
        navigate('/login');
    }
  return (
      <>
          <header className='mb-2'>
              <h1 className='text-2xl font-semibold cursor-pointer' onClick={() => navigate('/')}>主页</h1>
              <Button type='primary' onClick={logout}>退出</Button>
          </header>
      </>
  )
}
