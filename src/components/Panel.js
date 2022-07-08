/**
 * 1.一次渲染，隨時想要可以調用
 * 2.裝載組件
 *  (1)子組建做為參數傳遞子組建做為參數傳遞並被渲染
 *  (2)子組件可以關閉彈出層
 *  (3)子組件與調用者可以通訊
 */

import React from "react";
import { render } from 'react-dom' //react 17
//import ReactDOM from 'react-dom/client' //react 18

////原本要用function component來實作，但是function component對於render不會返回instance所以用class component
// const Panel = (props) => {
//   let state = {
//     active: true
//   };
//   const [useState, setState] = React.useState(state);
//   let _class = {
//     true: "panel-wrapper active",
//     false: "panel-wrapper"
//   };

//   const open = () => {
//     setState({active: true})
//   }

//   const close = () => {
//     setState({active: false})
//   }

//   if(props && props.isOpen){
//     open();
//   }

//   return (
//     <div className={_class[useState.active]}>
//       <div className="over-layer" onClick={close}></div>
//       <div className="panel">
//         <div className="head">
//           <span className="close" onClick={close}>x</span>
//           <p className="has-text-centered">
//             Children Component
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


class Panel extends React.Component {
  state = {
    active: false,
    component: null,
    callback: ()=>{}
  }
  open = (options = {
    props: {},
    component: null,
    callback: ()=>{}
  }) => {
    const { props, component, callback } = options;
    let _key = new Date().getTime(); //為了要強制重新渲染子組建(等於清空上次輸入的資料)，而每次給不同的key
    //接收到的component是構造函數所以要轉換成可渲染的組件
    //並且第二個參數是可以定義要傳遞的屬性
    const _component = React.createElement(component, { 
      ...props,
      close: this.close, 
      key: _key 
    });
    this.setState({
      active: true,
      component: _component,
      callback: callback
    })
  }
  close = data => {
    if(data) this.state.callback(data);
    this.setState({active: false});
  }
  render() {
    const _class = {
      true: "panel-wrapper active",
      false: "panel-wrapper"
    };
    return (
      <div className={_class[this.state.active]}>
        <div className="over-layer" onClick={()=>this.close()}></div>
        <div className="panel">
          <div className="head">
            <span className="close" onClick={()=>this.close()}>x</span>
          </div>
          {this.state.component}
        </div>
      </div>
    )
  }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

//這裡還是套用react17的render方法，這樣才會返回instnace，不過console會一直有警告，找時間TODO:用react18完成
const _panel = render(<Panel />, _div); //直接new出實例把Panel放到_div
//ReactDOM.createRoot(_div).render(<Panel />); //若有其他頁面import就會直接render
export default _panel;