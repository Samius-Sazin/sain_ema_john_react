import React from 'react'
import UseCart from '../../hooks/UseCart';
import Cart from '../Cart/Cart';
import ShowCartProducts from '../ShowCartProducts/ShowCartProducts';
import { removeFromDb } from '../utilities/fakedb';
import { useNavigate } from 'react-router-dom';

function OrderReview() {
    //get value from local storage, Here LS = Local Storage
    const [cart, setCart] = UseCart();

    const navigate = useNavigate();

    const handleRemoveButton = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    const handleConfirmOrderBtn = () => {
        navigate('/shipping');
        // setCart([]);
        // clearTheCart();
    }

    return (
        <div className='ShopContainer'>
            <div className='ProductsContainer'>
                {
                    cart.map(cartProduct => <ShowCartProducts
                        key={cartProduct.key}
                        product={cartProduct}
                        handleRemoveButton={handleRemoveButton}
                    />)
                }
            </div>

            <div className='CartContainer'>
                <Cart cart={cart}>
                    <button
                        onClick={handleConfirmOrderBtn}
                        className='orderNowButton'
                    >Confirm Order</button>
                </Cart>
            </div>
        </div>
    )
}

export default OrderReview
