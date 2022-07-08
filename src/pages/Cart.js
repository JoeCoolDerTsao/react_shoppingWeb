import React, { useMemo } from "react";
import Layout from "Layout";
import axios from "commons/axios";
import { formatPrice } from "commons/helper";
import CartItem from "components/CartItem";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Cart = () => {
  const [ useState, setState ] = React.useState([]);

  //相當於class component裡面的render() 一開始執行或每次更新時執行
  //但是這邊setState之後會在觸發useEffect，會造成死迴圈，所以使用useEffect第二個參數，不依賴就不會更新
  React.useEffect(() => {
    const user = global.auth.getUser() || {};
    axios.get(`/carts?userId=${user.email}`).then(res => {
      setState(res.data);
    })
  }, [])

  const totalPrice = useMemo(() => {
    const totalPrice = useState
    .map(cart => cart.mount * parseInt(cart.price))
    .reduce((pre, cur) => pre + cur, 0);
    return formatPrice(totalPrice);
  }, [useState])

  const updateCart = cart => {
    const newCart = [...useState];
    const _index = newCart.findIndex(c => c.id === cart.id);
    newCart.splice(_index, 1, cart);
    setState(newCart);
  }

  const deleteCart = cart => {
    const newCart = useState.filter(f => f.id !== cart.id);
    setState(newCart);
  }

  return (
    <Layout>
    <div className="cart-page">
      <span className="cart-title">Shopping Cart</span>
      <div className="cart-list">
        <TransitionGroup component={null}>
        {
          useState.map(cart => (
            <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
              <CartItem key={cart.id} cart={cart} updateCart={updateCart} deleteCart={deleteCart} />
            </CSSTransition>
          ))
        }
        </TransitionGroup>
      </div>
      {
        useState.length === 0 ? <p className="no-cart">NO GOODS</p> : ""
      }
      <div className="cart-total">
        Total: 
        <span className="total-price">{totalPrice}</span>
      </div>
    </div>
  </Layout>
  )
}

export default Cart;