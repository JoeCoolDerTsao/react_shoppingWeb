import React from "react";
import Panel from "components/Panel";
import axios from "commons/axios";
import { toast } from "react-toastify"
import {formatPrice} from "commons/helper.js";
import EditInventory from "components/EditInventory";
import { useNavigate } from "react-router-dom";

const Product = (props)=>{
  const Navigate = useNavigate();

  let { id, name, image, tags, price, status } = props.product;
  let _pClass = {
    available: "product",
    unavailable: "product out-stock"
  }

  const toEdit = () => {
    Panel.open({
      props: {
        product: props.product,
        deleteProduct: props.delete
      },
      component: EditInventory,
      callback: data=> {
        //一般想法是拿到更新得值然後在這商品做更新，但是整體的傷平array並不會更新，所以要寫在products
        //而且react會根據你array裡面被改變的部分做重新渲染，不會整個array重新渲染
        props.update(data);
      }
    });
  }

  const addCart = async() => {
    if ( !global.auth.isLogin() ) {
      Navigate('/login');
      toast.info('please login');
      return;
    }
    try {
      const user = global.auth.getUser() || {};
      // const res = await axios.get(`/carts?productId=${id}`);
      const res = await axios.get(`/carts?userId=${user.email}&productId=${id}`);
      const carts = res.data;
      if(carts && carts.length > 0){
        const cart = carts[0];
        cart.mount ++;
        await axios.put(`/carts/${cart.id}`, cart)
      }else{
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
          userId: user.email
        }
        await axios.post('/carts', cart);
      }
      props.updateCartNum();
      toast.success('add cart success')
    } catch (error) {
      toast.error('add cart failed')
    }
  }

  const renderManagerBtn = () => {
    const user = global.auth.getUser() || {};
    if ( user.type === 1){
      return (
        <div className="p-head has-text-right" onClick={toEdit}>
          <span className="icon edit-btn">
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      )
    }
  }

  return (
    <div className={_pClass[status]}>
      <div className="p-content">
        {renderManagerBtn()}
        <div className="img-wrapper">
          <div className="out-stock-text">Out Of Stock</div>{/**會透過sass決定讓他要不要顯示  */}
          <figure className="image is-4by3">
            <img src={image} alt={name} />
          </figure>
        </div>
        <p className="p-tag">{tags}</p>
        <p className="p-name">{name}</p>
      </div>
      <div className="p-footer">
        <p className="price">{formatPrice(price)}</p>
        <button className="add-cart" disabled={status === 'unavailable'} onClick={addCart}>
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-exclamation"></i>
        </button>
      </div>
    </div>
  )
}

export default Product;