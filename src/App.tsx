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
import UpdateOrder from './pages/UpdateOrder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/order" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<CreateOrder />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<UpdateOrder />} />
            <Route path="/menu" element={<ManageMenuItems />} />
            <Route path="/newUser" element={<CreateUser />} />
            <Route path="/newUser" element={<CreateUser />} />
          </Route>

          <Route path="*" element={<Navigate to="/Order" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
