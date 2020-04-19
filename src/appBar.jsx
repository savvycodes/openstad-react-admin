// in src/MyAppBar.js
import React from 'react';
import { AppBar, UserMenu, MenuItemLink } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { changeDisplayAppBar } from './configuration/actions';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    background : 'red'
});


  /*  */

const MyUserMenuOld = props => (
    <UserMenu {...props}>
    <MenuItemLink
          to="/configuration"
          primaryText="Configuration"
          leftIcon={<SettingsIcon />}
      />
    </UserMenu>
);

const MyUserMenu = props => (
    <div />
);


const MyAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} style={{backgroundColor: 'black', color: 'white'}} userMenu={<MyUserMenu />} >
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <h4>  </h4>
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default MyAppBar;
