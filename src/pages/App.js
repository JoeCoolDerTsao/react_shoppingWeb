import React from 'react';
// import Header from 'components/Header'; //絕對路徑，要在jsconfig做配置，避免修改code考慮路徑還有編譯問題
import Layout from 'Layout';
import Products from 'components/Products';

class App extends React.Component {
  render(){
    return (
      <Layout>
        <Products />
      </Layout>
      // /* <Header nickname="Admin" age={33}/> *可以自定義屬性，把值傳到Header裡面 */
    )
  }
}

export default App;