import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import CustomInput from '../components/CustomInput';
import './styles/ManageMenuItems.css';

const ManageMenuItems = () => {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [deleteId, setDeleteId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const price = parseFloat(newPrice.replace(',', '.'));

      const response = await api.post('/menuItem', {
        name: newName,
        priceCents: price,
      });
      setCreatedId(response.data.id);
      setNewName('');
      setNewPrice('');
      alert('Item criado com sucesso!');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao criar item.';
      alert(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      const price = parseFloat(editPrice.replace(',', '.'));

      await api.put(`/menuItem/${editId}`, {
        name: editName,
        priceCents: price,
      });
      alert('Item editado com sucesso!');
      setEditId('');
      setEditName('');
      setEditPrice('');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao editar item.';
      alert(errorMessage);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm('Tem certeza que deseja deletar este item?')) return;
    setIsDeleting(true);
    try {
      await api.delete(`/menuItem/${deleteId}`);
      setDeleteMessage(`Item ${deleteId} deletado com sucesso!`);
      setDeleteId('');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Erro ao deletar item.';
      setDeleteMessage(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="manage-menu-page">
      <Container className="manage-menu-container">
        <h1 className="my-4">Gerenciar Itens do Menu</h1>

        <Row className="mb-4">
          <Col>
            <h2>Criar Item</h2>
            <form onSubmit={handleCreate}>
              <CustomInput
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                label="Nome"
                required
              />
              <CustomInput
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                label="Preço (R$)"
                step="0.01"
                required
              />
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Criar'
                )}
              </Button>
              {createdId && (
                <Alert className="mt-3" variant="success">
                  Item criado com ID: {createdId}
                </Alert>
              )}
            </form>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h2>Editar Item</h2>
            <form onSubmit={handleEdit}>
              <CustomInput
                type="number"
                value={editId}
                onChange={(e) => setEditId(e.target.value)}
                label="ID do Item"
                required
              />
              <CustomInput
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                label="Novo Nome"
                required
              />
              <CustomInput
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                label="Novo Preço (R$)"
                step="0.01"
                required
              />
              <Button type="submit" disabled={isEditing}>
                {isEditing ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Editar'
                )}
              </Button>
            </form>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h2>Deletar Item</h2>
            <form onSubmit={handleDelete}>
              <CustomInput
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                label="ID do Item"
                required
              />
              <Button type="submit" variant="danger" disabled={isDeleting}>
                {isDeleting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Deletar'
                )}
              </Button>
              {deleteMessage && (
                <Alert
                  className="mt-3"
                  variant={
                    deleteMessage.includes('sucesso') ? 'success' : 'danger'
                  }
                >
                  {deleteMessage}
                </Alert>
              )}
            </form>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <Button className="back-button" onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageMenuItems;
