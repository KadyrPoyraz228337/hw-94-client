import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: '0 auto'
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '100px',
    border: '#000'
  },
  avatar: {
    height: '100%'
  }
});

const Profile = () => {
  const classes = useStyles();

  const user = useSelector(state => state.users.user);

  const imageLink = user.facebookId ? user.avatarImage : `http://localhost:8000/uploads/${user.avatarImage}`;

  return user && (
    <Box m={2}>
      <Paper>
        <Box p={2}>
          <Grid container xs={6} direction='column' className={classes.root}>
            <Grid item container xs={12} alignItems='center' justify='center'>
              <Grid item>
                <Box className={classes.avatarWrapper}>
                  <img src={imageLink} alt="avatar" className={classes.avatar} />
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={1} alignItems='center' justify='center' xs>
                <Grid item xs>
                  <Typography variant='h6' display='inline' style={{marginRight: '10px'}}>
                    Имя пользователя:
                  </Typography>
                  <Typography variant='h5' display='inline'>
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6' display='inline' style={{marginRight: '10px'}}>
                    Отображаемое имя:
                  </Typography>
                  <Typography variant='h5' display='inline'>
                    {user.displayName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container justify='center' xs={12}>
              <Button
                variant='contained'
                color='primary'
                component={NavLink}
                to='/profile/edit'
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;