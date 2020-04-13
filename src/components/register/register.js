import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initialUserSuccess, registerUser} from "../../store/actions/users";
import FacebookLoginButton from "../FacebookLogin/FacebookLogin";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import FormField from "../UI/formField/formField";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';

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

const Register = () => {
  const initialState = {
    username: '',
    password: '',
    displayName: '',
    avatarImage: null
  };
  const [userInfo, setUser] = useState(initialState);
  const error = useSelector(state => state.users.error);
  const dispatch = useDispatch();

  const inputChangeHandler = e => setUser({...userInfo, [e.target.name]: e.target.value});
  const fileChangeHandler = e => setUser({...userInfo, [e.target.name]: e.target.files[0]});

  const onSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(userInfo).forEach(item => {
      data.append(item, userInfo[item])
    });

    await dispatch(registerUser(data))
  };

  const classes = useStyles();

  useEffect(() => {
    dispatch(initialUserSuccess())
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Зарегестрироватся
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <FormField
            required
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={inputChangeHandler}
          />
          <FormField
            required
            id="displayName"
            label="Отображаемое имя"
            name="displayName"
            onChange={inputChangeHandler}
          />
          <FormField
            required
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={inputChangeHandler}
          />
          <FormField
            type='file'
            onChange={fileChangeHandler}
            name='avatarImage'
            label='Загрузить аватар'
          />
          {error && <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            endIcon={<AddIcon/>}
          >
            Зарегестрироватся
          </Button>
        </form>
        <FacebookLoginButton/>
      </div>
    </Container>
  );
};

export default Register;