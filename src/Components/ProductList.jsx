import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems); // Lấy các sản phẩm trong giỏ hàng từ Redux store
  const [disabledProducts, setDisabledProducts] = useState([]);

  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  useEffect(() => {
    const cartProductIds = cartItems.map(item => item.id); // khi item trong cart được update, lấy thông tin đó, lấy id và đưa vào disabled list
    setDisabledProducts(cartProductIds);
  }, [cartItems]); 

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product)); // Thêm sản phẩm vào giỏ hàng
  };

  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product => (
          <li key={product.id} className="product-list-item">
            <span>{product.name} - ${product.price}</span>
            <button
              className={`add-to-cart-btn ${disabledProducts.includes(product.id) ? "disabled" : ""}`}
              onClick={() => handleAddToCart(product)}
              disabled={disabledProducts.includes(product.id)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
