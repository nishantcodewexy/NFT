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
import { getLoginHistory } from './../../actions/users';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import Input from "@material-ui/core/Input";
import CustomInput from "components/CustomInput/CustomInput.js";
import Search from "@material-ui/icons/Search";

import FormControl from "@material-ui/core/FormControl";

// function createData(FirstName, lastName, Email, phoneNo, accountType) {
//   return { FirstName, lastName, Email, phoneNo, accountType };
// }

const rows = [
    // getData('')
    //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')
    //   createData('Donut', 452, 25.0, 51, 4.9),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   createData('Honeycomb', 408, 3.2, 87, 6.5),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Jelly Bean', 375, 0.0, 94, 0.0),
    //   createData('KitKat', 518, 26.0, 65, 7.0),
    //   createData('Lollipop', 392, 0.2, 98, 0.0),
    //   createData('Marshmallow', 318, 0, 81, 2.0),
    //   createData('Nougat', 360, 19.0, 9, 37.0),
    //   createData('Oreo', 437, 18.0, 63, 4.0),
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

function stableSort(array, comparator) {
    //   const stabilizedThis = array.map((el, index) => [el, index]);
    //   stabilizedThis.sort((a, b) => {
    //     const order = comparator(a[0], b[0]);
    //     if (order !== 0) return order;
    //     return a[1] - b[1];
    //   });
    //   return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'Email', numeric: false, label: 'Email ID' },
    { id: 'Country', numeric: true, label: 'Country' },
    { id: 'Code', numeric: true, label: 'Code' },
    { id: 'Region', numeric: true, disablePadding: false, label: 'State' },
    { id: 'IPAdd', numeric: true, disablePadding: false, label: 'IP Address' },
    { id: 'OS', numeric: true, disablePadding: false, label: 'OS' },
    { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'Status', numeric: true, disablePadding: false, label: 'Status' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'center'}
                        // padding={headCell.disablePadding ? 'default' : 'default'}
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
    const [searchTerm, setSearchTerm] = React.useState("");
    const [userDetails, setUser] = React.useState();
    const { numSelected } = props;
    // const handleChange = event => {
    //     setSearchTerm(event.target.value);
    //     console.log('dfdf', setSearchTerm);
    // };
    return (
        <Toolbar
        className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}
    >
      
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Login History Details
                </Typography>
        {/* ) */}
        {/* } */}
        <div className={classes.searchWrapper}>
            {/* {userDetails && userDetails.map(() => { */}

        </div>
       
    </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
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
// const [data, setData] = useState([]); //table data
//for error handling
// const [iserror, setIserror] = useState(false)
// const [errorMessages, setErrorMessages] = useState([])
export default function EnhancedTable() {
    const classes = useStyles();

    const customStyles = customStyle();
    const classesSearch = useToolbarStyles();
    const [data, setData] = React.useState(0);
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userDetails, setUser] = useState();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)

  
    //Filter Search  method using get api using set time out functionality
    const handleChangeevent = (event) => {
        const { name, value } = event.target;
        const self = this;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setSearchQuery(value)
        setTypingTimeout(setTimeout(function () {
            getAll({ 'search': value });
        }, 1000))

        // self.setState({
        //     name: event.target.value,
        //     search: searchQuery,
        //     typing: false,
        //     typingTimeout: setTimeout(function () {
        //         self.fetchAPI(
        //             {
        //                 ...self.state.search,
        //                 ...{
        //                     page: self.state.currentPage, limit: self.state.limit
        //                 }
        //             }
        //         );
        //     }, 1000)
        // });
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
        //logout(history)
        getAll();
    }, [])
    const getAll = async (search = {}) => {
        let filterData = search;
        if (filterData.search == '') {
            filterData = {}
        }
        var res = await getLoginHistory(filterData);
        console.log('result', res.result);
        setUser(res.result);
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

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
              
                <Toolbar
                    className={clsx(classesSearch.root, {
                        [classesSearch.highlight]: selected.length > 0,
                    })}
                >
                
                    <Typography className={classesSearch.title} variant="h6" id="tableTitle" component="div">
                        LoginHistory Details
                    </Typography>
                    <div className={classesSearch.searchWrapper}>
                        <FormControl

                            className={classesSearch.margin + " " + classesSearch.search + " " + customStyles.formControl}
                        >


                            <Input placeholder="Search"
                                classes={{

                                    root: customStyles.marginTop,
                                    disabled: customStyles.disabled,
                                    underline: customStyles.underline
                                }}
                                onChange={handleChangeevent}

                            />
                        </FormControl>
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
                            {/* {stableSort(userDetails, getComparator(orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => { */}

                            {userDetails && userDetails.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        //   role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell> */}
                                        <TableCell align="center" component="th"

                                            id={labelId}
                                            scope="row">
                                            {row.email}
                                        </TableCell>

                                        <TableCell align="center">{row.countryName}</TableCell>
                                        <TableCell align="center">{row.countryCode}</TableCell>
                                        <TableCell align="center">{row.regionName}</TableCell>
                                        <TableCell align="center">{row.ipaddress}</TableCell>
                                        <TableCell align="center">{row.os}</TableCell>
                                        <TableCell align="center">{row.createdAt}</TableCell>
                                        <TableCell align="center">{row.status}</TableCell>


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
            {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </div>
    );
}