import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, subscribeUser} from "../../../store/actions/users";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormField from "../formField/formField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '500px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AuthUserToolBar = () => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const inputChangeHandler = e => setSearch(e.target.value);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const imageLink = user.facebookId ? user.avatarImage : `http://localhost:8000/uploads/${user.avatarImage}`;

  const logout = async () => {
    await dispatch(logoutUser());
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(subscribeUser(search));
    setIsOpen(false);
  };

  return (
    <>
      <Button
        color='inherit'
        component={NavLink}
        to='/subscriptions'
      >
        Подписки
      </Button>
      <Button
        color='inherit'
        component={NavLink}
        to='/posts/new'
      >
        Добавить пост
      </Button>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt={user.displayName} src={imageLink}/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <ListItem disabled>Привет, {user.displayName}!</ListItem>
        <Divider/>
        <MenuItem component={NavLink} to='/profile' exact>Профиль</MenuItem>
        <MenuItem onClick={handleModalOpen}>Найти пользователя</MenuItem>
        <MenuItem onClick={logout}>Выйти</MenuItem>
      </Menu>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <form onSubmit={onSubmit}>
              <Typography variant='h5' paragraph>
                Подписатся
              </Typography>
              <Grid container alignItems='center' spacing={1}>
                <Grid item xs>
                  <FormField
                    label='Имя пользователя'
                    onChange={inputChangeHandler}
                    autoFocus
                    margin='none'
                  />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>Найти</Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default AuthUserToolBar;