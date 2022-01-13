/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {
  ListItem,
  List,
  Menu,
  MenuList,
  MenuItem,
  Button,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
} from "@material-ui/core";

import { Link, NavLink } from "react-router-dom";
import { MoreVert, Settings } from "@material-ui/icons";

// const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  // const classes = useStyles();
  const classes = {};
  const [open, setOpen] = React.useState(false);
  const [currentList, setCurrentList] = React.useState("");
  const anchorRef = React.useRef(null);

  const handleToggle = (type) => {
    setOpen((prevOpen) => !prevOpen);
    setCurrentList(type);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="home_page_menu">
      <List className={classes.list + " main_navbar"}>
        <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">
            Exchange
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">
            Liquidity
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">
            Assets
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">
            Staking
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">
            Overview
          </NavLink>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Button className="auth_btn">
            <Link to="/" color="transparent" className="nav-link">
              Connect to Wallet
            </Link>
          </Button>
        </ListItem>
        <ListItem className={classes.listItem + " dropdown_link"}>
          <Link
            to="#"
            className="nav-link"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={() => handleToggle("open1")}
          >
            <Settings />
          </Link>
          <Popper
            open={currentList == "open1" ? true : false}
            /* anchorEl={anchorRef.current} */ role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={true}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/profile">Settigs</NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/profile">Settigs1</NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/profile">Settigs2</NavLink>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </ListItem>

        <ListItem className={classes.listItem + " dropdown_link"}>
          <Link
            to="#"
            className="nav-link"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVert />
          </Link>
          <Popper
            open={open}
            /* anchorEl={anchorRef.current} */ role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/profile">My Profile</NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/support">Support</NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/history">History</NavLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <NavLink to="/">Logout</NavLink>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </ListItem>

        {/* <ListItem className={classes.listItem}>
          <NavLink to="/" color="transparent" className="nav-link">Login</NavLink>
        </ListItem> */}
      </List>
    </div>
  );
}
