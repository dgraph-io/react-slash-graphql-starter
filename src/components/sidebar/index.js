import React from "react";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import Logo from "../../assets/images/logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

export const SidebarItem = ({ key, label, icon: Icon, open, className, onClick, link, children = [] }) => {
  const classes = useStyles();
  return (
    <div key={key}>
      <ListItem button onClick={link ? () => window.location = link : onClick} className={className}>
        {Icon && <ListItemIcon>
          <Icon />
        </ListItemIcon>}
        <ListItemText primary={label} />
        {children.length > 0 ? (
          open ? (
            <ExpandLess />
          ) : (
              <ExpandMore />
            )
        ) : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, index) => React.cloneElement(child, {
            key: index,
            className: classes.nested,
          }))}
        </List>
      </Collapse>
    </div>
  );
}

export const Sidebar = ({children = [], mobileOpen, handleDrawerToggle}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = React.useState({});

  const handleClick = (key) => {
    setOpenSubmenu({ ...openSubmenu, [key]: !openSubmenu[key] });
  };

  const drawer = (
    <div>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <Divider />
      <List>
        {children.map((child, index) => React.cloneElement(child, {
          key: index,
          open: openSubmenu[index] || false,
          onClick: () => handleClick(index),
        }))}
      </List>
    </div>
  );

  return (
    <div>
      <div className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    </div>
  );
}
