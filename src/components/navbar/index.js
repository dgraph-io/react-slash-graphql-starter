import React, { useState } from "react";

import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";

import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import clsx from "clsx";
import useStyles from "./navbar.style";

export function NavbarItem({type, href, onClick, text, iconName, width, height}) {
  return type === "text" ? (
    <a
      href={href}
      onClick={onClick}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Typography variant="h4">{text}</Typography>
    </a>
  ) : (
      <div onClick={onClick}>
        <img
          src={require(`../../assets/images/${iconName}`)}
          alt="icon"
          width={width}
          height={height}
        />
      </div>
    )
}

export function Navbar({title, searchBar, children = [], color = "primary", handleDrawerToggle}) {
  const classes = useStyles();
  const [closeBtn, setCloseBtn] = useState(false);

  const getSearchBar = (view) => {
    return searchBar ? (
      <div className={view === "web" ? classes.search : classes.searchToggle}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={searchBar.placeholder}
          onChange={searchBar.onChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    ) : null;
  };

  const getNavRightItems = (view) => {
    return children.map((item, index) => {
      return (
        <div
          className={view === "web" ? classes.ml2 : null}
          style={{ cursor: "pointer" }}
          key={index}
        >
          {item}
        </div>
      );
    });
  };

  return (
    <AppBar position="fixed" className={clsx(classes.appBar, classes.appBarShift)} color={color}>
      <div className={classes.nav} >
        <div className={classes.navLeft}>
          <div className={classes.toggleBtn} onClick={handleDrawerToggle} >
            <IconButton color="inherit">
              {!closeBtn ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          </div>
          <Typography variant="h6">{title}</Typography>
          {getSearchBar("web")}
        </div>

        <div className={classes.navRight}>{getNavRightItems("web")}</div>


      </div>
      {closeBtn ? (
        <div className={classes.navLinks}>
          {searchBar ? (
            <div>
              {getSearchBar()}
              <br />
            </div>
          ) : null}
          {getNavRightItems()}
        </div>
      ) : null}
    </AppBar>
  );
}
