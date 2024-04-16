import { useEffect, useState } from "react"
import { getStoredCart } from "../Component/utilities/fakedb";

//get value from local storage, Here LS = Local Storage
const UseCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCartData = getStoredCart();
        const savedCartKeys = Object.keys(savedCartData);
        fetch('http://localhost:5000/products/byKeys', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(savedCartKeys)
        })
            .then(res => res.json())
            .then(products => {
                if (products.length) {
                    const cartProducts = [];

                    for (const LSkey in savedCartData) {
                        const searchedItemFromLS = products.find(product => product.key === LSkey);

                        if (searchedItemFromLS) {
                            searchedItemFromLS.quantity = savedCartData[LSkey];
                            cartProducts.push(searchedItemFromLS);
                        }
                    }
                    setCart(cartProducts);
                }
            })
    }, [])

    return [cart, setCart];
}

export default UseCart;