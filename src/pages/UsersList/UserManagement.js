import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getAllUsers } from './../../actions/users';
import Button from "components/CustomButtons/Button.js";
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";

import TextField from '@material-ui/core/TextField';

import 'react-phone-input-2/lib/material.css'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

import Avatar from '@material-ui/core/Avatar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import avatar_image from '../../images/avatar_5.png';


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
    { id: 'FirstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: true, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    { id: 'phoneNo', numeric: true, disablePadding: false, label: 'Phone No' },
    { id: 'accountType', numeric: true, disablePadding: false, label: 'status' },
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
    const [userDetails, setUser] = useState();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [typingTimeout, setTypingTimeout] = useState(0)

    // const handleChange = event => {
    //     const { name, value } = event.target
    //     // getAll(setSearchTerm);
    // };

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
        var res = await getAllUsers(filterData);
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  }

    return (
        <div className="mx-3 mx-md-5">
             <div style={{fontWeight:"700", fontSize:"40px"}}>
            회원 수정
        </div>
               <div className="mt-5 row" style={{fontWeight:"700", fontSize:"40px", width:"100%"}}>
            <div className="col-lg-4">
                <label style={{color:"#000"}}> 회원 아이디</label> <br />
                <TextField
                    id="filled-select-currency"
                    placeholder="admin04"
                    variant="outlined"
                    fullwidth="true"
                    style={{width:"300px"}}
                />
            </div>
            <div className="col-lg-4">
                 <label style={{color:"#000"}}> MATIC 지갑주소 </label> <br />
                    <TextField
                        id="filled-select-currency"
                        placeholder="0xff2C8BC69fDdF43a35e09d167774421a6035398F"
                        variant="outlined"
                        fullwidth="true"
                        style={{width:"300px"}}
                    />
            </div>
            <div className="col-lg-4 ">
            <label style={{color:"#000"}}> 아바타</label> <br />
                <div className="d-flex align-items-center"> 
                    <div>
                        <Avatar alt="Remy Sharp" src="https://rb.gy/egpehp" /> 
                    </div>
                    <div style={{flex:"2"}} className="px-2">
                        <div className="d-flex justify-content-center align-items-center" style={{border:"1px solid #C4C4C4", borderRadius: "6px", fontSize: "25px", fontWeight: "500", padding:"2%", }}>
                           <div style={{flex:"2"}}>
                                <input type="text" style={{borderRadius:"5px", fontSize:"16px", placeholder:"갈색피부사람", width:"200px", border:"0.5px solid #C4C4C4", padding:"1% 2%", backgroundColor:"transparent"}} /> 
                           </div>     
                            <div style={{fontSize:"16px", textAlign:"center", width:"100%"}}>
                                아바타
                            </div>            
                        </div>
                    </div>

                    <div >
                        <Button style={{border:"1px solid #5376FF", color:"#5376FF", width:"100px", height:"auto", backgroundColor:"transparent"}} variant="contained" color="primary">
                            변경하기
                        </Button>
                    </div>
                    
                </div>
                 {/*<OutlinedInput
                        id="outlined-adornment-amount"
                        
                        startAdornment={
                        <InputAdornment position="start">
                            <TextField
                                id="filled-select-currency"
                                placeholder="KOR +82"
                                select
                                variant="outlined"
                                fullwidth="true"
                                style={{width:"80px"}}
                            >
                                <MenuItem>
                                    KOR +82
                                </MenuItem>
                                <MenuItem>
                                    SL +94
                                </MenuItem>

                            </TextField>

                            </InputAdornment>}
                        labelWidth={80}
                    />
                   */} 
            </div>
        </div>

        <div className="row mt-5" style={{fontWeight:"700", fontSize:"40px", width:"100%"}}>
            <div className="col-lg-4">
                <label style={{color:"#000"}}> 회원 닉네임 </label> <br />
                <TextField
                    id="filled-select-currency"
                    placeholder="홍길동"
                    variant="outlined"
                    fullwidth="true"
                    style={{width:"300px"}}
                />
            </div>
            <div className="col-lg-3">
                 <label style={{color:"#000"}}> ETH 지갑주소</label> <br />
                    <TextField
                        id="filled-select-currency"
                        variant="outlined"
                        fullwidth="true"
                        placeholder="0x9Eeb60d8F2dAd6B429d7d5A25f68C219459c6444"
                        style={{width:"300px"}}
                    />
            </div>
            <div className="col-lg-2" style={{width:"300px"}}>
                <FormLabel style={{color:"#000"}} component="legend">회원 상태</FormLabel>
                <RadioGroup>
                    <div style={{display:"flex"}}>
                        <FormControlLabel style={{color:"#000"}} value="활성" control={<Radio />} label="활성" />
                        <FormControlLabel style={{color:"#000"}} value="비활성" control={<Radio />} label="비활성" />
                    </div>
                </RadioGroup>
            </div>
            <div className="col-lg-3" style={{width:"300px"}}>
                <FormLabel style={{color:"#000"}} component="legend">회원 인증 여부</FormLabel>
                <RadioGroup>
                    <div style={{display:"flex"}}>
                        <FormControlLabel style={{color:"#000"}} value="인증됨" control={<Radio />} label="인증됨" />
                        <FormControlLabel style={{color:"#000"}} value="인증안됨" control={<Radio />} label="인증안됨" />
                        <FormControlLabel style={{color:"#000"}} value="인증요청" control={<Radio />} label="인증요청" />
                    </div>
                </RadioGroup>
            </div>
        </div>

        <div className="row mt-5" style={{fontWeight:"700", fontSize:"18px", display:"flex", width:"100%"}}>
            <div className="col-lg-6">
                <label style={{color:"#000"}}> About me </label> <br />
                <textarea 
                    placeholder="나는 누구입니다. 블라블라~~~ 내 소개 텍스트 블라블라 블라블라 ~~~~ 내 소개 텍스트를 입력해주세요.~~~~"
                    style={{height:"100px", width:"100%", backgroundColor:"transparent", borderRadius:"6px"}}
                />
            </div>
            <div className="col-lg-6">
                <label style={{color:"#000"}}> 관리자 메모 </label> <br />
                <textarea 
                    placeholder="개 진상 회원 개짜증남"
                    style={{height:"100px", width:"100%", backgroundColor:"transparent", borderRadius:"6px"}}
                />
            </div>
           
        </div>

        <div className="row mt-5" style={{fontWeight:"700", fontSize:"18px", display:"flex", width:"100%"}}>
            <div className="col-lg-1">
                <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary" onClick={handleClickOpen}>
                    저장
                </Button>
            </div>
            <div className="col-lg-1">
                <Button style={{border:"1px solid #5376FF", color:"#5376FF", width:"100px", height:"auto", backgroundColor:"transparent"}} variant="contained" color="primary">
                    목록
                </Button>
            </div>
            <div className="col-lg-10">
               
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

      <DialogTitle id="alert-dialog-title" className="d-flex justify-content-center"><strong>{"아바타 변경하기"}</strong></DialogTitle>
        <DialogContent className="my-4">
            <div className="row mb-3">
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
                <div className="col-lg-3">
                    <img style={{width:"60px", height:"auto"}} src ={avatar_image} />
                </div>
            </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button onClick={handleAutoClose} style={{backgroundColor:"#5376FF", color:"#fff", width:"100px", height:"auto"}}>
            인증 승인
          </Button>
          <Button onClick={handleAutoClose} style={{backgroundColor:"transparent", border:"1px solid #5376FF", color: "#5376FF", width:"100px", height:"auto"}}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    );
}