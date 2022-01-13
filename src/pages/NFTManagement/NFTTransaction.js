import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "components/Paginations/Pagination";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import TableToExcel from "react-html-table-to-excel";

import "../../style/login.css";
import historyImage from "../../images/item_3.png";
import { getAllNFT, stoppedChange } from "actions/nft.action";
import { getAnAdmin } from "actions/admin";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NFTTransaction() {
  const [nft, setNFT] = useState();

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

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(14);

  const [serach, setSearch] = useState({
    from: "",
    to: "",
    category: "",
    option: "",
    text: ""
  });

  // const [admin, setAdmin] = useState([]);
  const [stop, setStop] = useState({
    admin_id: localStorage.getItem("admin"),
    password: ""
  });

  const [nftId, setNftId] = useState();

  const [message, setMessage] = useState();
  const page = 1;
  const limit = 20;

  /*useEffect(() => {
    getAllNFT().then((data) => {
      console.log("Data " + data);
      //setNFT(data);
    });
  }, []);
*/

  useEffect(() => {
    console.log("HJHJHDJ");
    fetch("http://139.64.237.139:4000/api/user/art-work?page=1&limit=20")
      .then((response) => response.json())
      .then((data) => setNFT(data.data.data));
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setNftId(id);
  };

  const handleClickOpenHistory = () => {
    setOpen2(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  console.log(nft);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPost - postsPerPage;
  //const currentPosts = nft.slice(indexOfFirstPage, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...serach, ...{ [name]: value } };
    setSearch(formData);
  };

  const handleChangeStopped = (e) => {
    const { name, value } = e.target;
    let formData = { ...stop, ...{ [name]: value } };
    setStop(formData);
  };

  const clearText = () => {
    setSearch({ ...serach, ...{ text: "", option: "" } });
  };

  const changeToStop = () => {
    stoppedChange(stop, nftId)
      .then((res) => {
        res.error === true
          ? setMessage("Password is incorrect")
          : window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div className="mx-3 mx-md-5">
        <div style={{ fontWeight: "700", fontSize: "40px" }}>NFT 목록</div>

        <div style={{ display: "flex", margin: "2% 0" }}>
          <div style={{ flex: "1" }}>
            <TableToExcel
              className="excel-download-button"
              table="nft-table"
              sheet="Sheet"
              filename="Nft-details"
              buttonText="EXCEL 다운로드"
            />
          </div>
          <div style={{ flex: "8" }}></div>
        </div>

        <div
          className="align-items-center"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div style={{ flex: "7", margin: "0 10px" }}></div>
          <div style={{ margin: "0 10px", color: "#000", fontWeight: "700" }}>
            등록일 기간 검색
          </div>
          <div style={{ margin: "0 0 0 10px" }}>
            <TextField
              variant="outlined"
              id="date"
              type="date"
              name="from"
              onChange={handleChange}
              label="시작일"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#A9ABB0",
              width: "55px",
              height: "55px",
              borderRadius: "3px",
              textAlign: "center"
            }}
          >
            ~
          </div>

          <div>
            <TextField
              variant="outlined"
              id="date"
              type="date"
              label="종료일"
              name="to"
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              style={{ width: "150px", margin: "0 5px" }}
              name="category"
              value={serach.category}
              onChange={handleChange}
            >
              <MenuItem value=""> </MenuItem>
              <MenuItem value="게임">=게임=</MenuItem>
              <MenuItem value="예술">예술</MenuItem>
              <MenuItem value="트레이딩 카드">트레이딩 카드</MenuItem>
              <MenuItem value="음악">음악</MenuItem>
              <MenuItem value="도메인 이름">도메인 이름</MenuItem>
              <MenuItem value="짤">짤</MenuItem>
              <MenuItem value="수집품">수집품</MenuItem>
            </TextField>
          </div>
        </div>

        <div
          className="align-items-center mt-2"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div style={{ flex: "6" }}></div>
          <div style={{ flex: "5", color: "#000", fontWeight: "700" }}>
            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              style={{ width: "150px", margin: "0 5px" }}
            >
              <MenuItem>=상태=</MenuItem>
              <MenuItem>활성</MenuItem>
              <MenuItem>비활성</MenuItem>
            </TextField>

            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              style={{ width: "150px" }}
            >
              <MenuItem>=검색옵션=</MenuItem>
              <MenuItem>아이디</MenuItem>
              <MenuItem>이름</MenuItem>
            </TextField>
          </div>
          <div style={{ flex: "3" }}>
            <TextField
              id="filled-select-currency"
              placeholder="검색옵션을 선택해주세요."
              variant="outlined"
              fullwidth
            />
          </div>
          <div style={{ flex: "1" }}>
            <Button
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px"
              }}
            >
              {" "}
              검색{" "}
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
              초기화{" "}
            </Button>
          </div>
        </div>

        <div style={{ fontWeight: "500" }}>Total : 14 Count (1/1)Page</div>

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            id="nft-table"
          >
            <TableHead style={{ backgroundColor: "#E5E5E5" }}>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell align="center">PK</TableCell>
                <TableCell align="center">category</TableCell>
                <TableCell align="center">NFT name(artwork name)</TableCell>

                <TableCell align="center">Creator</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="center">owner</TableCell>
                <TableCell align="center">Sales Coin</TableCell>
                <TableCell align="center">Price(current)</TableCell>

                <TableCell align="center">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nft &&
                nft
                  .filter((val) => {
                    if (serach.from == "") {
                      return val;
                    } else if (val.created_at.includes(serach.from)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.to == "") {
                      return val;
                    } else if (val.updated_at.includes(serach.to)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.category_name == "") {
                      return val;
                    } else if (val.category_name.includes(serach.category)) {
                      return val;
                    }
                  })
                  .map((nft, index) => (
                    <TableRow key={nft.art_work_id}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="center">{index}</TableCell>
                      <TableCell align="center">{nft.category_name}</TableCell>
                      <TableCell align="center">{nft.title}</TableCell>

                      <TableCell align="center">
                        {nft.creator.creator_nickname}
                      </TableCell>
                      <TableCell align="center">{nft.form_of_sale}</TableCell>
                      <TableCell align="center">
                        {nft.current_owner.current_owner_email}
                      </TableCell>
                      <TableCell align="center">{nft.coin_name}</TableCell>
                      <TableCell align="center">{nft.sale_price}</TableCell>

                      <TableCell align="center">
                        {nft.created_at.split("T")[0]}
                        {"  "}
                        {nft.created_at.split("T")[1].split(".")[0]}
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
              totalPosts={nft && nft.length}
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
          <strong>{"아바타 거래중지 관리자 확인"}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> 관리자 아이디</label> <br />
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
            <label style={{ color: "#000" }}> 비밀번호</label> <br />
            <input
              type="password"
              name="password"
              className="text-fields"
              value={stop.password}
              onChange={handleChangeStopped}
              placeholder="관리자 비밀번호를 입력해주세요."
              style={{ width: "400px" }}
            />
            {message && <p style={{ color: "red" }}>Password is incorrect</p>}
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={changeToStop}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "150px",
              height: "auto",
              outline: "none"
            }}
          >
            거래 중지
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
            닫기
          </Button>
        </DialogActions>
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
          <strong>{"WORK HISTORY"}</strong>
        </DialogTitle>

        <DialogContent>
          <div className="d-flex justify-content-center">
            <img
              src={historyImage}
              style={{ borderRadius: "8px 8px 45px 8px" }}
            />
          </div>
        </DialogContent>

        <DialogContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#E5E5E5" }}>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell align="right">type</TableCell>
                  <TableCell align="right">Seller</TableCell>
                  <TableCell align="right">Buyer</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {index + 1}
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
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5 mt-2">
          <Button
            fullwidth
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#183B56",
              color: "#fff",
              margin: "0 4%"
            }}
          >
            돌아가기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}