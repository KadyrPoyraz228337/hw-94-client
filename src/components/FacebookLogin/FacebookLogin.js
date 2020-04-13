import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../store/actions/users";
import Button from "@material-ui/core/Button";

const FacebookLoginButton = () => {
  const dispatch = useDispatch();

  return (
    <>
    <FacebookLogin
      appId="214862699931338"
      fields='name,picture'
      callback={e => {
        if(e.id) {
          console.log(e);
          dispatch(facebookLogin(e))
        }
      }}
      render={renderProps => (
        <Button onClick={renderProps.onClick} color="primary">Войти через facebook</Button>
      )}
    />
    </>
  )
};

export default FacebookLoginButton;