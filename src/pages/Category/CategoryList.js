import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { getAllcategory, deletecategory } from "./../../actions/users";
import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { toastAlert } from "../../lib/toastAlert";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";

// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }

const rows = [
  // getData('')
  //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
  //   createData('Donut', 452, 25.0, 51, 4.9),
];

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

const headCells = [
  { id: "category", numeric: false, disablePadding: true, label: "Category" },
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

// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

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
    if (id != "") {
      window.location = "/categoryedit/" + id;
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
    var res = await getAllcategory(filterData);
    console.log("result===================", res);
    //setUser(res.result.data);
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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>관리자 목록</div>

      <div>
        <div style={{ display: "flex", margin: "2% 0" }}>
          <div style={{ flex: "1" }}>
            <Button
              style={{ backgroundColor: "#5376FF" }}
              variant="contained"
              color="primary"
            >
              등록
            </Button>
          </div>
          <div style={{ flex: "8" }}></div>
        </div>

        <div
          className="align-items-center"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div style={{ flex: "7", margin: "0 10px" }}></div>
          <div style={{ margin: "0 10px", color: "#000", fontWeight: "700" }}>
            등록일 기간 검색
          </div>
          <div style={{ margin: "0 0 0 10px" }}>
            <TextField
              variant="outlined"
              id="date"
              type="date"
              label="시작일"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div
            style={{
              backgroundColor: "#A9ABB0",
              width: "55px",
              height: "55px",
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            ~
          </div>
          <div>
            <TextField
              variant="outlined"
              id="date"
              type="date"
              label="종료일"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div
          className="align-items-center mt-2"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div style={{ flex: "6" }}></div>
          <div style={{ flex: "5", color: "#000", fontWeight: "700" }}>
            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              style={{ width: "150px", margin: "0 5px" }}
            >
              <MenuItem>=상태=</MenuItem>
              <MenuItem>활성</MenuItem>
              <MenuItem>비활성</MenuItem>
            </TextField>

            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              style={{ width: "150px" }}
            >
              <MenuItem>=검색옵션=</MenuItem>
              <MenuItem>아이디</MenuItem>
              <MenuItem>이름</MenuItem>
            </TextField>
          </div>
          <div style={{ flex: "3" }}>
            <TextField
              id="filled-select-currency"
              placeholder="검색옵션을 선택해주세요."
              variant="outlined"
              fullwidth="true"
            />
          </div>
          <div style={{ flex: "1" }}>
            <Button
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px",
              }}
            >
              {" "}
              검색{" "}
            </Button>
          </div>
          <div style={{ flex: "1" }}>
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#5376FF",
                padding: "0 2px",
              }}
            >
              {" "}
              초기화{" "}
            </Button>
          </div>
        </div>

        <div style={{ fontWeight: "500" }}>Total : 14 Count (1/1)Page</div>
      </div>

      {/* <Paper className={classes.paper}>
                <Toolbar
                    className={clsx(classesSearch.root, {
                        [classesSearch.highlight]: selected.length > 0,
                    })}
                >
                    <Typography className={classesSearch.title} variant="h6" id="tableTitle" component="div">
                        Category Details
                    </Typography>
                        <div className={classes.flexHeader}>
                            <Link to={'/addcategory'} className={classes.btnPrimary}>Add Category</Link>
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
                            { stableSort(userDetails, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                // const labelId = `enhanced-table-checkbox-${index}`;
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
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">
                                        <Link to={"//categoryedit/"+row._id}><EditIcon  style={{ color: "#109ebf" }} /></Link>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userDetails && userDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="right">PK</TableCell>
              <TableCell align="right">아이디</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">담당부서</TableCell>
              <TableCell align="right">상태</TableCell>
              <TableCell align="right">마지막 로그인</TableCell>
              <TableCell align="right">등록일시</TableCell>
              <TableCell align="right">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <Button size="small" style={{ height: "30px", width: "30px" }}>
            {" "}
            First{" "}
          </Button>
        </div>
        <div className="d-flex justify-content-center" style={{ flex: "8" }}>
          <Pagination count={30} variant="outlined" shape="rounded" />
        </div>
        <div>
          <Button size="small" style={{ height: "30px", width: "30px" }}>
            {" "}
            End{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
