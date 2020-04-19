// in src/MyMenu.js
import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, useTranslate, Translate, ReduxState } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import DefaultIcon from '@material-ui/icons/ViewList';
import { useSelector, useDispatch } from 'react-redux';
import { changeDisplayAppBar } from './configuration/actions';

const styles = {
    root: {}, // Style applied to the MenuItem from material-ui
    active: { fontWeight: 'bold' }, // Style applied when the menu item is the active one
    icon: {}, // Style applied to the icon
};

const Menu = ({ classes, resources, onMenuClick, logout, dense, open }) => {
  const translate = useTranslate();
  const userResource = resources.find(resource => resource.name === 'user');

    return <div>
        {resources.map(resource => {
            if (!resource.options.hideMenulink) {
              return <MenuItemLink
                to={`/${resource.name}`}
                primaryText={resource.options.menuTitle ? resource.options.menuTitle : resource.name}
                leftIcon={
                    resource.icon ? <resource.icon /> : <DefaultIcon />
                }
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
          }
        })}
        {userResource ?
        <MenuItemLink
          classes={classes}
          to={userResource.options.userPath}
          primaryText="Mijn gegevens"
          leftIcon={<DefaultIcon />}
          onClick={onMenuClick}
        /> : <span />}
    </div>

};



const mapStateToProps = (state) => {
  console.log('=>>> state', state);

  return {
    resources: getResources(state),
  }
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Menu)));
