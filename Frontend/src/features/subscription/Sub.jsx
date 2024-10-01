import React, { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const PricingPlans = () => {

  const nav = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).type : null;
    if (userType === 'seller') {
      toast.error("You can't buy prime because you are registered as a seller.");
    }
  }, [history]);

  const check =()=>{
    const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).type : null;
    if (userType === 'seller') {
      toast.error("You can't buy prime because you are registered as a seller.");
    }else{
      nav('/home/subscription-payment')
    }
  }



  return (<>

    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h1 class="display-4 fw-normal text-body-emphasis">Pricing</h1>
      <p class="fs-5 text-body-secondary">select the plan as you need </p>
    </div>

  
      <div className="flex mb-3 text-center justify-content-evenly mt-5">
        <div className="col-4">
          <div className="card mb-4 rounded-3 shadow-sm ">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Free</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$0<small className="text-body-secondary fw-light">/lifetime</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>access to all non prime posting</li>
                <li>get contact info of non prime posting</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              <Link to='/signup' className="w-100 btn btn-lg btn-outline-primary">Sign up for free</Link>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Prime</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$15<small className="text-body-secondary fw-light">/mo</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
              <li>access to all prime posting</li>
                <li>get contact info of prime posting</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-primary" onClick={()=>check()}>Get started</button>
            </div>
          </div>
        </div>
       
      </div>


     

    <ToastContainer/>
  </>
  );
};

export default PricingPlans;
