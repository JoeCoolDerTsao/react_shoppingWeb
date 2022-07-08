import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ToolBox = (props) => {
  const Navigate = useNavigate();
  let state = {
    searchText: ''
  };
  const [ useState, setState ] = React.useState(state);

  let handleChange = e => {
    const value = e.target.value;
    setState({
      searchText: value
    })
    props.search(value);
  }

  let clearSearchText = () => {
    setState({
      searchText: ""
    })
    props.search("");
  }

  const goCart = () => {
    if ( !global.auth.isLogin() ) {
      Navigate('/login');
      toast.info('please login');
      return;
    }
    Navigate('/cart');
  }

  return (
    <div className="tool-box">
      <div className="logo-text">Store</div>
      <div className="search-box">
        <div className="field addons flexSearch">
          <div className="control">
            <input
              type="text"
              className="input search-input"
              placeholder="Search Product"
              value={useState.searchText}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <button className="button" onClick={clearSearchText}>x</button>
          </div>
        </div>
      </div>
      <div className="cart-box" onClick={goCart}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-num">({props.cartNum})</span>
      </div>
    </div>
  );
};

export default ToolBox;
