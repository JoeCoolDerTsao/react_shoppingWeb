import React from 'react';
//import ReactDOM from 'react-dom'; //react 17用法
import ReactDOM from 'react-dom/client' //react 18
import Router from 'Router';
import { ToastContainer } from 'react-toastify';//第三方通知套件：https://fkhadra.github.io/react-toastify/introduction
import 'react-toastify/dist/ReactToastify.css';
import 'css/app.scss';
import 'css/style.scss';
import 'commons/auth';

//ReactDOM.render(<Router />, document.getElementById("root")); //react 17用法
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    {/* 在全域這裡引用toast container 就可以在其他頁面用toast*/}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router />
  </div>
); //react 18
//參考：https://github.com/reactwg/react-18/discussions/5