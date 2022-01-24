import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { getAllSelfiId, UpdateStatus } from './../../actions/users';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const rows = [
    // getData('')
    //   createData('firstName', 'lastName', 'Email', 'phoneNo', 'accountType')

];



function getComparator(order, orderBy) {
    // return order === 'desc'
    //     ? (a, b) => descendingComparator(a, b, orderBy)
    //     : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {

}

const headCells = [

    { id: 'type', numeric: true, disablePadding: false, label: 'type' },
    { id: 'selfie', numeric: true, disablePadding: false, label: 'Selfie Image' },
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                       
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                      
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
    // highlight:
    //     theme.palette.type === 'light'
    //         ? {
    //             color: theme.palette.secondary.main,
    //             backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //         }
    //         : {
    //             color: theme.palette.text.primary,
    //             backgroundColor: theme.palette.secondary.dark,
    //         },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            // className={clsx(classes.root, {
            //     [classes.highlight]: numSelected > 0,
            // })}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Selfie  Proof Details
                    </Typography>


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
const handleClickToast = (event) => {


}

const initialFormValue = {
  'Reason': "",
}
export default function EnhancedTable() {
    const classes = useStyles();
    const [data, setData] = React.useState(0);
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userDetails, setUser] = useState();
      const [formValue, setFormValue] = useState(initialFormValue);
      const [formData, setFormData] = useState("");
      const [reason, setReason] = useState("");


//       const onChange = (e) => {
//     e.preventDefault();
//     console.log(e.target); 
//     const { id, value } = e.target;
//     let formData = { ...formValue, ...{ [id]: value } }
//     setFormValue(formData)
//     console.log(formValue);
//     //setValidateError(formData)
//   }

  const onChangeIdBased = (e) => {
    e.preventDefault();
    console.log('e.target : ',e.target); 
    const { id, value } = e.target;
    if(id=='reason'){
        setReason(value)
        console.log('onChangeIdBased : ',value,reason);
    }
  }

    const handleRequestSort = (event, property) => {
        // const isAsc = orderBy === property && order === 'asc';
        // setOrder(isAsc ? 'desc' : 'asc');
        // setOrderBy(property);
    };

    const handleSubmit = async (record, status, role) => {
        let data = {
            id: record._id,
            status,
            role
        }
        var update = await UpdateStatus(data);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);

    }


    // const handleClickOpen = async (record, status, role) => {

    //     setOpen(true);
    //     let data = {
    //         id: record._id,
    //         status,
    //         role
    //     }
    //     var update = await UpdateStatus(data);
    //     console.log('result of update', update);
    //     setUser(update.result, 'update');

    //     setOpen(false);
    // };


    const handleRejection = async (record, status, role, reason) => {
  
        let data = {
            id: record._id,
            status,
            role,
            reason
        }
console.log(data,'data of handle rejection')
        
        var update = await UpdateStatus(data);
        console.log('result of update', update);
        setUser(update.result, 'update');

        setOpen(false);
    };

    const updateStatus = async () => {
        var update = await UpdateStatus();
        console.log('result of update', update);
        setUser(update.result, 'update');

    }

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
        getFunc();
    }, [])
    const getFunc = async () => {
        var res = await getAllSelfiId();
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
                <EnhancedTableToolbar numSelected={selected.length} />
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
                            {userDetails && userDetails.map((row, index, value) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        //   role="checkbox"
                                        // aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        // selected={isItemSelected}
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
                                            {row.type}
                                        </TableCell>
                                        {/* <TableCell align="center"><a href={row.frontImage} target="_blank">View Image</a> </TableCell>
                                        <TableCell align="center"><a href={row.backImage} target="_blank">View Image</a> </TableCell> */}
                                        <TableCell align="center"><a href={row.frontImage} target="_blank">View Image</a> </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSubmit(row, '3', '1')}
                                        
                                            >
                                                Approve
        </Button>
                                            <Button variant="outlined" color="primary" 
                                            
                                            onClick={() => handleClickOpen
                                            ()} >
                                                Reject


                            <Dialog open={open} aria-labelledby="form-dialog-title">
                                {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
                                <DialogContent>
                                    <DialogContentText>
                                        please enter input here. We will send updates
                                        occasionally.
          </DialogContentText>
                                   <CustomInput
                        labelText="Reason for Reject"
                        type="text"
                        onChange={onChangeIdBased}
                        id="reason"
                        name="reason"
                        value={reason}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                                </DialogContent>
                                <DialogActions>
                                    {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
           {/* onClick={() => handleClickOpen
                                            (row, '4', '2')} */}
                                    <Button   onClick={() => handleRejection(row, '4', '1', reason)} color="primary">
                                        Submit
          </Button>
                                </DialogActions>
                            </Dialog>
      </Button>
                                        </TableCell>

                                    </TableRow>

                                );
                            })
                            }

                            {/* </div> */}
                            {/* ); */}
                            {/* } */}


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