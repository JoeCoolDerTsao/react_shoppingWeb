import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Panel from 'components/Panel'
import UserProfile from 'components/UserProfile';

//函式元件化
// const Header = (props)=> (
//   <div className="header">
//     <div className="grid">
//       <div className="start">
//         <a href="/">Home</a>
//       </div>
//       <div className="end">
//         {props.nickname ? (
//           <span className="nickname">
//             <i className="far fa-user"></i>
//             {props.nickname}
//           </span> 
//         ) : (
//           <React.Fragment>
//             <a href="/">Login</a>
//             <a href="/">Register</a>
//           </React.Fragment>
//         )}
//       </div>
//     </div>
//   </div>
// );



////要在class component使用hook 就要寫一個function來包住class component，再把hook傳進去使用
////參考：https://stackoverflow.com/questions/53371356/how-can-i-use-react-hooks-in-react-classic-class-component
function withMyHook(Component) {
  return function WrappedComponent(props) {
    const Navigate = useNavigate();
    return <Component {...props} Navigate={Navigate} />;
  }
}

class Header extends React.Component {
  
  toProfile = e => { //要寫這樣this才會自動綁定
    const user = this.props.user;
    Panel.open({
      component: UserProfile,
      props: {
        user
      },
      callback: data => {
        if( data === "logout" ) {
          this.props.Navigate(0, {replace: true})//參考：https://www.cnblogs.com/pangqianjin/p/15727537.html
        }
      }
    })
  }

  renderLink(){
    const nickname = this.props.user.nickname;
    if( nickname ) {
      return (
        <span className="nickname" onClick={this.toProfile}>
          <i className="far fa-user"></i>
          {this.props.user.nickname}
        </span> /**可以接到屬性傳來的值顯示出來 */
      ) 
    } else {
      return (
        <React.Fragment>
          {/* 也可以用a，但還是用react的方法
          <a href="/login">Login</a>
          <a href="/register">Register</a> */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </React.Fragment>
      )
    }
  }
  render(){
    return (
      <div className="header">
        <div className="grid">
          <div className="start">
            <Link to="/">Home</Link>
          </div>
          <div className="end">
            {this.renderLink()}
          </div>
        </div>
      </div>
    )
  }
}

export default withMyHook(Header);