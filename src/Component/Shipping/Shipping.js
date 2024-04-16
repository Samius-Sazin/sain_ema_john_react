import { clearTheCart, getStoredCart } from '../utilities/fakedb';
import './Shipping.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const addressRef = useRef('');
    const cityRef = useRef('');
    const phoneRef = useRef('');

    const navigate = useNavigate();

    const handleSubmitShipping = e => {
        if (nameRef?.current?.value === '' && emailRef?.current?.value === '' && addressRef?.current?.value === '' && cityRef?.current?.value === '' && phoneRef?.current?.value === '') {
            alert("Fill up all feild")
        }
        else {
            const shippingInfo = {};
            shippingInfo.name = nameRef?.current?.value;
            shippingInfo.email = emailRef?.current?.value;
            shippingInfo.address = addressRef?.current?.value;
            shippingInfo.city = cityRef?.current?.value;
            shippingInfo.phone = phoneRef?.current?.value;

            const savedCart = getStoredCart();
            shippingInfo.order = savedCart;

            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(shippingInfo),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        clearTheCart();
                        navigate('/placedorder')
                    }
                })
        }

        e.preventDefault();
    }

    return (
        <div className='parentForm'>
            <div className='parentForm2'>
                <form className='form' onSubmit={handleSubmitShipping}>
                    <input ref={nameRef} className='formStyle' type="text" placeholder="Full Name" /> <br />
                    <input ref={emailRef} className='formStyle' type="email" placeholder="Email" /> <br />
                    <input ref={addressRef} className='formStyle' type="text" placeholder="Address" /> <br />
                    <input ref={cityRef} className='formStyle' type="text" placeholder="City" /> <br />
                    <input ref={phoneRef} className='formStyle' type="text" placeholder="Phone Number" /> <br />
                    <input className='orderNowButton handleSubmitShipping' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
export default Shipping;
