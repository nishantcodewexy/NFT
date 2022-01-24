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
import { getAllNotices } from "actions/notice.action";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./style.css";

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
    <div className="mx-3 mx-md-5 noticeList_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px", color: "#000" }}>NFT 목록</div>

      <div style={{ display: "flex", margin: "2% 0" }}>
        <div style={{ flex: "1" }}>
          <Link to="/notice-register">
            <Button
              style={{ 
                border: "1px solid #000",
                color: "#000",
                outline: "none",
                backgroundColor: "#fff"
              }}
              variant="contained"
              color="primary"
            >
              등록
            </Button>
          </Link>
        </div>
        <div style={{ flex: "8" }}></div>
      </div>

      <div className="align-items-center row registrationData" style={{ fontWeight: "700" }}>
          <div></div>
          <div
            className="col-sm-12 registrationtitle my-2"
            style={{ color: "#000", fontWeight: "700" }}
          >
            등록일 기간 검색
          </div>
          <div className="col-sm-12 col-lg-2 my-2 registrationdate">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              name="from"
              onChange={handleChange}
              placeholder="시작일"
              className={classes.textField}
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>

          <div className="col-sm-12 col-lg-1 my-2 registrationminus">
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
          </div>
          <div className="col-sm-12 col-lg-2 my-2 registrationdate registrationdate_2">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              placeholder="종료일"
              name="to"
              onChange={handleChange}
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
      </div>


      <div
          className="align-items-center mt-2 p-0 statusWrap statusWrap_1"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div></div>
          <div className="statusData select-box">
            <FormControl className="cm_select_box" variant="outlined">
              <InputLabel id="notic_select_1">사용 여부=</InputLabel>
                <Select
                  labelId="notic_select_1"
                  id="notic-select-1"
                  label="사용 여부="
                  name="used"
                  value={serach.used}
                  onChange={handleChange}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="사용함">사용함</MenuItem>
                  <MenuItem value="사용안함">사용안함</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className="col-sm-12 ml-2 my-2 statusData1">
            <FormControl className="cm_select_box" variant="outlined">
                <InputLabel id="nft_list_select_3">검색옵션</InputLabel>
                  <Select
                    labelId="nft_list_select_3"
                    id="nft-simple-select-3"
                    label="검색옵션"
                    onChange={handleChange}
                    name="option"
                    value={serach.option}
                  >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="상태">Title</MenuItem>
                  </Select>
              </FormControl>
            <TextField
              id="filled-select-currency"
              placeholder="검색옵션을 선택해주세요."
              variant="outlined"
              fullwidth="true"
              name="text"
              value={serach.text}
              onChange={handleChange}
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
              검색{" "}
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
