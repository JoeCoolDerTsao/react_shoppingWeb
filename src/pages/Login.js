import React /*, {Fragment}*/ from 'react';
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"; //參考：https://react-hook-form.com/get-started //驗證套件
import { useNavigate } from 'react-router-dom';

//因為新的react hook不支援class模式，改成下方函示
// class Login extends React.Component {

//   //  也可以用建構子去把this塞進去
//   // constructor(){ //構造這個class成為實例的時候會先執行這，也就是組建渲染之前都會執行
//   //   super();
//   //   this.handleClick = this.handleClick.bind(this);
//   // }

//   /** 事件
//    * 1.命名和綁定
//    * 2.event
//    * 3.this
//    * 4.傳遞參數
//    */

//   //msg = "Clicked";
//   ////handleClick = event=> { //event是默認的，所以下方默認(event)參數會被往後放
//   // handleClick = (msg, event)=> {
//   //   event.preventDefault();//防止<a>的href被執行
//   //   console.log(this,msg);
//   // }

//   handleSubmit = event => {
//     // 1. 阻止form表單事件行為
//     event.preventDefault();
//     // 2. 取得表單數據

//     // 3. 處理登入邏輯

//     // 4. 跳轉到首頁(可以從chrome debug component找到方法)
//     //this.props.history.push("/"); //react-router-dom v5方法
//     // let Navigate = useNavigate();
//     // Navigate('/');
//   }

//   render(){
//     return (
//     //JSX不能並列兩個DOM元素，如果要並列可以使用Fragment
//     // <Fragment>
//     //   <p>Login</p>
//     <div className="login-wrapper" onSubmit={this.handleSubmit}>
//       {/* 箭頭函數會自動綁定this，但是每次組建渲染都會生成handleClick，若有子組建會一直被渲染
//         <a href="/login" className="button" onClick={(event)=>this.handleClick(event)}>click me</a> 
//       */}
//       {/* <a href="/login" className="button" onClick={this.handleClick.bind(this, "clicked2")}>click me</a> */}

//       <form className="box login-box">
//         {/* JSX可以在大括號裡面編寫js*/} 
//         <div className="field">
//           <label className="label">Email</label>
//           <div className="control">
//             <input className="input" type="text" placeholder="Email"/>
//           </div>
//         </div>
//         <div className="field">
//           <label className="label">Password</label>
//           <div className="control">
//             <input className="input" type="text" placeholder="Password"/>
//           </div>
//         </div>
//         <div className="control">
//           <button className="button is-fullwidth is-primary">Login</button>
//         </div>
//       </form>
//     </div>
//     // </Fragment>
//     ); //JSX Babel Emmet

//     //Emmet:快速編寫html套件
//     //如 div.login>p  會變成 <div class='login'><p></p></div>
//     //ps:如果沒有的話要去設定，參考：https://blog.51cto.com/u_15127617/4361954

//     //return <p>Login Component</p> //JSX babel

//     //也可以用這個方法顯示，但是日後一多很難維護所以用上面的JSX直接顯示html
//     //return React.createElement('p', {className: 'login'}, 'Login Component');
//   }
// }


const NewLogin = function(props){
  const { register, handleSubmit, formState:{errors} } = useForm();

  let Navigate = useNavigate();

  //state
  // let state = {
  //   isLike: true
  // }
  let state = {
    email: '',
    password: ''
  }
  const [useState, setState] = React.useState(state);

  //ref，不能濫用(因為是對DOM做操作)，用useState來實現
  // let emailRef = React.createRef();
  // let psswordRef = React.createRef();

  let onSubmit = async data => {
    // useForm來處理，就不用自己避免
    // // 1. 阻止form表單事件行為
    // event.preventDefault();


    // 2. 取得表單數據
    // const formData = {
    //   email: emailRef.current.value,
    //   password: psswordRef.current.value
    // }
    //console.log(useState)
    //console.log(data)

    // console.log(formData)
    // 3. 處理登入邏輯
    try {
      const { email, password } = data;
      const res = await axios.post('/auth/login', { email, password });
      const jwToken = res.data;
      //console.log(jwToken);
      global.auth.setToken(jwToken); 
      toast.success('Logon Success');
      // 4. 跳轉到首頁(可以從chrome debug component找到方法)
      //this.props.history.push("/"); //react-router-dom v5方法
      Navigate('/');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message); 
    }


  }

  //console.log(errors)

  // let handleClick = ()=>{
  //   setState({isLike: !useState.isLike})
  // }

  let handledChange = e=>{
    //console.log(e.target.value);
    //class的setState會自動合併值，但是function component會直接覆蓋
    //所以使用展開運算子確保我們不會「漏掉」useState裡的key,
    //在object裡展開object，後面加的key若是重複則會覆蓋舊的key value
    setState({ 
      ...useState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-wrapper" onSubmit={handleSubmit(onSubmit)}>
      <form className="box login-box">
        {/* JSX可以在大括號裡面編寫js*/} 
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            {/* <input className="input" type="text" placeholder="Email" ref={emailRef}/> */}
            <input 
              className={`input ${errors.email && 'is-danger'}`}
              type="text" 
              name='email'
              placeholder="Email"
              {...register("email", {
                required: "Email is required",//也可以不給提示給boolean
                pattern: {
                  value: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                  message: 'Invalid Email' 
                }
              })}//由套件接管，新版方法
              // ref={register}//由套件接管，舊版方法
              // value={useState.email}
              // onChange={handledChange}
            />
            {
              errors.email && <p className="helper has-text-danger">{errors.email.message}</p>
            }
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            {/* <input className="input" type="text" placeholder="Password" ref={psswordRef}/> */}
            <input 
              className={`input ${errors.password && 'is-danger'}`}
              type="password" 
              name='password'
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: 'cannot be less than 6 digits' 
                }
              })}//由套件接管，新版方法
              // ref={register}//由套件接管，舊版方法
              // value={useState.password}
              // onChange={handledChange}
            />
            {
              errors.password && <p className="helper has-text-danger">{errors.password.message}</p>
            }
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>

        {/* <div className="control" onClick={handleClick}>
          <button className="button is-fullwidth is-link">
            {useState.isLike ? "yes" : "no"}
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default NewLogin;