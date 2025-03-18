import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button, Alert, Spinner } from 'react-bootstrap';
import CustomInput from '../components/CustomInput';
import './styles/CreateUser.css';

interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showSuccessAlert = () => {
    alert('Usuário criado com sucesso!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post('/user', formData);
      console.log(response);

      if (response.status === 200) {
        showSuccessAlert();

        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          password: '',
        });
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Erro ao criar usuário';
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="create-user-page">
      <div className="create-user-container">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <h2>Criar Novo Usuário</h2>

        <form onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            label="Nome *"
            required
          />

          <CustomInput
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            label="Sobrenome *"
            required
          />

          <CustomInput
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            label="Telefone *"
            required
          />

          <CustomInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email *"
            required
          />

          <CustomInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Senha *"
            required
            minLength={6}
          />

          <div className="button-group">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Criando...</span>
                </>
              ) : (
                'Criar Usuário'
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => !loading && navigate('/dashboard')}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>
        </form>

        <div className="back-container">
          <Button
            className="back-button"
            onClick={() => !loading && navigate(-1)}
            disabled={loading}
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
