import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import ManageMenuItems from './pages/ManageMenuItems';
import CreateUser from './pages/CreateUser';
import CreateOrder from './pages/CreateOrder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Order" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Order" element={<CreateOrder />} />
          <Route
            path="/"
            element={<PrivateRoute />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/menu" element={<ManageMenuItems />} />
            <Route path="/newUser" element={<CreateUser />} />
          </Route>

          <Route path="*" element={<Navigate to="/Order" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
