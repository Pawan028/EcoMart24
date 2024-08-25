import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  PAYMENT_METHOD_RAZORPAY_CARD,
  PAYMENT_METHOD_RAZORPAY_UPI,
  PAYMENT_METHOD_COD,
} from '../constants';
import { savePaymentMethod } from '../slices/cartSlice';
import "../assets/styles/PaymentComponent.css"

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD_RAZORPAY_CARD);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <Card className="shadow-sm p-4">
              <Card.Header className="bg-primary text-white">
                <h4>Select Payment Method</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <div className="d-flex justify-content-between mb-3">
                    <div
                      className={`payment-option ${paymentMethod === PAYMENT_METHOD_RAZORPAY_CARD ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(PAYMENT_METHOD_RAZORPAY_CARD)}
                    >
                      <div className="icon-container">
                        <i className="bi bi-credit-card"></i>
                      </div>
                      <span>Card</span>
                    </div>

                    <div
                      className={`payment-option ${paymentMethod === PAYMENT_METHOD_RAZORPAY_UPI ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(PAYMENT_METHOD_RAZORPAY_UPI)}
                    >
                      <div className="icon-container">
                        <i className="bi bi-phone"></i>
                      </div>
                      <span>UPI</span>
                    </div>

                    <div
                      className={`payment-option ${paymentMethod === PAYMENT_METHOD_COD ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(PAYMENT_METHOD_COD)}
                    >
                      <div className="icon-container">
                        <i className="bi bi-cash"></i>
                      </div>
                      <span>Cash on Delivery</span>
                    </div>
                  </div>

                  {paymentMethod === PAYMENT_METHOD_RAZORPAY_CARD && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="4111 1111 1111 1111"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group>
                            <Form.Label>Expiry Month</Form.Label>
                            <Form.Control
                              as="select"
                              value={expiryMonth}
                              onChange={(e) => setExpiryMonth(e.target.value)}
                            >
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={(i + 1).toString().padStart(2, '0')}>
                                  {(i + 1).toString().padStart(2, '0')}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Expiry Year</Form.Label>
                            <Form.Control
                              as="select"
                              value={expiryYear}
                              onChange={(e) => setExpiryYear(e.target.value)}
                            >
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={(new Date().getFullYear() + i).toString()}>
                                  {new Date().getFullYear() + i}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  {paymentMethod === PAYMENT_METHOD_RAZORPAY_UPI && (
                    <Form.Group className="mb-3">
                      <Form.Label>UPI ID</Form.Label>
                      <Form.Control type="text" placeholder="example@upi" />
                    </Form.Group>
                  )}

                  {paymentMethod === PAYMENT_METHOD_COD && (
                    <div className="text-muted">You will pay on delivery.</div>
                  )}

                  <Button type="submit" variant="primary" className="w-100 mt-3">
                    Continue
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </FormContainer>
  );
};

export default PaymentScreen;
