import { useState } from 'react';
import { Form, Button, Table, Container } from 'react-bootstrap';
import api from '../services/api';
import { OrderStatus } from '../models/enums/OrderStatus';
import { OrderItem } from '../models/OrderItem';
import CustomInput from '../components/CustomInput'; // Importando o CustomInput
import './styles/UpdateOrder.css';

const UpdateOrder = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [newStatus, setNewStatus] = useState<OrderStatus>(OrderStatus.Pending);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [itemId, setItemId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const handleUpdateStatus = async () => {
    if (!orderId) {
      alert('Por favor, insira um ID de pedido.');
      return;
    }

    try {
      await api.put(`/order/${orderId}`, { status: newStatus });
      alert('Status atualizado com sucesso!');
    } catch (error: any) {
      alert('Erro ao atualizar o status.');
    }
  };

  const handleAddItem = () => {
    if (!itemId || !quantity) return;
    setOrderItems([
      ...orderItems,
      { itemId: parseInt(itemId), quantity: parseInt(quantity) },
    ]);
    setItemId('');
    setQuantity('');
  };

  const handleUpdateItem = (itemId: number, quantity: number) => {
    setOrderItems(
      orderItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setOrderItems(orderItems.filter((item) => item.itemId !== itemId));
  };

  const handleUpdateItems = async () => {
    if (!orderId) {
      alert('Por favor, insira um ID de pedido.');
      return;
    }

    try {
      await api.put(`/order/${orderId}/orderItems`, { orderItems });
      alert('Itens do pedido atualizados com sucesso!');
    } catch (error: any) {
      alert('Erro ao atualizar os itens.');
    }
  };

  return (
    <div className="update-order-page">
      <Container className="update-order-container">
        <h2>Atualizar Pedido</h2>

        <Form.Group className="mb-3">
          <CustomInput
            label="ID do Pedido"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Digite o ID do pedido"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Atualizar Status</Form.Label>
          <br />
          <Form.Select
            className="custom-select"
            value={newStatus}
            onChange={(e) =>
              setNewStatus(Number(e.target.value) as OrderStatus)
            }
          >
            {Object.entries(OrderStatus)
              .filter(([key, value]) => !isNaN(Number(value)))
              .map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
          </Form.Select>
          <Button
            variant="success"
            className="mt-2"
            onClick={handleUpdateStatus}
          >
            Atualizar Status
          </Button>
        </Form.Group>

        <h3>Gerenciar Itens</h3>
        <Form className="d-flex mb-3">
          <CustomInput
            label="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Item ID"
          />
          <CustomInput
            label="Quantidade"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantidade"
          />
          <Button variant="primary" onClick={handleAddItem}>
            Adicionar Item
          </Button>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>
                  <CustomInput
                    label="Quantidade"
                    type="number"
                    value={item.quantity.toString()}
                    onChange={(e) =>
                      handleUpdateItem(item.itemId, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item.itemId)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="success" onClick={handleUpdateItems}>
          Atualizar Itens
        </Button>
      </Container>
    </div>
  );
};

export default UpdateOrder;
