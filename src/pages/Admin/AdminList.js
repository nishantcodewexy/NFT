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

import { getAllAdmin } from "./../../actions/admin";

import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";

import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";

import MenuItem from "@material-ui/core/MenuItem";
//import Pagination from "@material-ui/lab/Pagination";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Pagination2 from "components/Paginations/Pagination2";
import Search from "@material-ui/icons/Search";

import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();

  const [admin, setAdmin] = useState();
  const [pages, setPages] = useState(1);

  const [serach, setSearch] = useState({
    from: "",
    to: "",
    status: "",
    option: "",
    text: ""
  });

  const [size, setSize] = useState();
  const [newPage, setNewPage] = useState();

  useEffect(() => {
    getAllAdmin(1).then((res) => {
      setAdmin(res.data);
      setSize(res.data.length);
      if (res.count !== 0) {
        setPages(res.count);
      }
    });
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...serach, ...{ [name]: value } };
    setSearch(formData);
    console.log(formData);

    if(e.target.value == ' '){
      console.log('fdff' + e.target);

      // e.target.nextSibling.nextSibling.nextSibling.classList.add('active');
    }
    else{
      console.log([e.currentTarget]);
      // e.target.nextSibling.nextSibling.nextSibling.classList.add('active');
    }
  };

  const clearText = () => {
    setSearch({ ...serach, ...{ text: "", option: "" } });
  };

  return (
    <div className="mx-3 mx-md-5">
      <div className="title">관리자 관리</div>

      <div>
        <div className="add-button row">
          <div className="col-sm-12 col-lg-2">
            <Link to="/add">
              <Button
                style={{
                  backgroundColor: "#5376FF",
                  outline: "none",
                  borderRadius: "6px",
                  width: "100px"
                }}
                variant="contained"
                color="primary"
              >
                등록
              </Button>
            </Link>
          </div>
          <div className="col-lg-8"></div>
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
            등록일 기간 검색
          </div>
          <div className="col-sm-12 my-3 registrationdate">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              label="시작일"
              name="from"
              fullWidth
              className="text-box"
              onChange={handleChange}
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="시작일"
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
              label="종료일"
              name="to"
              fullWidth
              onChange={handleChange}
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              placeholder="종료일"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </div>

        <div
          className="align-items-center mt-2 row statusWrap"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div className=""></div>

          <div
            className="col-sm-12 statusData"
            style={{ color: "#000", fontWeight: "700" }}
          >
        
            <TextField
              id="filled-select-currency"
              name="status"
              fullWidth
              onChange={(event) => {handleChange(event)}}
              value={serach.status}
              variant="outlined"
              helperText="=상태="
              style={{ width: "150px" }}
            >
              <MenuItem value=""> Default</MenuItem>
              <MenuItem value="활성 ">활성</MenuItem>
              <MenuItem value="비활성">비활성</MenuItem>
            </TextField>

            <TextField
              id="filled-select-currency"
              select
              value={serach.option}
              variant="outlined"
              helperText=" =검색옵션="
              name="option"
              fullWidth
              onChange={handleChange}
              style={{ width: "150px" }}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="아이디">아이디</MenuItem>
              <MenuItem value="이름">이름</MenuItem>
            </TextField>
          </div>
          <div className="col-sm-12 statusData1">
            <TextField
              id="filled-select-currency"
              placeholder="검색옵션을 선택해주세요."
              variant="outlined"
              name="text"
              value={serach.text}
              onChange={handleChange}
              fullwidth
            />
          </div>
          <div className="col-sm-12 statusData2">
            <Button
              //onClick={handleClickOpen}
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px",
                outline: "none",
                borderRadius: "6px"
              }}
            >
              검색
            </Button>
          </div>
          <div className="col-sm-12 statusData2" style={{ flex: "1" }}>
            <Button
              onClick={clearText}
              style={{
                backgroundColor: "#fff",
                color: "#5376FF",
                padding: "0 2px",
                outline: "none",
                borderRadius: "6px"
              }}
            >
              초기화
            </Button>
          </div>
        </div>

        <div style={{ fontWeight: "500"}} className="mt-2">
          Total {size}: Count ({newPage}/{pages})Page
        </div>
      </div>

      <TableContainer component={Paper} className="admin_list_table">
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="left">PK</TableCell>
              <TableCell align="left">아이디</TableCell>
              <TableCell align="left">이름</TableCell>
              <TableCell align="left">담당부서</TableCell>
              <TableCell align="left">상태</TableCell>
              <TableCell align="left">마지막 로그인</TableCell>
              <TableCell align="left">등록일시</TableCell>
              <TableCell align="left">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin &&
              admin
                .filter((val) => {
                  if (serach.from == "") {
                    return val;
                  } else if (val.created_at.includes(serach.from)) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (serach.to == "") {
                    return val;
                  } else if (val.updated_at.includes(serach.to)) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (serach.status == "") {
                    return val;
                    console.log("val" + val + "status" + serach.status);
                  } else if (val.status.includes(serach.status)) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (serach.text == "" || serach.option == "") {
                    return val;
                  } else if (serach.option === "아이디") {
                    if (serach.text == "") {
                      return val;
                    } else if (val.email.includes(serach.text)) {
                      return val;
                    }
                  } else if (serach.option === "이름") {
                    if (serach.text == "") {
                      return val;
                    } else if (val.name.includes(serach.text)) {
                      return val;
                    }
                  }
                })
                .map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.department}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      {row.updated_at.split("T")[0]}
                      {"  "}
                      {row.updated_at.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell align="left">
                      {row.created_at.split("T")[0]}
                      {"  "}
                      {row.created_at.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/edit/${row.admin_id}`}>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#5376FF",
                            padding: "8px 16px",
                            outline: "none",
                            border: "1px solid #5376FF"
                          }}
                        >
                          수정
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-center mt-5">
        <div style={{ flex: "8" }}>
          {
            //<Pagination count={30} variant="outlined" shape="rounded" />
          }
          <Pagination2
            pages={pages}
            setAdmin={(admin) => setAdmin(admin)}
            getList={getAllAdmin}
            setSize={(size) => {
              setSize(size);
            }}
            setNewPage={(newPage) => {
              setNewPage(newPage + 1);
            }}
          />
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
          <strong>{"인증 요청 확인"}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ fontWeight: "500", color: "#000" }}
          >
            사용자 인증 내용
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
            placeholder="제발 인증 좀 해주세요~~~~~"
          />
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "100px",
              height: "auto",
              outline: "none"
            }}
          >
            인증 승인
          </Button>
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#0500FF",
              color: "#fff",
              width: "100px",
              height: "auto",
              outline: "none"
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
