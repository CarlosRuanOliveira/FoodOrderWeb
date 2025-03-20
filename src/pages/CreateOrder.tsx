import { useState } from 'react';
import { Button, Row, Col, Table, Form } from 'react-bootstrap';
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
  const [modalMessageTitle, setModalMessageTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
    setModalMessageTitle('');

    if (orderItems.length === 0) {
      setModalMessageTitle('Adicione pelo menos um item ao pedido');
      return;
    }

    try {
      const response = await api.post('/order', {
        customerPhoneNumber: customerPhone,
        customerFirstName: customerFirstName || undefined,
        customerLastName: customerLastName || undefined,
        orderItems: orderItems,
      });

      const orderId = response.data?.orderId;
      const customerId = response.data?.customerId;
      const totalPrice = response.data?.totalPriceCents;

      setModalMessageTitle(`Pedido criado com sucesso!`);
      showModalMessage(
        `ID do Pedido: ${orderId} | ID do Cliente: ${customerId} | Preço total: R$${totalPrice}`
      );

      setOrderItems([]);
      setCustomerPhone('');
      setCustomerFirstName('');
      setCustomerLastName('');
    } catch (err: any) {
      setModalMessageTitle('Erro ao criar pedido: ');
      showModalMessage(err.response?.data?.message);
    }
  };

  const showModalMessage = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="create-order-page">
      <div className="create-order-container">
        <h1>Criar Novo Pedido</h1>

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

      {showModal && (
        <>
          <div className="custom-modal-backdrop" onClick={closeModal}></div>
          <div className="custom-modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  X
                </button>
                <h5 className="modal-title">{modalMessageTitle}</h5>

                <div className="modal-body">
                  <p>{modalMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateOrder;
