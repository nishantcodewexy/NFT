import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ServiceCenterManagement(){

   

    function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

    const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

    const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  // const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClickOpenHistory = () => {
  //   setOpen2(true);
  // };

  const handleAutoClose = () => {
    setOpen(false);
    // setOpen2(false);
  }


    return(
        <div>

         <div className="mx-3 mx-md-5">
            <div style={{fontWeight:"700", fontSize:"40px", color: "#000"}}>
                ???????????? ??????
            </div>

        <div style={{display:"flex", margin:"2% 0"}}>
            <div style={{flex:"1"}}>
                <Button style={{border:"2px solid #5376FF", color:"#5376FF"}} variant="contained">
                EXCEL ????????????
                </Button> 
            </div>
            <div style={{flex:"8"}}>
                 
            </div>
        </div>

        <div className="align-items-center" style={{fontWeight: "700", display:"flex"}}>
        <div style={{flex:"7", margin: "0 10px"}}>
        </div>
        <div style={{margin: "0 10px", color:"#000", fontWeight:"700"}}>
            ????????? ?????? ??????
        </div>
        <div style={{margin: "0 0 0 10px"}}>
            <TextField
                variant="outlined"
                id="date"
                type="date"
                label="?????????"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,                    
                }}
            />
        </div>
         <div style={{backgroundColor:"#A9ABB0", width:"55px", height:"55px", borderRadius:"3px", textAlign:"center"}}>
            ~
        </div>
        <div>
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    label="?????????"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
        </div>
        </div>

        <div className="align-items-center mt-2" style={{fontWeight: "700", display:"flex"}}>
            <div style={{flex:"6"}}>
            </div>
            <div style={{flex:"5", color:"#000", fontWeight:"700"}}>
                <TextField
                    id="filled-select-currency"
                    select
                    placeholder="=??????="
                    variant="outlined"
                    style={{width:"150px", margin:"0 5px"}}
                >

                    <MenuItem>
                        =??????=
                    </MenuItem>
                    <MenuItem>
                        ??????
                    </MenuItem>
                    <MenuItem>
                        ?????????
                    </MenuItem>

                </TextField>

                <TextField
                    id="filled-select-currency"
                    select
                    placeholder="=??????="
                    variant="outlined"
                    style={{width:"150px"}}                    
                >
                    <MenuItem>
                        =????????????=
                    </MenuItem>
                    <MenuItem>
                        ?????????
                    </MenuItem>
                    <MenuItem>
                        ??????
                    </MenuItem>

                </TextField>
        
            </div>
            <div style={{flex:"3"}}>
                <TextField
                    id="filled-select-currency"
                    placeholder="??????????????? ??????????????????."
                    variant="outlined"
                    fullwidth="true"
                />
            </div>
            <div style={{flex:"1"}}>
                <Button style={{backgroundColor:"#5376FF", color:"#fff", padding:"0 2px"}} onClick={handleClickOpen} > ?????? </Button>
            </div>
            <div style={{flex:"1"}}>
                <Button style={{backgroundColor:"#fff", color:"#5376FF", padding:"0 2px"}} > ????????? </Button>
            </div>
        </div>

        <div style={{fontWeight: "500"}}>
            Total : 14 Count (1/1)Page
        </div>

        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:"#E5E5E5"}}>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell align="right">PK</TableCell>
            <TableCell align="right">???????????? ??????</TableCell>
            <TableCell align="right">????????????</TableCell>
            <TableCell align="right">?????????</TableCell>
            <TableCell align="right">????????????</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div className="d-flex justify-content-center mt-5">
        <div>
            <Button size="small" style={{height:"30px", width:"30px"}}> First </Button>
        </div>
        <div className="d-flex justify-content-center" style={{flex:"8"}} >
            <Pagination count={30} variant="outlined" shape="rounded" />
        </div>
        <div>
            <Button size="small" style={{height:"30px", width:"30px"}}> End </Button>
        </div>
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

      <DialogTitle id="alert-dialog-title" className="d-flex justify-content-center mt-3"><strong>{"????????? ???????????? ????????? ??????"}</strong></DialogTitle>

      <DialogContent>
        <DialogContentText>
            <label style={{color:"#000"}}> ????????? ?????????</label> <br />
            <input 
                type="text" 
                name="email" 
                className="text-fields" 
                placeholder="admin03"
                style={{width: "400px"}}
            />
          
        </DialogContentText>
        <DialogContentText>
            <label style={{color:"#000"}}> ????????????</label> <br />
            <input 
                type="text" 
                className="text-fields" 
                placeholder="????????? ??????????????? ??????????????????."
                style={{width: "400px"}}
            />
          
        </DialogContentText>
      </DialogContent>
        
        <DialogActions className="d-flex justify-content-center mb-5">
          <Button onClick={handleAutoClose} style={{backgroundColor:"#076D42", color:"#fff", width:"150px", height:"auto"}}>
            ?????? ??????
          </Button>
          <Button onClick={handleAutoClose} style={{backgroundColor:"#0500FF", color: "#fff", width:"150px", height:"auto"}}>
            ??????
          </Button>
        </DialogActions>
    </Dialog>



        </div>
    );
}