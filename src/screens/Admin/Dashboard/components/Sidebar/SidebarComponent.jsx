import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AdminSlug from "../../../../../resources/AdminSlug";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import CategoryIcon from "@material-ui/icons/Category";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import "./sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: "0px !important",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    color: "black",
  },
}));

export default function SideBarComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [param, setParam] = React.useState("categoryManager");
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);

  const handleClickSlug = (param, url) => {
    history.push({
      pathname: url,
      search: `?q=${param}`,
    });
  };
  const handleClickSlugLibrary = (url) => {
    setParam(param);
    history.push({
      pathname: url,
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <List style={{ padding: "0px !important" }} className="sidebar">
      <ListItem button onClick={() => handleClick2()}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý danh mục" className={classes.title} />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={
              classes.nested + (param === "categoryManager" ? " active" : "")
            }
            onClick={() =>
              handleClickSlug("company", AdminSlug.categoryManager)
            }
          >
            <ListItemIcon>
              <EmojiTransportationIcon />
            </ListItemIcon>
            <ListItemText primary="Hãng xe" className={classes.title} />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param === "categoryManager" ? " active" : "")
            }
            onClick={() => handleClickSlug("car", AdminSlug.categoryManager)}
          >
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="Loại xe" className={classes.title} />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.serviceManager)}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý dịch vụ" className={classes.title} />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.serviceManager)}
      >
        <ListItemIcon>
          <DriveEtaIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" className={classes.title} />
      </ListItem>
    </List>
  );
}
