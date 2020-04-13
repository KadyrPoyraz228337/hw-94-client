import React from 'react';
import {NavLink} from 'react-router-dom'
import ToolBar from "../UI/toolBar/toolBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainLink: {
    color: 'inherit',
    flexGrow: 1,
    textDecoration: 'none',
    '&hover': {
      color: 'inherit'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));


const Navigation = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.mainLink} component={NavLink} to='/' exact>
              Моя социальная сеть
            </Typography>
            <ToolBar/>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navigation;