import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import * as loginActions from '../../store/actions/loginActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  actions: {
    margin: '10px',
  },
  logout: { width: '10px', marginLeft: '10px' },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn ? (
            <>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                className={classes.logout}
                onClick={() => dispatch(loginActions.logOut())}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <MuiLink
                component={Link}
                to="/login"
                variant="h6"
                underline="none"
                className={classes.title}
              >
                NewBee
              </MuiLink>
              <MuiLink
                component={Link}
                to="/login"
                variant="button"
                underline="none"
                color="inherit"
                className={classes.actions}
              >
                Login
              </MuiLink>
              <MuiLink
                component={Link}
                to="/signup"
                variant="button"
                underline="none"
                color="inherit"
                className={classes.actions}
              >
                Sign Up
              </MuiLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
