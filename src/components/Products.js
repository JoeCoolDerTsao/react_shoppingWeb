import React from 'react';
//參考：https://reactcommunity.org/react-transition-group/
import { CSSTransition, TransitionGroup } from 'react-transition-group'
//import axios from 'axios';
import axios from 'commons/axios';
import ToolBox from 'components/ToolBox';
import Prouduct from 'components/Product';
import Panel from 'components/Panel';
import Inventory from 'components/AddInventory';

//TODO:使用 function compnent跟hook來實現 componentDidMount


class Products extends React.Component {
  state = {
    products : [],
    sourceProducts: [],
    cartNum: 0
  };

  componentDidMount(){
    //js提供的方法
    // fetch("http://localhost:3003/products").then(response => response.json()).then(data=>{
    //   this.setState({products: data})
    // })

    //比較有彈性的方法，有自定義axios的instance
    axios.get("/products").then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      })
    })
    this.updateCartNum();
  }

  //不要寫成search (){} 因為this會沒有東西，箭頭函數會自動綁定this，參考：https://eyesofkids.gitbooks.io/react-basic-zh-tw/content/day06_es6_arrow_func/
  search = text => {
    //1.Get New Array
    let _products = [...this.state.sourceProducts];//這樣才是複製，不能 _products = this.state.products，因為變數會跟著改變
    //2. Filter New Array
    _products = _products.filter(p =>{
      const matchArray = p.name.match(new RegExp(text, "gi"));//g代表全局，i代表不分大小寫
      return !!matchArray; //如果是null or ''就回false，反之 
    })
    //3. Get State
    this.setState({
      products: _products
    })
  }

  toAdd = () => {
    Panel.open({
      component: Inventory,
      callback: data =>{
        if(data){
          this.add(data);
        }
      }
    });
  }

  add = product => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProduct = [...this.state.sourceProducts];
    _sProduct.push(product);

    this.setState({
      products: _products,
      sourceProducts: _sProduct
    });
  }

  update = product => {
    const _products = [...this.state.products];
    const _index = _products.findIndex(p => p.id === product.id);
    _products.splice(_index, 1, product);
    const _sProduct = [...this.state.sourceProducts];
    const _sIndex = _sProduct.findIndex(p => p.id === product.id);
    _sProduct.splice(_sIndex, 1, product);

    this.setState({
      products: _products,
      sourceProducts: _sProduct
    });
  }

  delete = id => {
    //透過filter回傳非刪除的id來達到刪除效果
    const _products = this.state.products.filter(p => p.id !== id);
    const _sProduct = this.state.sourceProducts.filter(p => p.id !== id);
    this.setState({
      products: _products,
      sourceProducts: _sProduct
    });
  }

  //如果遇到兄弟組建要溝通，往上找他們共同的父元件，比如Product跟toolBox的父元件就是products
  updateCartNum = async() => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum
    })
  }

  initCartNum = async() => {
    const user = global.auth.getUser() || {};
    if ( user && user.email ) {
      // const res = await axios.get(`/carts?userId=${user.email}`); //跟下方方法一樣
      const res = await axios.get('carts', {
        params: {
          userId: user.email
        }
      });
      const carts = res.data;
      const cartNum = carts.map(cart => cart.mount).reduce((pre, cur) => pre + cur, 0);
      return cartNum;
    } else return 0;
  }

  // renderManagerBtn = () => {
  //   const user = global.auth.getUser() || {};
  //   if ( user.type === 1){
  //     return (
  //       <button className="button is-primary add-btn" onClick={this.toAdd}>add</button>
  //     )
  //   }
  // }

  render(){
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum}/>
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {
                this.state.products.map(p => {
                  return (
                    //這個還是要搭配自己寫的css
                    <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                    <div className="column is-3" key={p.id}>
                      <Prouduct product={p} update={this.update} delete={this.delete} updateCartNum={this.updateCartNum}/>
                    </div>
                    </CSSTransition>
                  )
                })
              }
            </TransitionGroup>
          </div>
          {/* {this.renderManagerBtn()} 或者下面方法*/}
          {
            (global.auth.getUser() || {}).type === 1 && (
              <button className="button is-primary add-btn" onClick={this.toAdd}>add</button>
            )
          }
        </div>
      </div>
    )
  }
}

export default Products;