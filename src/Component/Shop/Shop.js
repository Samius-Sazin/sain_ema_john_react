import React, { useEffect, useState } from 'react';
import './Shop.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../utilities/fakedb';
import { Link } from 'react-router-dom';
import UseCart from '../../hooks/UseCart';

function Shop() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = UseCart();
  const [displaySearchedItem, setDisplaySearchedItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const itemPerPage = 10;

  useEffect(() => {
    // fetch('./products.json')
    fetch(`http://localhost:5000/products?page=${page}&&size=${itemPerPage}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setDisplaySearchedItem(data.products);

        const count = data.count;
        const pageNumber = Math.ceil(count / itemPerPage);
        setPageCount(pageNumber);
      });
  }, [page])

  const handleAddCartButton = (product) => {
    const exists = cart.find(prdct => prdct.key === product.key)

    let updateCart = [];
    if (exists) {
      const rest = cart.filter(prdct => prdct.key !== product.key);
      exists.quantity = exists.quantity + 1;
      updateCart = [...rest, product];
    }
    else {
      product.quantity = 1;
      updateCart = [...cart, product];
    }

    setCart(updateCart);

    //save to local storage
    addToDb(product.key);
  }

  //Search box, SB = search Box
  const showSearchedItem = (e) => {
    const searchedItemFromSB = products.filter(product => (product.name).toLowerCase().includes((e.target.value).toLowerCase()));
    setDisplaySearchedItem(searchedItemFromSB);
  }

  return (
    <>
      <div className='InputArea'>
        <input
          onChange={showSearchedItem}
          className='searchBox'
          type='text'
          placeholder='Search here'
        >
        </input>
      </div>

      <div className='ShopContainer'>
        <div>
          <div className='ProductsContainer'>
            {
              displaySearchedItem.map(product =>
                <Products
                  key={product.key}
                  product={product}
                  handleAddCartButton={handleAddCartButton}
                />)
            }
          </div>

          <div className='pagination'>
            {
              [...Array(pageCount).keys()]
                .map(index => <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={page === index ? 'selected' : ''}
                >{index}</button>)
            }
          </div>
        </div>

        <div className='CartContainer'>
          <Cart cart={cart}>
            <Link to='/review'>
              <button className='orderNowButton'>Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  )
}

export default Shop