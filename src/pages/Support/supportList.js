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
import DeleteIcon from '@material-ui/icons/Delete';
import { getSupportList, deleteSupport } from './../../actions/users';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';

const rows = [

];


const headCells = [

    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'subject', numeric: false, disablePadding: true, label: 'Subject' },
    { id: 'status', numeric: false, disablePadding: true, label: 'status' },
    { id: 'view', numeric: false, disablePadding: true, label: 'Ticket View' },

  
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
    const [ supportUser, setSupportUser ] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)


    function viewSupport(id) 
    {
        if(id!='') {
            window.location="/supportView/"+id;
        }   
    }
    useEffect(() => {
        getSupport();
    },[])
    const getSupport = async()=> {
        var response = await getSupportList();
        console.log('response : ',response);
        if(typeof response.result.status!='undefined' &&  response.result.status==200){
            if(typeof response.result.data.returnData!='undefined'){
                setSupportUser(response.result.data.returnData);
            }
        }
    }

    function deleteSupportId (id) {
        if(id!='') {
            deleteSupport(id);
             window.location="/support";
        }
    }



    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     const self = this;
    //     if (typingTimeout) {
    //         clearTimeout(typingTimeout);
    //     }

    //     setSearchQuery(value)
    //     setTypingTimeout(setTimeout(function () {
    //         getAll({ 'search': value });
    //     }, 1000))
    // }

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


                    <Typography className={classesSearch.title} variant="h6" id="tableTitle" component="div">
Support List                  </Typography>


                    {/* <div className={classesSearch.searchWrapper}>
                        <FormControl
                            className={classesSearch.margin + " " + classesSearch.search + " " + customStyles.formControl}
                        >
                            <Input placeholder="Search"
                                classes={{

                                    root: customStyles.marginTop,
                                    disabled: customStyles.disabled,
                                    underline: customStyles.underline
                                }}
                                onChange={handleChange}
                            />
                        </FormControl>
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
                            {supportUser && supportUser.map((row, index) => {

                                // const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow>
                                        <TableCell align="center" component="th"
                                            scope="row" padding="none">
                                            {row.email_add}
                                        </TableCell>
                                        <TableCell align="center">{row.subject}</TableCell>
                                        <TableCell align="center">{row.closedstatus == 1 && "closed" }{row.closedstatus == 0 && "open"}</TableCell>
                                        <TableCell align="center">
                                            <Link onClick={() => viewSupport(row._id)}><VisibilityIcon  style={{ color: "#109ebf" }} /></Link>
                                            <Link onClick={() => deleteSupportId(row._id)}><DeleteIcon  style={{ color: "#109ebf" }} /></Link>
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
                    count={supportUser && supportUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}