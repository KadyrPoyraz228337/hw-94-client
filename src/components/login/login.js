import React, {useEffect, useState} from 'react';
import FormField from "../UI/formField/formField";
import {useDispatch, useSelector} from "react-redux";
import {initialUserSuccess, loginUser} from "../../store/actions/users";
import FacebookLoginButton from "../FacebookLogin/FacebookLogin";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
    margin: '100px 0 0 0',
  },
}));

const Login = () => {

  const classes = useStyles();

  const initialState = {
    username: '',
    password: ''
  };

  const [userInfo, setUser] = useState(initialState);
  const error = useSelector(state => state.users.error);

  const dispatch = useDispatch();

  const inputChangeHandler = e => setUser({...userInfo, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(loginUser(userInfo))
  };

  useEffect(() => {
    dispatch(initialUserSuccess())
  }, [dispatch]);

  return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Логин
          </Typography>
          <form onSubmit={onSubmit}>
            <FormField
              type='text'
              label='Имя пользователя'
              autoComplete='username'
              name='username'
              autoFocus
              value={userInfo.username}
              onChange={inputChangeHandler}
            />
            <FormField
              type='password'
              label='Пароль'
              name='password'
              value={userInfo.password}
              onChange={inputChangeHandler}
            />
            {error && <Alert color="danger">
              {error}
            </Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
            </Button>
          </form>
          <FacebookLoginButton/>
        </div>
      </Container>
  );
};

export default Login;