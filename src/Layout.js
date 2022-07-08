import React, { useMemo } from "react";
import Header from "components/Header";

const Layout = props => {
  
  const user = useMemo(() => {
    return global.auth.getUser() || {};
  }, [])

  return (
    <div className="main">
      <Header user={user}/>
      {props.children} {/**可以通過props.children把把要渲染的元件動態放進去 */}
    </div>
  )
}

export default Layout;