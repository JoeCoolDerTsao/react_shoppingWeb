import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from "pages/App";
import Login from "pages/Login";
import Cart from "pages/Cart";
import Register from "pages/Register";
import NotFound from "pages/NotFound";

/**
 * 特別註明一下，密叔的課程在react-router-dom是使用v5，但現在安裝是使用v6，所以有些改變
 * 原本Switch改成Routes， 在Route屬性component={App}改成element={<App />}，而且不用加exact了
 * 參考：https://ithelp.ithome.com.tw/articles/10282773
 * 沒有指定的路徑加上path="*"就可以
 */

const Router = ()=>(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />{/**沒有指定路徑都跑這 */}
    </Routes>
  </BrowserRouter>
);

export default Router;