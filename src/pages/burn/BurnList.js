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
import { getAllartlist ,deletecms,setbannerlist,getproductdetails,adminburntoken} from './../../actions/emailTemplate';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { Link } from "react-router-dom";
import { toastAlert } from '../../lib/toastAlert'
import * as moment from "moment";
import Web3 from 'web3';
import config from '../../actions/config';
import ABI from '../../ABI/ABI.json';

const rows = [
   
];

var smartContract = config.smartContract;
var network = config.network;

const headCells = [
    { id: 'category', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'creator', numeric: true, disablePadding: false, label: 'Creator' },
    { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
    { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'accountType', numeric: true, disablePadding: false, label: 'Link' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [userDetails, setUser] = useState([]);
    const [burnlist, setburnlist] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)
    const [show, setShow] = useState(false);
    const [order, setOrder] = React.useState('asc');

    function setview(id) 
    {
        if(id!='') {
            window.location="/viewdetails/"+id;
        }
        
    }

    async function handleShow (idd){ 
        var data={
          id:idd
        }
        var res = await getproductdetails(data);
        var item = res.result.data.data[0];
        console.log(item,"==============itemitem")
        var type ="";
        if(item.tokendetails.type=="erc721"){
            type = 721
        }else{
            type =1155
        }
        if(window.web3.currentProvider.networkVersion == network){
        var web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        var web3  = new Web3(window.web3.currentProvider);
        var nftContract = new web3.eth.Contract(ABI,smartContract);
        var currAddr = await web3.eth.getAccounts();
        var owneraddr = await nftContract.methods.owner().call();
        console.log(
            item.tokenOwner,
             item.tokenCounts,
            item.tokendetails.contractAddress,
            type,
            item.balance,"===============================================")
        if(currAddr[0]==owneraddr){
          var result = await nftContract.methods.burn(
            item.tokenOwner,
            item.tokenCounts,
            item.tokendetails.contractAddress,
            type,
            item.balance
          ).send({
            from: currAddr[0]
          });
          console.log(result,"===========================================burnresult")
          var data={
            id:idd,
            tokenName:item.tokendetails.tokenName
          }
          var res = await adminburntoken(data);
          toastAlert("success", "Successfully changed", "fee"); 
          getAllcms();
          }else{
          toastAlert("error", "Please login "+owneraddr, "fee");
          }  
        }else{
            toastAlert("error", "Please choose binance network", "fee");
        }   
        
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        const self = this;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setSearchQuery(value)
        setTypingTimeout(setTimeout(function () {
            getAllcms({ 'search': value })
        }, 1000))
    }


     const getAllcms = async (search = {}) => {
        let filterData = search;
        if (filterData.search == '') {
            filterData = {}
        }
        var res = await getAllartlist(filterData);
        console.log('result===================', res);
        if(res.result){
            setburnlist(res.result.data);
            console.log('result of')
        }
       
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
        getAllcms();
    }, [])

    async function setbanner (id) {
        var data={
            iid:id
        }
        console.log('result=================dddddddddddddddddddddddddddddddddddd==', data);
        var res = await setbannerlist(data);
        console.log('banner===================', res);
        getAllcms();
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

    const handleDelete = async (iid) => {
        try {
            var data={
                id:iid
            }
            const res = await deletecms(iid);
            getAllcms();
            console.log(res,"===ress=============================")
            toastAlert('success', res.userValue.data.message, 'currency')
         
        } catch (err) { }
    }

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
                        Burn
                    </Typography>
                      {/*  <div className={classes.flexHeader}>
                            <Link to={'/Addcms'} className={classes.btnPrimary}>Add CMS</Link>
                        </div>*/}
                    
                </Toolbar>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(burnlist, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                 var type ="";
                                if(row.fixed==1){
                                    type="Fixed Auction"
                                }else if(row.timed==1){
                                    type="Timed Auction"
                                }else{
                                    type="Reverse Auction"
                                }
                                return (
                                    <TableRow>
                                        <TableCell align="center">{row.tokendetails.tokenName}</TableCell>
                                        <TableCell align="center">{row.tokenPrice}</TableCell>
                                        <TableCell align="center"><span className="token_address">{row.ownerinfo && row.ownerinfo.name ? row.ownerinfo.name:row.tokenOwner}</span></TableCell>
                                        <TableCell align="center">{type}</TableCell>
                                        <TableCell align="center">{moment(row.timestamp).format(
                                    "YYYY-MM-DD  h:mm a "
                                  )}</TableCell>
                                  <TableCell align="center"><a href={config.frontUrl+"info/"+row._id} target="_blank">Link</a></TableCell>
                        <TableCell align="center">
                                        <Link className="btn btn-primary btn-sm mr-2" to={'/viewdetails/'+row._id}>
                                        View</Link>
                                        <Link className="btn btn-primary btn-sm" onClick={() => handleShow(row._id)}>Burn</Link>
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
                    count={burnlist && burnlist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );
}