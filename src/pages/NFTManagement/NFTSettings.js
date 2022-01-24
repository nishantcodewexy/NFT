import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from "axios";

 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NFTSettings(){

    const [open, setOpen] = React.useState(false);
    const [nftsettingData, setnftsettingData] = useState(
        {
            fees: {
                transaction_fee: 0,
                platform_fee: 0,
            },
            capacity: "",
            royalty: "",
            admin_fee: "",
            usage: "",
            ip : []
        }
    )

    const capacityHandler = (event) => {
        setnftsettingData({
            ...nftsettingData,
            capacity: event.target.value,
        })
    }

    const ethfeeHandler = (event) => {
        setnftsettingData({
            ...nftsettingData,
            admin_fee: event.target.value,
        })
    }

    const royaltyHandler = (event) => {
        setnftsettingData({
            ...nftsettingData,
            royalty: event.target.value,
        })
    }

    const ethradioHandler = (event) => {
        setnftsettingData({
            ...nftsettingData,
            usage: event.target.value,
        })
    }
    
    useEffect(() => {
        var iparray = [];
        document.querySelectorAll('.ip_list').forEach(function(node) {
            iparray.push(node.innerHTML)
            setnftsettingData({
                ...nftsettingData,
                ip: iparray,
            })
        });
    }, [])

    const nfthandlesubmit = (event) => {
        event.preventDefault();
        const nftresult = axios.post(`${process.env.REACT_APP_SERVER}/api/nft/setting`, nftsettingData)
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    }

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAutoClose = () => {
        setOpen(false);
    }



    return(
        <div className="mx-3 mx-md-5 nft_setting_wrap">
            <form onSubmit={nfthandlesubmit} className='nftsetting'>
                <div style={{fontWeight:"700", fontSize:"40px", color : "#000"}}>
                    NFT 설정 
                </div>
                <div className="row mt-5">
                    <div className="col-xl-6 col-lg-8">
                        <label style={{color:"#000"}}> 파일 업로드 허용 용량(mb)</label> <br />
                        <TextField
                            variant="outlined"
                            id="date"
                            onChange={(event) => {capacityHandler(event)}}
                            style={{width:"100%"}}
                            InputLabelProps={{
                            shrink: true,                    
                            }}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-xl-3 col-lg-4">
                        <FormLabel style={{color:"#000"}} component="legend" className="label_trangle"> ETH 수수료사용여부</FormLabel>
                        <RadioGroup className="cm_radio_btn"
                            onChange={(event) => {ethradioHandler(event)}}
                        >
                            <div style={{display:"flex"}}>
                                <FormControlLabel style={{color:"#000"}} value="사용함" control={<Radio />} label="사용함" />
                                <FormControlLabel style={{color:"#000"}} value="미사용" control={<Radio />} label="사용안함" />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <label style={{color:"#000"}}> ETH 수수료</label> <br />
                        <TextField
                            variant="outlined"
                            id="date"
                            style={{width:"100%"}}
                            onChange={(event) => {ethfeeHandler(event)}}
                            InputLabelProps={{
                            shrink: true,                    
                            }}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-xl-3 col-lg-4">
                        <FormLabel style={{color:"#000"}} component="legend" className="label_trangle"> MATIC 수수료사용여부</FormLabel>
                        <RadioGroup className="cm_radio_btn">
                            <div style={{display:"flex"}}>
                                <FormControlLabel style={{color:"#000"}} value="사용함" control={<Radio />} label="사용함" />
                                <FormControlLabel style={{color:"#000"}} value="사용안함" control={<Radio />} label="사용안함" />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <label style={{color:"#000"}}> MATIC 수수료</label> <br />
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
                    <div className="col-xl-6 col-lg-8">
                        <label style={{color:"#000"}}> NFT 로열티(%)</label> <br />
                        <TextField
                            variant="outlined"
                            id="date"
                            style={{width:"100%"}}
                            onChange={(event) => {royaltyHandler(event)}}
                            InputLabelProps={{
                            shrink: true,                    
                            }}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-xl-6 col-lg-8">
                    <label style={{color:"#000"}}> 특정 IP 차단</label> <br />
                    <div className="p-2 p-sm-3" style={{border:"1px solid #000", borderRadius:"8px"}} >
                        <div className="d-flex py-2">
                            <div style={{flex:"3", fontWeight:"600", fontSize:"20px", color: "#000"}} className='ip_list'>
                                120.123.110.10
                            </div>
                            <div>
                            <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary">
                                삭제
                            </Button>
                            </div>
                        </div>
                        <div className="d-flex py-2">
                            <div style={{flex:"3", fontWeight:"600", fontSize:"20px", color: "#000"}} className='ip_list'>
                                120.110.12.10
                            </div>
                            <div>
                            <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary">
                                삭제
                            </Button>
                            </div>
                        </div>
                        <div className="d-flex py-2">
                            <div style={{flex:"3", fontWeight:"600", fontSize:"20px", color: "#000"}} className='ip_list'>
                                43.7.51.2
                            </div>
                            <div>
                            <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary">
                                삭제
                            </Button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-xl-6 col-lg-8" style={{textAlign:"right"}}>
                        <Button style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary">
                            추가
                        </Button>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 nftsetting_save_btn">
                        <Button type='submit' style={{backgroundColor:"#5376FF", width:"100px", height:"auto"}} variant="contained" color="primary"  onClick={handleClickOpen} >
                            저장
                        </Button>
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
            </form>
        </div>
    );
}