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
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllprohibited, deleteWord } from "./../../actions/users";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { toastAlert } from "../../lib/toastAlert";

// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }
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
const rows = [
  // getData('')
  //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
  //   createData('Donut', 452, 25.0, 51, 4.9),
];

const headCells = [
  { id: "word", numeric: false, disablePadding: true, label: "word" },
  { id: "accountType", numeric: true, disablePadding: false, label: "Action" },
];

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
//   EnhancedTableHead.propTypes = {
//       classes: PropTypes.object.isRequired,
//       numSelected: PropTypes.number.isRequired,
//       onRequestSort: PropTypes.func.isRequired,
//       onSelectAllClick: PropTypes.func.isRequired,
//       order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//       orderBy: PropTypes.string.isRequired,
//       rowCount: PropTypes.number.isRequired,
//   };

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
  const [order, setOrder] = React.useState("asc");

  const classesSearch = useToolbarStyles();
  const [data, setData] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userDetails, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  function editR(id) {
    console.log(window.location, "==============================");
    if (id != "") {
      window.location = "//prohibitededit/" + id;
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    console.log(
      "result=================dddddddddddddddddddddddddddddddddddd==",
      filterData
    );
    var res = await getAllprohibited(filterData);
    console.log("result===================", res);
    setUser(res.result.data);
    console.log("result of");
  };

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

  const handleDelete = async (iid) => {
    try {
      var data = {
        id: iid,
      };
      const res = await deleteWord(data);
      console.log(res, "================================");
      toastAlert("success", res.result.data.message, "currency");
      getAll();
    } catch (err) {}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            Prohibited
          </Typography>
          <div className={classes.flexHeader}>
            <Link to={"/prohibitedadd"} className={classes.btnPrimary}>
              Add Prohibited
            </Link>
          </div>
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
              {/* {userDetails && userDetails.map((row, index) => { */}
              {
                // stableSort(rows, getComparator(order, orderBy))

                stableSort(userDetails, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // const labelId = `enhanced-table-checkbox-${index}`;
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell align="center">{row.word}</TableCell>
                        <TableCell align="center">
                          <Link onClick={() => editR(row._id)}>
                            <EditIcon style={{ color: "#109ebf" }} />
                          </Link>
                          <Link onClick={() => handleDelete(row._id)}>
                            <DeleteIcon style={{ color: "#109ebf" }} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
