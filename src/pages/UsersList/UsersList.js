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
import { getAllUsers } from "./../../actions/users";
import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TableToExcel from "react-html-table-to-excel";
import "./style.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }

const rows = [
  // getData('')
  //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
  //   createData('Donut', 452, 25.0, 51, 4.9),
];

const headCells = [
  {
    id: "FirstName",
    numeric: false,
    disablePadding: true,
    label: "First Name"
  },
  { id: "lastName", numeric: true, disablePadding: false, label: "Last Name" },
  { id: "email", numeric: true, disablePadding: false, label: "Email" },
  { id: "phoneNo", numeric: true, disablePadding: false, label: "Phone No" },
  { id: "accountType", numeric: true, disablePadding: false, label: "Action" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
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
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 76%"
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    ></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onChangeterm: PropTypes.func.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
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
    width: 1
  }
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
  const [userDetails, setUser] = useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  // const handleChange = event => {
  //     const { name, value } = event.target
  //     // getAll(setSearchTerm);
  // };
  function editR(id) {
    // alert(e.target.id);
    if (id != "") {
      window.location = "/useredit/" + id;
    }
  }

  const handleRequestSort = (event, property) => {};

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  /*
  const getAll = async (search = {}) => {
    let filterData = search;
    if (filterData.search == "") {
      filterData = {};
    }
    var res = await getAllUsers(filterData);
    console.log("result", res.result);
    setUser(res.result);
    console.log("result of");
  };
*/
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
    createData("Gingerbread", 356, 16.0, 49, 3.9)
  ];

  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      console.log(res);
      setUsers(res);
    });
  }, []);

  return (
    <div className="mx-3 mx-md-5 UserList_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>?????? ??????</div>
      <div>
        <div style={{ display: "flex", margin: "2% 0" }}>
          

          <div className="row mt-2">
            <div className="excel_btn">
              <TableToExcel
                className="excel-download-button"
                table="nft-table"
                sheet="Sheet"
                filename="Nft-details"
                buttonText="EXCEL ????????????"
              />
            </div>
            <div style={{ flex: "8" }}></div>
          </div>
          <div style={{ flex: "8" }}></div>
        </div>


        <div
          className="align-items-center row registrationData"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div
            className="col-sm-12"
            style={{ margin: "0 10px" }}
          ></div>
          <div
            className="col-sm-12 registrationtitle"
            style={{ color: "#000", fontWeight: "700" }}
          >
            ????????? ?????? ??????
          </div>
          <div className="col-sm-12 my-3 registrationdate">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              label="?????????"
              name="from"
              fullWidth="true"
              className="text-box"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="?????????"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="col-sm-12 d-flex justify-content-center registrationminus">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#A9ABB0",
                width: "55px",
                height: "55px",
                outline: "1px solid #A9ABB0"
              }}
            >
              ~
            </div>
          </div>
          <div className="col-sm-12 my-3 registrationdate registrationdate2">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              label="?????????"
              name="to"
              fullWidth="true"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="?????????"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>

          <FormControl className="cm_select_box" variant="outlined">
            <InputLabel id="member_list_select_1">=?????? ??????=</InputLabel>
            <Select
              labelId="member_list_select_1"
              id="member-simple-select-1"
              label="=?????? ??????="
              // onChange={handleChange}
            >
              <MenuItem value={10}>?????????</MenuItem>
              <MenuItem value={20}>?????????</MenuItem>
            </Select>
            </FormControl>
        </div>

        <div
          className="align-items-center mt-2 row statusWrap statusWrap_1"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div className=""></div>
          <div className="my-2 statusData select-box">
            <FormControl className="cm_select_box_2" variant="outlined">
              <InputLabel id="member_list_select_2">= ?????? =</InputLabel>
                <Select
                  labelId="member_list_select_2"
                  id="member-simple-select-2"
                  label="= ?????? ="
                  // onChange={handleChange}
                >
                  <MenuItem value={`??????`}>??????</MenuItem>
                  <MenuItem value={`???????????? ??????`}>???????????? ??????</MenuItem>
                  <MenuItem value={`?????? ???`}>?????? ???</MenuItem>
                </Select>
            </FormControl>

            <FormControl className="cm_select_box_2" variant="outlined">
              <InputLabel id="member_list_select_3">=?????? ??????=</InputLabel>
                <Select
                  labelId="member_list_select_3"
                  id="member-simple-select-3"
                  label="=?????? ??????="
                  // onChange={handleChange}
                >
                  <MenuItem value="????????????">????????????</MenuItem>
                  <MenuItem value="?????? ??????">?????? ??????</MenuItem>
                </Select>
            </FormControl>

            <FormControl className="cm_select_box_2" variant="outlined">
              <InputLabel id="member_list_select_4">=ETH ???????????? ??????=</InputLabel>
                <Select
                  labelId="member_list_select_4"
                  id="member-simple-select-4"
                  label="=ETH ???????????? ??????="
                  // onChange={handleChange}
                >
                  <MenuItem value="????????????">????????????</MenuItem>
                  <MenuItem value="?????? ??????">?????? ??????</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div className="col-sm-12  my-2 statusData1">
            <FormControl className="cm_select_box" variant="outlined">
              <InputLabel id="member_list_select_5">=?????? ??????=</InputLabel>
                <Select
                  labelId="member_list_select_5"
                  id="member-simple-select-5"
                  label="=?????? ??????="
                  // onChange={handleChange}
                >
                  <MenuItem value="ID">ID</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="???????????? ??????">???????????? ??????</MenuItem>
                  <MenuItem value="?????? ??????">?????? ??????</MenuItem>
                </Select>
            </FormControl>
            <TextField
              id="filled-select-currency"
              placeholder="??????????????? ??????????????????."
              variant="outlined"
              fullwidth="true"
            />
          </div>
          <div className="col-sm-6  my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              ??????{" "}
            </Button>
          </div>
          <div className="col-sm-6 my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#5376FF",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              ?????????{" "}
            </Button>
          </div>
        </div>

        <div style={{ fontWeight: "500" }}>Total : 14 Count (1/1)Page</div>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="center">PK</TableCell>
              <TableCell align="center">?????????</TableCell>
              <TableCell align="center">?????????</TableCell>
              <TableCell align="center">ETH ????????????</TableCell>

              <TableCell align="center">MATIC ????????????</TableCell>

              <TableCell align="center">?????? ?????? ??????</TableCell>
              <TableCell align="center">?????? ??????</TableCell>
              <TableCell align="center">????????? ?????????</TableCell>
              <TableCell align="center">????????????</TableCell>
              <TableCell align="center">??????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.user_id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">hashed email</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>

                <TableCell align="center"></TableCell>

                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  {user?.updated_at?.split("T")[0]}
                  {"  "}
                  {user?.updated_at?.split("T")[1].split(".")[0]}
                </TableCell>
                <TableCell align="right">
                  {user?.updated_at?.split("T")[0]}
                  {"  "}
                  {user?.updated_at?.split("T")[1].split(".")[0]}
                </TableCell>
                <TableCell align="right">
                  <button className="editBtn"> Edit </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center align-items-center mt-5 cm_pagination">
        <div>
          <Button size="small" className="first_end_btn" style={{ height: "30px", width: "30px" }}>
            {" "}
            First{" "}
          </Button>
        </div>
        <div className="d-flex justify-content-center" >
          <Pagination count={30} variant="outlined" shape="rounded" />
        </div>
        <div>
          <Button size="small" className="first_end_btn" style={{ height: "30px", width: "30px" }}>
            {" "}
            End{" "}
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-center"
        >
          <strong>{"?????? ?????? ??????"}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ fontWeight: "500", color: "#000" }}
          >
            ????????? ?????? ??????
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <textarea
            style={{
              height: "100px",
              width: "300px",
              backgroundColor: "transparent",
              borderRadius: "6px"
            }}
            placeholder="?????? ?????? ??? ????????????~~~~~"
          />
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "100px",
              height: "auto"
            }}
          >
            ?????? ??????
          </Button>
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#0500FF",
              color: "#fff",
              width: "100px",
              height: "auto"
            }}
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
