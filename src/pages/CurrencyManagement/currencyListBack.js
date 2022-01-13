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
import { getAllCurrency, deleteCurrency } from './../../actions/users';
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





// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }

const rows = [
    // getData('')
    //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
    //   createData('Donut', 452, 25.0, 51, 4.9),
];


const headCells = [
    { id: 'FirstName', numeric: false, disablePadding: true, label: 'Currency Name' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Curreny Type' },
    { id: 'accountType', numeric: true, disablePadding: false, label: 'Action' },
];

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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currencyDetails, setCurrency] = useState();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)

    // const handleChange = event => {
    //     const { name, value } = event.target
    //     // getAll(setSearchTerm);
    // };
    function updateCurrency(id) {
        // alert(e.target.id);
        if (id != '') {
            window.location = "/updateCurrency/" + id;
        }

    }
    // const addCurrency = async() =>
    // {
    //     window.location='/addCurrency';
    // }

    function addCurrency() {

        window.location = '/addCurrency';
    }
    // const deleteCurrencyId = async(id) =>
    // {
    //      if(id!='') {
    //     let {error} = await deleteCurrency(id);
    //     // console.log(result,'result');
    //     console.log(error,'error');
    //    // alert(e.target.id);

    //         //  window.location="/currency";
    //      }

    // }
    function deleteCurrencyId(id) {
        if (id != '') {
            deleteCurrency(id);
            window.location = "/currency";
        }
    }


    // const disablekey = async () => { 
    //     let { error, result } = await disable2faCode();
    //     // setSettings2fa(result);
    //     console.log(result,result);
    //     window.location="/securityType/";

    //   }
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

    const handleRequestSort = (event, property) => {
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
    }, [])

    const getAll = async (search = {}) => {
        let filterData = search;
        if (filterData.search == '') {
            filterData = {}
        }
        var res = await getAllCurrency(filterData);
        console.log('result', res.result);
        setCurrency(res.result);
        console.log('result of')
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
                selected.slice(selectedIndex + 1),
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
                        Currency Management
                    </Typography>

                    <div className="page_header">
                        <Button variant="contained" color="primary" onClick={addCurrency} >Add Currency</Button>
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
                            {currencyDetails && currencyDetails.map((row, index) => {

                                // const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow>
                                        <TableCell align="center" component="th"

                                            // id={labelId}
                                            scope="row" padding="none">
                                            {row.currencyName}
                                        </TableCell>

                                        <TableCell align="center">{row.type}</TableCell>

                                        <TableCell align="center">
                                            {/* <Link onclick={() => lock(row._id)}><LockIcon style={{ color: "109ebf" }}/></Link> */}
                                            <Link onClick={() => updateCurrency(row._id)}><EditIcon style={{ color: "#109ebf" }} /></Link>
                                            <Link onClick={() => deleteCurrencyId(row._id)}><DeleteIcon style={{ color: "#109ebf" }} /></Link>

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
                    count={currencyDetails && currencyDetails.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}