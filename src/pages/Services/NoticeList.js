import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
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
import Pagination2 from "components/Paginations/Pagination2";
import Slide from "@material-ui/core/Slide";
import { getAllNotices } from "actions/notice.action";

export default function NoticeList() {
  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const classes = useStyles();

  const [pages, setPages] = useState(1);
  const [size, setSize] = useState();
  const [newPage, setNewPage] = useState();

  const [serach, setSearch] = useState({
    from: "",
    to: "",
    used: "",
    option: "",
    text: ""
  });

  const [notice, setNotice] = useState();

  useEffect(() => {
    getAllNotices().then((res) => {
      setNotice(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...serach, ...{ [name]: value } };
    setSearch(formData);
  };

  const clearText = () => {
    setSearch({ ...serach, ...{ text: "", option: "" } });
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>NFT 목록</div>

      <div style={{ display: "flex", margin: "2% 0" }}>
        <div style={{ flex: "1" }}>
          <Link to="/notice-register">
            <Button
              style={{ backgroundColor: "#5376FF" }}
              variant="contained"
              color="primary"
            >
              등록
            </Button>
          </Link>
        </div>
        <div style={{ flex: "8" }}></div>
      </div>

      <div
        className="align-items-center row"
        style={{ fontWeight: "700", display: "flex" }}
      >
        <div
          className="col-sm-12 col-lg-5"
          style={{ flex: "7", margin: "0 10px" }}
        ></div>
        <div
          className="col-sm-12 col-lg-2"
          style={{ color: "#000", fontWeight: "700" }}
        >
          Registration Date Period Search
        </div>
        <div className="col-sm-12 col-lg-2 my-2">
          <TextField
            variant="outlined"
            id="date"
            type="date"
            label="시작일"
            name="from"
            fullWidth
            className="text-box"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div className="col-sm-12 col-lg-1 d-flex justify-content-center">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#A9ABB0",
              width: "55px",
              height: "55px",
              borderRadius: "3px"
            }}
          >
            ~
          </div>
        </div>
        <div className="col-sm-12 col-lg-2 my-3">
          <TextField
            variant="outlined"
            id="date"
            type="date"
            label="종료일"
            name="to"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
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
            name="used"
            placeholder="=상태="
            value={serach.used}
            variant="outlined"
            onChange={handleChange}
            helperText="=사용 여부="
            style={{ width: "150px", margin: "0 5px" }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="사용함">사용함</MenuItem>
            <MenuItem value="사용안함">사용안함</MenuItem>
          </TextField>

          <TextField
            id="filled-select-currency"
            select
            name="option"
            value={serach.option}
            placeholder="=상태="
            variant="outlined"
            helperText="검색옵션"
            onChange={handleChange}
            style={{ width: "150px" }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="상태">Title</MenuItem>
          </TextField>
        </div>
        <div style={{ flex: "3" }}>
          <TextField
            id="filled-select-currency"
            placeholder="검색옵션을 선택해주세요."
            variant="outlined"
            fullwidth
            name="text"
            value={serach.text}
            onChange={handleChange}
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
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="center">PK</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Staus</TableCell>
              <TableCell align="center">Views</TableCell>
              <TableCell align="center">Registered Date</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notice &&
              notice
                .filter((val) => {
                  if (serach.used == "") {
                    return val;
                  } else if (val.usage.includes(serach.used)) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (serach.text == "" || serach.option == "") {
                    return val;
                  } else if (serach.option === "상태") {
                    if (serach.text == "") {
                      return val;
                    } else if (val.title.includes(serach.text)) {
                      return val;
                    }
                  }
                })
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
                .map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{data.title}</TableCell>
                    <TableCell align="center">{data.usage}</TableCell>
                    <TableCell align="center">{data.views}</TableCell>
                    {/*} <TableCell align="center">{data.usage}</TableCell> */}
                    {/*} <TableCell align="center">
                      {data.created_at.split("T")[0]}
                      {"  "}
                      {data.created_at.split("T")[1].split(".")[0]}
                    </TableCell>
                */}
                    <TableCell align="center">
                      {" "}
                      {data.created_at.split("T")[0]}
                      {"  "}
                      {data.created_at.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/notice-edit/${data.notice_id}`}>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#5376FF",
                            padding: "8px 16px",
                            outline: "none",
                            border: "1px solid #5376FF"
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-center mt-5">
        <div style={{ flex: "8" }}>
          <Pagination2
            pages={pages}
            setAdmin={(notice) => setNotice(notice)}
            getList={getAllNotices}
            setSize={(size) => {
              setSize(size);
            }}
            setNewPage={(newPage) => {
              setNewPage(newPage + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
