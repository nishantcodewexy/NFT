import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "components/Paginations/Pagination";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useEffect } from "react";
import { addNewExpose } from "actions/expose.action";
import { getAllExposes, deleteAExpose } from "actions/expose.action";
import { stoppedChange } from "actions/nft.action";
import { getAllNFT } from "actions/nft.action";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopularList() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9)
  ];

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [open3, setOpen3] = React.useState(false);

  const [nfts, setNFTs] = useState();

  const [expose, setExpose] = useState();

  const [change, setChange] = useState(false);

  const [stop, setStop] = useState({
    admin_id: localStorage.getItem("admin"),
    password: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(14);

  const [userId, setUserId] = useState();

  const [message, setMessage] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenHistory = () => {
    setOpen2(true);
  };

  const handleOpenDelete = (id) => {
    setOpen3(true);
    setUserId(id);
  };

  const handleAutoClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  useEffect(() => {
    getAllNFT().then((res) => {
      setNFTs(res);
      console.log(res);
    });
    getAllExposes().then((res) => {
      setExpose(res);
    });
  }, [change]);

  const renderingFunction = () => {
    change === true ? setChange(false) : setChange(true);
  };

  const handleChangeStopped = (e) => {
    const { name, value } = e.target;
    let formData = { ...stop, ...{ [name]: value } };
    setStop(formData);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPost - postsPerPage;
  const currentPosts =
    expose && expose.slice(indexOfFirstPage, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mx-3 mx-md-5 popularList_wrap">
        <div style={{ fontWeight: "700", fontSize: "40px" }} className="popularList_title">
          ?????? ??????????????? ??????
        </div>

        <div style={{ display: "flex", margin: "2% 0" }}>
          <div style={{ flex: "1" }}>
            <Button
              style={{
                border: "2px solid #5376FF",
                color: "#5376FF",
                outline: "none",
                whiteSpace: "nowrap"
              }}
              variant="contained"
              onClick={handleClickOpen}
            >
              ?????? ??????????????? ??????
            </Button>
          </div>
          <div style={{ flex: "8" }}></div>
        </div>

        
        <div
          className="align-items-center cm_sub_title"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div style={{color: "#000", fontWeight: "700" }}>
            ????????? ?????? ??????
          </div>
        </div>

        <div
          className="align-items-center mt-2 p-0 statusWrap statusWrap_1"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div></div>
          <div className="col-sm-12  my-2 statusData1">
            <FormControl className="cm_select_box" variant="outlined">
              <InputLabel id="member_list_select_5">=??????=</InputLabel>
                <Select
                  labelId="member_list_select_5"
                  id="member-simple-select-5"
                  label="=??????="
                  // onChange={handleChange}
                >
                  <MenuItem>=????????????=</MenuItem>
                  <MenuItem>?????????</MenuItem>
                  <MenuItem>??????</MenuItem>
                </Select>
            </FormControl>
            <TextField
              id="filled-select-currency"
              placeholder="??????????????? ??????????????????."
              variant="outlined"
              fullwidth="true"
            />
          </div>
          <div className="col-sm-6  my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              ??????{" "}
            </Button>
          </div>
          <div className="col-sm-6 my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#5376FF",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              ?????????{" "}
            </Button>
          </div>
        </div>

        <div style={{ fontWeight: "500" }}>Total : 14 Count (1/1)Page</div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#E5E5E5" }}>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell align="center">PK</TableCell>
                <TableCell align="center">NFT ?????????</TableCell>
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">?????????</TableCell>
                <TableCell align="center">?????????</TableCell>
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">??????</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts &&
                currentPosts.map((user, index) => (
                  <TableRow key={index + 1}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.nftName}</TableCell>
                    <TableCell align="center">{user.category}</TableCell>
                    <TableCell align="center">{user.originator}</TableCell>
                    <TableCell align="center">{user.originator}</TableCell>
                    <TableCell align="center">{user.owner}</TableCell>
                    <TableCell align="center">
                      {user.created_at.split("T")[0]}
                      {"  "}
                      {user.created_at.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          handleOpenDelete(user.nft_id);
                        }}
                        style={{
                          backgroundColor: "#5376FF",
                          color: "#fff",
                          padding: "0 2px",
                          outline: "none"
                        }}
                      >
                        {" "}
                        ??????{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="d-flex justify-content-center mt-5">
          <div>
            <Button size="small" style={{ height: "30px", width: "30px" }}>
              {" "}
              First{" "}
            </Button>
          </div>
          <div className="d-flex justify-content-center" style={{ flex: "8" }}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={expose && expose.length}
              paginate={paginate}
            />
          </div>
          <div>
            <Button size="small" style={{ height: "30px", width: "30px" }}>
              {" "}
              End{" "}
            </Button>
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
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-center mt-3"
        >
          <strong>{"?????? ??????????????? ??????"}</strong>
        </DialogTitle>

        <DialogContent>
          <div
            className="align-items-center mt-2"
            style={{ fontWeight: "700", display: "flex" }}
          >
            <div style={{ flex: "6" }}></div>
            <div style={{ flex: "5", color: "#000", fontWeight: "700" }}>
              <TextField
                id="filled-select-currency"
                select
                placeholder="=??????="
                variant="outlined"
                style={{ width: "150px" }}
              >
                <MenuItem>=????????????=</MenuItem>
                <MenuItem>?????????</MenuItem>
                <MenuItem>??????</MenuItem>
              </TextField>
            </div>
            <div style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                placeholder="??????????????? ??????????????????."
                variant="outlined"
                fullwidth="true"
              />
            </div>
            <div style={{ flex: "1" }}>
              <Button
                style={{
                  backgroundColor: "#5376FF",
                  color: "#fff",
                  padding: "0 2px"
                }}
                onClick={handleClickOpen}
              >
                {" "}
                ??????{" "}
              </Button>
            </div>
            <div style={{ flex: "1" }}>
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#5376FF",
                  padding: "0 2px"
                }}
              >
                {" "}
                ?????????{" "}
              </Button>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead
                style={{
                  backgroundColor: "#E5E5E5"
                }}
              >
                <TableRow style={{ fontSize: "15px !important" }}>
                  <TableCell>NO</TableCell>
                  <TableCell align="right">PK</TableCell>
                  <TableCell align="right">NFT ?????????</TableCell>
                  <TableCell align="right">????????????</TableCell>
                  <TableCell align="right">????????????</TableCell>
                  <TableCell align="right">?????????</TableCell>
                  <TableCell align="right">????????????</TableCell>
                  <TableCell align="right">??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nfts &&
                  nfts.map((nft, index) => (
                    <TableRow key={index + 1}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">{nft.nftName}</TableCell>
                      <TableCell align="right">{nft.originator}</TableCell>
                      <TableCell align="right">{nft.owner}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            addNewExpose(nft).then((res) => {
                              res.status === "success" && alert("Success");
                              renderingFunction();
                            });
                          }}
                          style={{
                            backgroundColor: "#5376FF",
                            color: "#fff",
                            padding: "0 2px",
                            outline: "none"
                          }}
                        >
                          {" "}
                          ??????{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogContent>
          <div className="d-flex justify-content-center mt-5">
            <div>
              <Button size="small" style={{ height: "30px", width: "30px" }}>
                {" "}
                First{" "}
              </Button>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ flex: "8" }}
            >
              <Pagination count={6} variant="outlined" shape="rounded" />
            </div>
            <div>
              <Button size="small" style={{ height: "30px", width: "30px" }}>
                {" "}
                End{" "}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-center mt-3"
        >
          <strong>{"?????? ??????????????? ?????? ????????? ??????"}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> ????????? ?????????</label> <br />
            <input
              type="text"
              name="email"
              className="text-fields"
              placeholder="admin03"
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> ????????????</label> <br />
            <input
              type="text"
              className="text-fields"
              placeholder="????????? ??????????????? ??????????????????."
              style={{ width: "400px" }}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "150px",
              height: "auto"
            }}
          >
            ?????? ??????
          </Button>
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#0500FF",
              color: "#fff",
              width: "150px",
              height: "auto"
            }}
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-center mt-3"
        >
          <strong>{"????????? ???????????? ????????? ??????"}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> ????????? ?????????</label> <br />
            <input
              type="text"
              name="admin_id"
              value={stop.admin_id}
              className="text-fields"
              placeholder="admin03"
              disabled
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> ????????????</label> <br />
            <input
              type="password"
              name="password"
              className="text-fields"
              value={stop.password}
              onChange={handleChangeStopped}
              placeholder="????????? ??????????????? ??????????????????."
              style={{ width: "400px" }}
            />
            {message && <p style={{ color: "red" }}>Password is incorrect</p>}
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={() => {
              stoppedChange(stop, userId)
                .then((res) => {
                  res.error === true
                    ? setMessage("Password is incorrect")
                    : deleteAExpose(userId).then((res) => {
                        alert(res.message);
                        renderingFunction();
                        handleAutoClose();
                      });
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "150px",
              height: "auto",
              outline: "none"
            }}
          >
            ?????? ??????
          </Button>
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#0500FF",
              color: "#fff",
              width: "150px",
              height: "auto",
              outline: "none"
            }}
          >
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
