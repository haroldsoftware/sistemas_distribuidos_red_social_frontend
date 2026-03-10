import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Red Social</span>
      <div className="navbar-user">
        <span>Hola, <strong>{user?.username}</strong></span>
        <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
