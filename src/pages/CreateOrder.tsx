import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, Row, Col, Table, Form } from 'react-bootstrap';
import api from '../services/api';
import CustomInput from '../components/CustomInput';
import './styles/CreateOrder.css';

interface OrderItem {
  itemId: number;
  quantity: number;
}

const CreateOrder = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const addItemToOrder = () => {
    if (selectedItem && quantity > 0) {
      setOrderItems([...orderItems, { itemId: selectedItem, quantity }]);
      setSelectedItem(0);
      setQuantity(1);
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (orderItems.length === 0) {
      setError('Adicione pelo menos um item ao pedido');
      return;
    }

    try {
      await api.post('/order', {
        customerPhoneNumber: customerPhone,
        customerFirstName: customerFirstName || undefined,
        customerLastName: customerLastName || undefined,
        orderItems: orderItems,
      });

      setSuccessMessage('Pedido criado com sucesso!');

      setOrderItems([]);
      setCustomerPhone('');
      setCustomerFirstName('');
      setCustomerLastName('');

      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      setError('Erro ao criar pedido: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="create-order-page">
      <div className="create-order-container">
        <h1>Criar Novo Pedido</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <CustomInput
                type="text"
                name="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                label="Telefone do Cliente"
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <CustomInput
                type="text"
                name="customerFirstName"
                value={customerFirstName}
                onChange={(e) => setCustomerFirstName(e.target.value)}
                label="Nome do Cliente"
              />
            </Col>
            <Col md={6}>
              <CustomInput
                type="text"
                name="customerLastName"
                value={customerLastName}
                onChange={(e) => setCustomerLastName(e.target.value)}
                label="Sobrenome do Cliente"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <CustomInput
                type="number"
                name="itemId"
                value={selectedItem}
                onChange={(e) => setSelectedItem(Number(e.target.value))}
                label="ID do Item"
                required
              />
            </Col>
            <Col md={3}>
              <CustomInput
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                label="Quantidade"
                min="1"
              />
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="secondary" onClick={addItemToOrder}>
                Adicionar Item
              </Button>
            </Col>
          </Row>

          {orderItems.length > 0 && (
            <Table striped bordered className="mb-4">
              <thead>
                <tr>
                  <th>ID do Item</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemId}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Button variant="primary" type="submit">
            Finalizar Pedido
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrder;
