import React, {useEffect} from 'react';
import {fetchSubscriptions, unsubscribeFromUser} from "../../store/actions/users";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const Subscriptions = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const items = useSelector(state => state.users.subscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions())
  }, [dispatch]);

  return (
    <Box mt={2}>
      <Typography variant='h4' paragraph>
        Мои подписки
      </Typography>
      <Grid container spacing={2}>
        {items && items.length === 0 && <Typography variant='h6'>
          Здесь пока ничего нет
        </Typography>}
        {items && items.map(item => {
          return (
            <Grid item xs={3} key={item._id}>
              <Paper>
                <Box py={3} className={classes.root}>
                  <Avatar
                    src={item.facebookId ?
                      item.avatarImage :
                      `http://localhost:8000/uploads/${item.avatarImage}`}
                    className={classes.large}
                  />
                  <Typography variant='h6'>
                    {item.displayName}
                  </Typography>
                  <Box mt={1}>
                    <Button
                      variant='contained'
                      onClick={() => dispatch(unsubscribeFromUser(item.username))}
                    >Отписатся</Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
};

export default Subscriptions;