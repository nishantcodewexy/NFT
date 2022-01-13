/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { quizink } from "react-router-dom";
import { useSelector } from "react-redux";
import lodash from "lodash";
import { Link } from "react-router-dom";
import one from "../../images/1.png";
import two from "../../images/2.png";
import three from "../../images/3.png";
import four from "../../images/4.png";
import five from "../../images/5.png";
import six from "../../images/6.png";
import seven from "../../images/7.png";
import eight from "../../images/8.png";
import Collapse from "@material-ui/core/Collapse";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon
} from "@material-ui/core";

import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";

// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import StarBorder from "@material-ui/icons/StarBorder";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { logout } from "../../actions/admin";
const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const [collapse, setCollapse] = useState("");

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  // redux-state
  const authData = useSelector((state) => state.auth);
  console.log(
    authData,
    "========================================authDatalogin"
  );

  /* const handleClick = (collapseId) => {
    if (collapseId == collapse) {
      setCollapse("");
      return;
    }
    setCollapse(collapseId);
  };
*/
  const logoutadmin = (e) => {
    logout(history);
  };

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list + " main_menu"}>
      <ListItem button component={Link} to="/admin-list">
        <ListItemIcon>
          <img src={one} />
        </ListItemIcon>
        <ListItemText
          primary="관리자 관리"
          disableTypography={true}
          style={{ color: "#fff" }}
        />
        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      <ListItem button component={Link} to="/userList">
        <ListItemIcon>
          <img src={two} />
        </ListItemIcon>

        <ListItemText
          primary="회원관리"
          disableTypography={true}
          style={{ color: "#fff" }}
        />
        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      <ListItem
        button
        onClick={handleClick}
        //</List>component={Link} to="/nft-management"
      >
        <ListItemIcon>
          <img src={three} />
        </ListItemIcon>
        <ListItemText
          primary="NFT 관리"
          disableTypography={true}
          style={{ color: "#fff" }}
        />

        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button component={Link} to="/nft-management">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="NFT 목록" style={{ color: "#fff" }} />
          </ListItem>
          <ListItem button component={Link} to="/nft-transaction">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="NFT 거래내역" style={{ color: "#fff" }} />
          </ListItem>
          <ListItem button component={Link} to="/nft-categories">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText
              primary="NFT 카테고리 목록"
              style={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/nft-settings">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="NFT 설정" style={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={handleClick3}
        //</List>component={Link} to="/nft-management"
      >
        <ListItemIcon>
          <img src={four} />
        </ListItemIcon>
        <ListItemText
          primary="Service Center Management"
          disableTypography={true}
          style={{ color: "#fff" }}
        />

        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button component={Link} to="/notice-list">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="Notice" style={{ color: "#fff" }} />
          </ListItem>
          <ListItem button component={Link} to="/frequent-list">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="FAQ" style={{ color: "#fff" }} />
          </ListItem>
          <ListItem button component={Link} to="/question-list">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText primary="1:1 inquiry" style={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button component={Link} to="/personal-terms">
        <ListItemIcon>
          <img src={five} />
        </ListItemIcon>
        <ListItemText
          primary="약관 및 방침 관리"
          disableTypography={true}
          style={{ color: "#fff" }}
        />

        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      <ListItem button component={Link} to="/popular">
        <ListItemIcon>
          <img src={eight} />
        </ListItemIcon>
        <ListItemText
          primary="사이트 관리"
          disableTypography={true}
          style={{ color: "#fff" }}
        />
        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      <ListItem
        button
        onClick={handleClick2}
        //</List>component={Link} to="/nft-management"
      >
        <ListItemIcon>
          <img src={three} />
        </ListItemIcon>
        <ListItemText
          primary="Site management"
          disableTypography={true}
          style={{ color: "#fff" }}
        />

        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem button component={Link} to="/popular">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText
              primary="Popular Creator List"
              style={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/expose">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText
              primary="Main page exposed NFT list"
              style={{ color: "#fff" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/world-filter">
            <ListItemIcon style={{ color: "#fff" }}>
              <FiberManualRecordRoundedIcon style={{ fontSize: "small" }} />
            </ListItemIcon>
            <ListItemText
              primary="word filtering list"
              style={{ color: "#fff" }}
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button component={Link} to="/profile">
        <ListItemIcon>
          <img src={seven} />
        </ListItemIcon>
        <ListItemText
          primary="내 프로필"
          disableTypography={true}
          style={{ color: "#fff" }}
        />
        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      <ListItem button onClick={logoutadmin}>
        <ListItemIcon>
          <img src={six} />
        </ListItemIcon>
        <ListItemText
          primary="로그아웃"
          disableTypography={true}
          style={{ color: "#fff" }}
        />
        <i style={{ color: "white" }} class="fas fa-chevron-right"></i>
      </ListItem>

      {/*
        routes.map((prop, key) => {
          var listItemClasses;

          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });

          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.path)
          });
          let data=0

         if (prop.isSideMenu) {
            if (prop.type == "multi") {
              let checkValue = false;
              if (authData && authData.isAuth == true) {
                if (authData.role != 'superadmin' && authData.restriction && authData.restriction.length > 0) {
                   data = lodash.intersectionBy(authData.restriction, prop.child, 'path');
                  if (data && data.length > 0) {
                    checkValue = true;
                    console.log(authData,data,"=====================================ininininin1")
                  }
                  console.log(authData,data,"=====================================ininininin2")
                } else if (authData.role == 'superadmin') {
                  checkValue = true;
                }
                console.log(authData,"=======================================inininin3")
              }

             if (checkValue) {
                return (
                  <>
                    <quizink
                      to={prop.path}
                      className={classes.item}
                      activeClassName="active"
                      key={key}
                    >
                      <ListItem button onClick={() => handleClick(prop.id)}>
                        {
                          typeof prop.icon === "string" ? (
                            <Icon
                              className={classNames(classes.itemIcon, whiteFontClasses)}
                            >
                              {prop.icon}
                            </Icon>
                          ) : (
                              <prop.icon
                                className={classNames(classes.itemIcon, whiteFontClasses)}
                              />
                            )
                        }

                        <ListItemText
                          primary={prop.name}
                          className={classNames(classes.itemText, whiteFontClasses)}
                          disableTypography={true}
                        />
                        {
                          collapse == prop.id ? <ExpandLess /> : <ExpandMore />
                        }

                      </ListItem>
                    </quizink>
                    <Collapse in={collapse == prop.id} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {
                          prop.child.map((el, id) => {
                            if(el.visible==true){
                            const whiteFontClasses = classNames({
                              [" " + classes.whiteFont]: activeRoute(el.path)
                            });

                            let listSubItemClasses;
                            listSubItemClasses = classNames({
                              [" " + classes[color]]: activeRoute(el.path)
                            });
                            let check = true;
                            if (authData && authData.isAuth == true) {
                              if (authData.role != 'superadmin' && authData.restriction && authData.restriction.length > 0) {
                                let data = authData.restriction.find((value => value.path == el.path))
                                if (data) {
                                  check = true;
                                }
                              } else if (authData.role == 'superadmin') {
                                check = true;
                              }
                            }

                            if (check) {
                              return (
                                <quizink
                                  to={el.path}
                                  className={classes.item}
                                  key={id}
                                >
                                  <ListItem
                                    button
                                    className={classes.itemLink + listSubItemClasses}
                                  // className={classes.itemLink + classes.nested + listItemClasses + " sub_menu_items"}
                                  >

                                    {
                                      typeof el.icon === "string" ? (
                                        <Icon
                                          className={classNames(classes.itemIcon, whiteFontClasses)}
                                        >
                                          {el.icon}
                                        </Icon>
                                      ) : (
                                          <el.icon
                                            className={classNames(classes.itemIcon, whiteFontClasses)}
                                          />
                                        )
                                    }

                                    <ListItemText
                                      primary={el.name}
                                      className={classNames(classes.itemText, whiteFontClasses)}
                                      disableTypography={true}
                                    />
                                  </ListItem>
                                </quizink>
                              )
                            }
                           }
                          })
                        }
                      </List>
                    </Collapse>
                  </>
                  )
              }
            } else {
              let check = false;
              if (authData && authData.isAuth == true) {
                if (authData.role != 'superadmin' && authData.restriction && authData.restriction.length > 0) {
                  let data = authData.restriction.find((value => value.path == prop.path))
                  if (data) {
                    check = true;
                  }
                } else if (authData.role == 'superadmin') {
                  check = true;
                }
              }

              if (check) {
                return (
                  <quizink
                    to={prop.path}
                    className={classes.item}
                    activeClassName="active"
                    key={key}
                  >
                    <ListItem button className={classes.itemLink + listItemClasses}>
                      {typeof prop.icon === "string" ? (
                        <Icon
                          className={classNames(classes.itemIcon, whiteFontClasses, {
                            [classes.itemIconRTL]: props.rtlActive
                          })}
                        >
                          {prop.icon}
                        </Icon>
                      ) : (
                          <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive
                            })}
                          />
                        )}
                      <ListItemText
                        primary={props.rtlActive ? prop.rtlName : prop.name}
                        className={classNames(classes.itemText, whiteFontClasses, {

                          [classes.itemTextRTL]: props.rtlActive
                        })}

                        disableTypography={true}
                      />
                    </ListItem>


                  </quizink>
                );
              }
            }
          }
        })*/}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/editprofile"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        // target="_blank"
      >
        <div className={classes.logoImage}>
          {
            //<img src={logo} alt="logo" className={classes.img} />
          }
          <h1> Logo </h1>
        </div>
        {/* {logoText} */}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ background: "#36373B" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ background: "#36373B" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
