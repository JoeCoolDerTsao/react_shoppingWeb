import React from 'react';
// import { useNavigate } from 'react-router-dom';//這裡不能導頁面，因為此頁面不是Router component下層

export default function UserProfile(props) {
  // const Navigate = useNavigate();//這裡不能導頁面，因為此頁面不是Router component下層

  const logout = () => {
    global.auth.logout();
    props.close('logout');
    // Navigate(0, {replace: true})//這裡不能導頁面，因為此頁面不是Router component下層
  }
  return (
    <div className="user-profile">
      <p className="title has-text-centered">profile</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">Nickname</label>
            <input type="text" className="input" defaultValue={props.user.nickname} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Email</label>
            <input type="text" className="input" defaultValue={props.user.email} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Type</label>
            <input type="text" className="input" defaultValue={props.user.type === 1 ? 'Manager' : 'General User'} />
          </div>
        </div>
      </fieldset>
      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" type='button' onClick={logout}>Logout</button>
        </div>
        <div className="control">
          {/**如果沒有給type會被默認提出form表單 */}
          <button className="button" type='button' onClick={()=>props.close()}>Cancel</button>
        </div>
      </div>
    </div>
  )
}