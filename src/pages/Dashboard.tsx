import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bem-vindo à Dashboard!</h1>
        <p>Você está autenticado e pode acessar as funcionalidades abaixo:</p>
      </header>

      <nav className="dashboard-nav">
        <ul className="dashboard-nav-list">
          <li>
            <button
              className="dashboard-button"
              onClick={() => navigate('/customers')}
            >
              Listar clientes
            </button>
          </li>
          <li>
            <button
              className="dashboard-button"
              onClick={() => navigate('/menu')}
            >
              Modificar cardápio
            </button>
          </li>
          <li>
            <button
              className="dashboard-button"
              onClick={() => navigate('/orders')}
            >
              Atualizar um pedido (Status/Itens)
            </button>
          </li>
          <li>
            <button
              className="dashboard-button"
              onClick={() => navigate('/newUser')}
            >
              Convidar novo usuário
            </button>
          </li>
        </ul>
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
