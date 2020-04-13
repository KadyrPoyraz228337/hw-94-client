import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormField from "../UI/formField/formField";
import {useDispatch, useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {editUser, initialUserSuccess} from "../../store/actions/users";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  button: {
    margin: '15px 0 0 0'
  }
});

const ProfileEdit = () => {
  const classes = useStyles();

  const user = useSelector(state => state.users.user);
  const error = useSelector(state => state.users.error);

  const initialState = {
    username: '',
    password: '',
    displayName: '',
    avatarImage: null
  };
  const [userInfo, setUser] = useState(initialState);
  const dispatch = useDispatch();

  const inputChangeHandler = e => setUser({...userInfo, [e.target.name]: e.target.value});
  const fileChangeHandler = e => setUser({...userInfo, [e.target.name]: e.target.files[0]});

  const onSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(userInfo).forEach(item => {
      data.append(item, userInfo[item])
    });

    dispatch(editUser(data));
  };

  useEffect(() => {
    dispatch(initialUserSuccess())
  }, [dispatch]);

  return (
    <Box py={2}>
      <Typography variant='h3' paragraph>
        Edit profile
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {!user.changed && <FormField
              type='text' required
              label='Имя пользователя'
              value={user.username}
              name='username'
              onChange={inputChangeHandler}
              margin='none'
            />}
          </Grid>
          {!user.facebookId && <Grid item xs={12}>
            <FormField
              type='password'
              label='Новый пароль'
              name='password'
              onChange={inputChangeHandler}
              margin='none'
            />
          </Grid>}
          <Grid item xs={12}>
            <FormField
              type='text' required
              label='Отображаемое имя'
              value={user.displayName}
              name='displayName'
              onChange={inputChangeHandler}
              margin='none'
            />
          </Grid>
          {!user.facebookId && <Grid item xs={12}>
            <FormField
              type='file' required
              label='Выберете аватар'
              name='avatar'
              onChange={fileChangeHandler}
            />
          </Grid>}
          {error && <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>}
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
            >
              ИЗМЕНИТЬ
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileEdit;