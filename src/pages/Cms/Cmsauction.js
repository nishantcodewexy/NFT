import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { getbannerlist,getauctionlist ,deletecms,setbannerlist,removebannerlist} from './../../actions/emailTemplate';
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link, useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { toastAlert } from '../../lib/toastAlert'
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

function stableSort(array, comparator) {
    console.log(array,'array')
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function stableDec(array, comparator) {
    console.log(array,'array')
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



 


const headCells = [
    { id: 'category', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'creator', numeric: true, disablePadding: false, label: 'Creator' },
    { id: 'Date', numeric: true, disablePadding: false, label: 'End Date' },
    { id: 'Date', numeric: true, disablePadding: false, label: 'Link' },
    { id: 'accountType', numeric: true, disablePadding: false, label: 'Action' },
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
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }


function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'center' : 'center'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 76%',
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
        >
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onChangeterm: PropTypes.func.isRequired
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
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
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [pageone,setPageOne] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowsPerPageOne, setRowsPerPageOne] = React.useState(10);
    const [userDetails, setUser] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)
    const [bannerlist, setbannerlists] = useState(0)
    const [order, setOrder] = React.useState('asc');

    function editR(id) 
    {
        if(id!='') {
            window.location="/Editcms/"+id;
        }
        
    }
    function lock(){

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        const self = this;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setSearchQuery(value)
        setTypingTimeout(setTimeout(function () {
            getAll({ 'search': value });
        }, 1000))
    }

    

    
    useEffect(() => {
        getAll();
        getbanner();
    }, [])

    const getbanner = async (search = {}) => {
        let filterData = search;
        if (filterData.search == '') {
            filterData = {}
        }
        console.log('result=================dddddddddddddddddddddddddddddddddddd==', filterData);
        var res = await getbannerlist(filterData);
        console.log('bannerlist===================', res);
        if(res.result){
            setbannerlists(res.result.data);
            console.log('result of')
        }
       
    }

    async function removebanner (id) {
        var data={
            iid:id
        }
        console.log('result=================dddddddddddddddddddddddddddddddddddd==', data);
        var res = await removebannerlist(data);
        console.log('banner===================', res);
        getAll();
        getbanner();
       
    }

    const getAll = async (search = {}) => {
        let filterData = search;
        if (filterData.search == '') {
            filterData = {}
        }
        console.log('result=================dddddddddddddddddddddddddddddddddddd==', filterData);
        var res = await getauctionlist(filterData);
        console.log('accountType===================', res);
        if(res.result){
            setUser(res.result.data);
            console.log('result of')
        }
       
    }

    async function setbanner (id) {
        var data={
            iid:id
        }
        console.log('result=================dddddddddddddddddddddddddddddddddddd==', data);
        var res = await setbannerlist(data);
        console.log('banner===================', res);
        getAll();
        getbanner();
       
    }



    const handleRequestSort = (event, property) => {
         const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleDelete = async (iid) => {
        try {
            var data={
                id:iid
            }
            const res = await deletecms(iid);
            getAll();

            console.log(res,"===ress=============================")
            toastAlert('success', res.userValue.data.message, 'currency')
         
        } catch (err) { }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleChangePageOne = (event, newPage) => {
        setPageOne(newPage);
    };

    const handleChangeRowsPerPageOne = (event) => {
        setRowsPerPageOne(+event.target.value);
        setPageOne(0);
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
                    <Typography className={classesSearch.title} variant="h6" id="tableTitle" component="div">
                        Banner List
                    </Typography>
                        {/*<div className={classes.flexHeader}>
                            <Link to={'/Addcms'} className={classes.btnPrimary}>Add CMS</Link>
                        </div>*/}
                    
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
                            {bannerlist && bannerlist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>{
                                const date = moment(row.tokendetails.enddate);
                                const now = moment(); 
                                // const isItemSelected = isSelected(row.name);
                                // const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        // hover
                                        // onClick={(event) => handleClick(event, row.name)}
                                        // role="checkbox"
                                        // aria-checked={isItemSelected}
                                        // tabIndex={-1}
                                        // key={row.name}
                                        // selected={isItemSelected}
                                    >
                                        <TableCell align="left">{row.tokendetails.tokenName}</TableCell>
                                        <TableCell align="left">{row.tokenPrice}</TableCell>
                                        <TableCell align="left">{row.ownerinfo && row.ownerinfo.name ? row.ownerinfo.name:row.tokenOwner}</TableCell>
                                        <TableCell align="left">{date.isAfter(now)?(moment(row.tokendetails.enddate).format(
                                    "YYYY-MM-DD  h:mm a "
                                  )):"Time Ended"}</TableCell>
                                  <TableCell align="left"><a href={config.frontUrl+"info/"+row._id} target="_blank">Link</a></TableCell>
             
             
                <TableCell align="left">
                                        <Link  onClick={() => removebanner(row._id)}>Remove</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={bannerlist && bannerlist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>

                 <Paper className={classes.paper}>
                <Toolbar
                    className={clsx(classesSearch.root, {
                        [classesSearch.highlight]: selected.length > 0,
                    })}
                >
                    <Typography className={classesSearch.title} variant="h6" id="tableTitle" component="div">
                        Auction List
                    </Typography>
                       
                    
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
                            {stableSort(userDetails, getComparator(order, orderBy)).slice(pageone * rowsPerPageOne, pageone * rowsPerPageOne + rowsPerPageOne).map((row, index) => {
                                const date = moment(row.tokendetails.enddate);
                                const now = moment(); 
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return date.isAfter(now) ? (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell align="left">{row.tokendetails.tokenName}</TableCell>
                                        <TableCell align="left">{row.tokenPrice}</TableCell>
                                        <TableCell align="left">{row.ownerinfo && row.ownerinfo.name ? row.ownerinfo.name:row.tokenOwner}</TableCell>
                                        <TableCell align="left">{moment(row.tokendetails.enddate).format(
                                    "YYYY-MM-DD  h:mm a "
                                  )}</TableCell>
                                  <TableCell align="left"><a href={config.frontUrl+"info/"+row._id} target="_blank">Link</a></TableCell>

             
             
                <TableCell align="center">
                                        <Link onClick={() => setbanner(row._id)}>Set as Banner</Link>
                                        </TableCell>
                                    </TableRow>
                                ):("")
                            })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userDetails && userDetails.length}
                    rowsPerPage={rowsPerPageOne}
                    page={pageone}
                    onChangePage={handleChangePageOne}
                    onChangeRowsPerPage={handleChangeRowsPerPageOne}
                />
            </Paper>
        </div>
    );
}