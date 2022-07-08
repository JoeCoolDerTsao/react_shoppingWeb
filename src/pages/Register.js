import React /*, {Fragment}*/ from 'react';
import axios from 'commons/axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"; //參考：https://react-hook-form.com/get-started //驗證套件
import { useNavigate } from 'react-router-dom';

const Register = function(props){
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
    try {
      const { nickname, email, password } = data;
      const res = await axios.post('/auth/register', { nickname, email, password, type: 0  });
      const jwToken = res.data;
      global.auth.setToken(jwToken); 
      toast.success('Register Success');
      Navigate('/');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message); 
    }
  }

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
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input 
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text" 
              name='nickname'
              placeholder="Nickname"
              {...register("nickname", {
                required: "nickname is required",//也可以不給提示給boolean 
              })}
            />
            {
              errors.nickname && <p className="helper has-text-danger">{errors.nickname.message}</p>
            }
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
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
              })}
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
          <button className="button is-fullwidth is-primary">Submit</button>
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

export default Register;