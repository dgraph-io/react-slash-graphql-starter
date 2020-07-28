import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import Logo from "../../assets/images/logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  // necessary for content to be below app bar
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

export const Sidebar = ({children = []}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState({});

  const handleClick = (key) => {
    setOpenSubmenu({ ...openSubmenu, [key]: !openSubmenu[key] });
    // setOpen(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
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
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <div className={classes.drawer}>
        <Hidden smUp implementation="css">
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

        <Hidden xsDown implementation="css">
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
