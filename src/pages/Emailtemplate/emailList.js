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
import { getemaillist } from "./../../actions/users";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const rows = [];

const headCells = [
  {
    id: "Identifier",
    numeric: false,
    disablePadding: true,
    label: "Identifier",
  },
  { id: "Subject", numeric: false, disablePadding: true, label: "Subject" },
  { id: "status", numeric: false, disablePadding: true, label: "Action" },
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
  // numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  // orderBy: PropTypes.string.isRequired,
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

// const EnhancedTableToolbar = (props) => {
//     const classes = useToolbarStyles();
//     // const { numSelected } = props;

//     return (
//         <Toolbar
//             className={clsx(classes.root, {
//                 [classes.highlight]: numSelected > 0,
//             })}
//         >
//         </Toolbar>
//     );
// };

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onChangeterm: PropTypes.func.isRequired
// };

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
  const [faq, setFaq] = useState();

  function updateemail(id) {
    // alert(e.target.id);
    if (id != "") {
      window.location = "//emailUpdatecms/" + id;
    }
  }

  function addFaq() {
    // window.location='/addFaq';
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
  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    var res = await getemaillist();
    console.log("result", res);
    setFaq(res.result);
    console.log("result of");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            Email Template{" "}
          </Typography>

          <div className="page_header">{/* <h2>User List</h2> */}</div>
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
              {faq &&
                faq.map((row, index) => {
                  return (
                    <TableRow>
                      <TableCell
                        align="center"
                        component="th"
                        // id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.identifier}
                      </TableCell>
                      <TableCell align="center">{row.subject}</TableCell>
                      <TableCell align="center">
                        {/* <Link onclick={() => lock(row._id)}><LockIcon style={{ color: "109ebf" }}/></Link> */}
                        <Link onClick={() => updateemail(row._id)}>
                          <EditIcon style={{ color: "#109ebf" }} />
                        </Link>
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
          count={faq && faq.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
