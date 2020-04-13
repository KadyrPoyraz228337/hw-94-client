import React from 'react';
import {useSelector} from "react-redux";
import AuthUserToolBar from "./authUserToolBar";
import NoAuthUserToolBar from "./noAuthUserToolBar";

const ToolBar = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      {/*<Button color='inherit' component={NavLink} to='/' exact>Artists</Button>*/}
      {user && <AuthUserToolBar/>}
      {!user && <NoAuthUserToolBar/>}
    </>
  );
};

export default ToolBar;