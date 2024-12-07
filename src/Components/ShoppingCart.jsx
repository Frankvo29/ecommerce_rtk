import React from 'react';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from './CartSlice';

const ShoppingCart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  /*
  reduce() dùng để "thu gọn" thành 1 giá trị duy nhất
  array.reduce((accumulator, currentValue) => {}, initialValue);
    accumulator: Biến lưu giá trị tích lũy qua từng vòng lặp.
    currentValue: item đang được xử lý ở vòng lặp hiện tại
    0 = giá trị ban đầu
    Lần 1: item = { id: 1, price: 100, quantity: 2 }
    => total = 0 + 100 * 2 = 200.
    Lần 2: item = { id: 2, price: 50, quantity: 3 }
    => total = 200 + 50 * 3 = 350.
  */

  const handleRemoveItem = itemId => {
    dispatch(removeItemFromCart(itemId));
  }
  
  const handleClearCart = () => {
    dispatch(clearCart());
  }

  const handleIncreaseQuantity = itemId => {
    dispatch(increaseItemQuantity(itemId));
  }

  const handleDecreaseQuantity = itemId => {
    dispatch(decreaseItemQuantity(itemId));
  }

  return (
    <>
    <div className="shopping-cart">
      <h2 className="shopping-cart-title">Shopping Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} - ${item.price}</span>
            <div className="quantity-controls">
              <button className="quantity-control-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <span> &nbsp; {item.quantity} &nbsp; </span>
              <button className="quantity-control-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            </div>
            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
      <br></br>
      <br></br>
      <h4>{totalAmount ? <div>The total amount is: ${totalAmount}</div> : ''}</h4>
    </div>
  
    </>
  );
};

export default ShoppingCart;
