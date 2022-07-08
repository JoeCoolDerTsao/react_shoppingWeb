import React, { useState, useMemo } from "react";
import axios from "commons/axios";
import { formatPrice } from "commons/helper"

const CartItem = props => {
  const [ mount, setMount ] = useState( props.cart.mount );
  const { name, image, price, id } = props.cart || {};
  //為了不要因為非mount及price的值改變而重新渲染導致浪廢效能而使用useMemo
  //只有mount跟price改變才執行，是返回一個值(useCallback也有差不多效果，只是返回函式)
  const sumPrice = useMemo(() => {
    return formatPrice( mount * parseInt(price) );
  }, [mount, price])

  const handleChange = e => {
    const _mount = parseInt(e.target.value);
    setMount(_mount);
    //要同步更新server
    const newCart = {
      ...props.cart,
      mount: _mount
    }
    axios.put(`/carts/${id}`, newCart).then(res => {
      props.updateCart(res.data)
    })
  }

  const deleteCart = () => {
    axios.delete(`/carts/${id}`).then(res => {
      //因為被刪掉了，所以拿prop.cart告訴上層是刪了哪個
      props.deleteCart(props.cart);
    })
  }

  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close">X</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      <div className="column cart-name is-narrow">
        {name}
      </div>
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      <div className="column">
        {/* 如果使用value要搭配onChange等監聽，所以改成defaultValue */}
        {/* <input type="number" className="input num-input" defaultValue={mount} /> */}
        {/* 但因為點了要有交互的作用關係 所以配合hook的useState來實作*/}
        <input type="number" min={1} className="input num-input" value={mount} onChange={handleChange} />
      </div>
      <div className="column">
        <span className="sum-price">{sumPrice}</span>
      </div>
    </div>
  )
}

export default CartItem;