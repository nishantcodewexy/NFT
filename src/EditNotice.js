import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormControlLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  });

export default function EditNotice(){

     const [open, setOpen] = React.useState(false);

     const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  }

    return(
        <div className="mx-3 mx-md-5">
            <div style={{fontWeight:"700", fontSize:"40px"}}>
                공지사항 등록
            </div>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <label style={{color:"#000"}}> 공지사항 제목</label> <br />
                    <TextField
                        variant="outlined"
                        id="date"
                        style={{width:"100%"}}
                        InputLabelProps={{
                        shrink: true,                    
                        }}
                    />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-6">
                    <label style={{color:"#000"}}> 공지사항 조회수</label> <br />
                    <TextField
                        variant="outlined"
                        id="date"
                        style={{width:"100%"}}
                        InputLabelProps={{
                        shrink: true,                    
                        }}
                    />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-6">
                <label style={{color:"#000"}}> 공지사항 내용</label> <br />
                    <textarea style={{width: "100%", backgroundColor:"transparent", height:"200px", boder:"1px solid #000", borderRadius:"8px"}} />
                </div>
            </div>

             <div className="row mt-5">
                <div className="col-lg-6">
               <FormLabel style={{color:"#000"}} component="legend">사용여부</FormLabel>
                <RadioGroup>
                    <div style={{display:"flex"}}>
                        <FormControlLabel style={{color:"#000"}} value="사용함" control={<Radio />} label="사용함" />
                        <FormControlLabel style={{color:"#000"}} value="사용안함" control={<Radio />} label="사용안함" />
                    </div>
                </RadioGroup>
                </div>
            </div>
           
            <div className="row mt-5">
                <div className="col-lg-1">
                <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary"  onClick={handleClickOpen} >
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
         {/*}   <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >

      <DialogTitle id="alert-dialog-title" className="d-flex justify-content-center mt-3"><strong>{"특정 IP 발행 차단하기"}</strong></DialogTitle>

      <DialogContent>
        <DialogContentText>
            <label style={{color:"#000"}}> 관리자 아이디</label> <br />
            <input 
                type="text" 
                name="email" 
                className="text-fields" 
                placeholder="admin03"
                style={{width: "400px"}}
            />
          
        </DialogContentText>
        <DialogContentText>
            <label style={{color:"#000"}}> 비밀번호</label> <br />
            <input 
                type="text" 
                className="text-fields" 
                placeholder="관리자 비밀번호를 입력해주세요."
                style={{width: "400px"}}
            />
          
        </DialogContentText>
        <DialogContentText>
            <label style={{color:"#000"}}> 추가 차단할 IP</label> <br />
            <input 
                type="text" 
                className="text-fields" 
                placeholder="차단할 IP를 입력해주세요."
                style={{width: "400px"}}
            />
          
        </DialogContentText>
      </DialogContent>
        
        <DialogActions className="d-flex justify-content-center mb-5">
          <Button onClick={handleAutoClose} style={{backgroundColor:"#076D42", color:"#fff", width:"150px", height:"auto"}}>
            거래 중지
          </Button>
          <Button onClick={handleAutoClose} style={{backgroundColor:"#0500FF", color: "#fff", width:"150px", height:"auto"}}>
            닫기
          </Button>
        </DialogActions>
    </Dialog>
    */}
        </div>
    );
}