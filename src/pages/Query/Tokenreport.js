import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  gettokenreportlist,
  getAllcategory,
  deletecategory,
} from "./../../actions/users";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { toastAlert } from "../../lib/toastAlert";
import CardHeader from "components/Card/CardHeader.js";
import * as moment from "moment";
import config from "../../actions/config";

// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }

const rows = [
  // getData('')
  //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
  //   createData('Donut', 452, 25.0, 51, 4.9),
];

const headCells = [
  { id: "Address", numeric: false, disablePadding: true, label: "Address" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "message", numeric: true, disablePadding: false, label: "Message" },
  {
    id: "Reported On",
    numeric: true,
    disablePadding: false,
    label: "Reported On",
  },
  { id: "Link", numeric: true, disablePadding: false, label: "Link" },
  { id: "Action", numeric: true, disablePadding: false, label: "Action" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 76%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    ></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onChangeterm: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const customStyle = makeStyles(customInputStyle);

export default function EnhancedTable() {
  const classes = useStyles();
  const customStyles = customStyle();

  const classesSearch = useToolbarStyles();
  const [data, setData] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userDetails, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [order, setOrder] = React.useState("asc");

  function editR(id) {
    if (id != "") {
      window.location = "//replymail/" + id;
    }
  }
  function lock() {}
  const handleChange = (event) => {
    const { name, value } = event.target;
    const self = this;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setSearchQuery(value);
    setTypingTimeout(
      setTimeout(function () {
        getAll({ search: value });
      }, 1000)
    );
  };

  const handleRequestSort = (event, property) => {};

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async (search = {}) => {
    let filterData = search;
    if (filterData.search == "") {
      filterData = {};
    }
    var test = await gettokenreportlist();
    console.log("testtitnsss", test);
    setUser(test.result);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    console.log(array, "array");
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  async function showdetail(iiid, repid) {
    window.location = "//tokenreportdetail/" + iiid + "/" + repid;
  }

  const handleDelete = async (iid) => {
    try {
      var data = {
        id: iid,
      };
      const res = await deletecategory(data);
      console.log(res, "================================");
      toastAlert("success", res.result.data.message, "currency");
      getAll();
    } catch (err) {}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  EnhancedTable.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar
          className={clsx(classesSearch.root, {
            [classesSearch.highlight]: selected.length > 0,
          })}
        >
          <Typography
            className={classesSearch.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Reports
          </Typography>
          {/* <div className={classes.flexHeader}>
                            <Link to={'/addcategory'} className={classes.btnPrimary}>Add Category</Link>
                        </div> */}
        </Toolbar>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              //   order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(userDetails, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">
                        <p className="address_wrap_cont">
                          {row.report.address}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        {row.userinfo && row.userinfo.email
                          ? row.userinfo.email
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        <p className="text_over_fl">
                          {ReactHtmlParser(row.report.message)}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="address_wrap_cont">{row.toadd}</p>
                      </TableCell>
                      <TableCell align="center">
                        <a
                          href={config.frontUrl + "info/" + row.id}
                          target="_blank"
                        >
                          Link
                        </a>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Link
                          onClick={() => showdetail(row.id, row.report._id)}
                        >
                          <VisibilityIcon style={{ color: "#109ebf" }} />
                        </Link>
                        {row.userinfo &&
                          row.userinfo.email &&
                          row.userinfo.email != "" && (
                            <Link onClick={() => editR(row.userinfo.email)}>
                              <EditIcon style={{ color: "#109ebf" }} />
                            </Link>
                          )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userDetails && userDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
