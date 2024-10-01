import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


const Payment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    paymentMethod: 'credit',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCvv: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const nav = useNavigate();
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const api = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).type : null;
    if (userType === 'seller') {
      alert("You can't buy prime because you are a seller.");
      nav('/');
    }
  }, [history]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.ccNumber || !formData.ccCvv || !formData.ccExpiration){
      toast("plz fill all the details!!");
      return;
    }

    try {
      const response = await axios.post(`${api}/api/prime/sub/${userId}`, {
        paymentType: formData.paymentMethod,
      });
      if (response.status === 200) {
        setPaymentSuccess(true);
        setTimeout(() => {
          nav('/');
        }, 5000); // Redirect to home page after 5 seconds
      } else {
        setPaymentSuccess(false);
      }
    } catch (error) {
      setPaymentSuccess(false);
    }

    setShowModal(true);
  };

  return (
    <div className='container'>
      <div className="row g-5 mt-4">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">1</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Prime Sub</h6>
                <small className="text-body-secondary">for prime content</small>
              </div>
              <span className="text-body-secondary">$15</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">−$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$10</strong>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <button type="submit" className="btn btn-secondary">Redeem</button>
            </div>
          </form>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-4 ">Billing Details</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder=""
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Valid Full Name is required.
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(important)</span></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>
            </div>
            <div className="form-check mt-5 mb-5">
              <input type="checkbox" className="form-check-input" id="same-address" required />
              <label className="form-check-label" htmlFor="same-address">Accept Terms & Conditions</label>
            </div>
            <hr className="my-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
              <div className="form-check">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  value="debit"
                  checked={formData.paymentMethod === 'debit'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="debit">Debit card</label>
              </div>
            </div>
            <div className="row gy-3 mt-3">
              <div className="col-md-6">
                <label htmlFor="cc-name" className="form-label">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  name="ccName"
                  placeholder=""
                  value={formData.ccName}
                  onChange={handleChange}
                  required
                />
                <small className="text-body-secondary">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="cc-number" className="form-label">Card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  name="ccNumber"
                  placeholder=""
                  value={formData.ccNumber}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  name="ccExpiration"
                  placeholder=""
                  value={formData.ccExpiration}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="cc-cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  name="ccCvv"
                  placeholder=""
                  value={formData.ccCvv}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">Pay Now</button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {paymentSuccess ? 'Payment Successful' : 'Payment Failed'}
                </h5>
                
              </div>
              <div className="modal-body text-center">
                {paymentSuccess ? (
                  <FaCheckCircle size="4em" color="green" />
                ) : (
                  <FaTimesCircle size="4em" color="red" />
                )}
                <p className="mt-3">
                  {paymentSuccess
                    ? 'Thank you for your payment!'
                    : 'There was an error processing your payment. Please try again.'}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Payment;
