import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch(); // hàm để sử dụng phía dưới, gửi action properties tới store
  const cartItems = useSelector(state => state.cart.cartItems); // Lấy các sản phẩm trong giỏ hàng từ Redux store
  const [disabledProducts, setDisabledProducts] = useState([]); // Array chứa các sản phẩm sau khi add vô cart = được disable

  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  useEffect(() => {
    const cartProductIds = cartItems.map(item => item.id); // mỗi khi item trong cart thay đổi, useEffect sẽ update, lấy id items và đưa vào disabled list
    setDisabledProducts(cartProductIds);
  }, [cartItems]); 

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product)); // dùng dispatch để báo về store, sử dụng Reduce addItemToCard trong store
  };

  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product => ( // list ra các products
          <li key={product.id} className="product-list-item">
            <span>{product.name} - ${product.price}</span>
            <button
              className={`add-to-cart-btn ${disabledProducts.includes(product.id) ? "disabled" : ""}`} // default name là add-to-cart-btn, khi bị disabled sẽ có thêm chữ disabled
              onClick={() => handleAddToCart(product)} // gọi handleAddToCart
              disabled={disabledProducts.includes(product.id)}/* nếu có trong list disabledProduct, button sẽ bị disable */> 
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
