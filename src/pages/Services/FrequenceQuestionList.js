import React, { useState, useEffect } from "react";
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
import { getAllQuestions } from "actions/frequentQuestions";

export default function FrequenceQuestionList() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [question, setQuestion] = useState();

  const [pages, setPages] = useState(1);
  const [size, setSize] = useState();
  const [newPage, setNewPage] = useState();

  const [serach, setSearch] = useState({
    from: "",
    to: "",
    category: "",
    usage: "",
    option: "",
    text: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenHistory = () => {
    setOpen2(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  useEffect(() => {
    getAllQuestions().then((res) => {
      setQuestion(res);
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
    <div>
      <div className="mx-3 mx-md-5">
        <div style={{ fontWeight: "700", fontSize: "40px" }}>공지사항 목록</div>

        <div style={{ display: "flex", margin: "2% 0" }}>
          <div style={{ flex: "1" }}>
            <Link to="/frequent-register">
              <Button
                className="px-5"
                style={{
                  border: "1px solid #000",
                  color: "#000",
                  outline: "none",
                  backgroundColor: "#fff"
                }}
                variant="contained"
              >
                등록
              </Button>
            </Link>
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
              label="시작일"
              name="from"
              onChange={handleChange}
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
              color: "#fff",
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
              name="category"
              placeholder="=상태="
              variant="outlined"
              onChange={handleChange}
              style={{ width: "150px", margin: "0 5px" }}
            >
              <MenuItem value="">=카테고리==</MenuItem>
              <MenuItem value="일반">일반</MenuItem>
              <MenuItem value="서포트">서포트</MenuItem>
              <MenuItem value="거래">거래</MenuItem>
              <MenuItem value="수수료">수수료</MenuItem>
            </TextField>

            <TextField
              id="filled-select-currency"
              select
              placeholder="=상태="
              variant="outlined"
              name="usage"
              onChange={handleChange}
              style={{ width: "150px" }}
            >
              <MenuItem value="">=검색옵션=</MenuItem>
              <MenuItem value="사용함">사용함</MenuItem>
              <MenuItem value="사용안함">사용안함</MenuItem>
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
              onClick={handleClickOpen}
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
              onClick={handleClickOpenHistory}
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
                <TableCell align="center">카테고리</TableCell>
                <TableCell align="center">질문 </TableCell>
                <TableCell align="center">사용여부</TableCell>
                <TableCell align="center">등록일시</TableCell>
                <TableCell align="center">수정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question &&
                question
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
                    if (serach.category == "") {
                      return val;
                    } else if (val.category.includes(serach.category)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.usage == "") {
                      return val;
                    } else if (val.usage.includes(serach.usage)) {
                      return val;
                    }
                  })
                  .map((quiz, index) => (
                    <TableRow key={quiz.frequent_id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{quiz.category}</TableCell>
                      <TableCell align="center">{quiz.questions}</TableCell>
                      <TableCell align="center">{quiz.usage}</TableCell>
                      <TableCell align="center">
                        {quiz.created_at.split("T")[0]}
                        {"  "}
                        {quiz.created_at.split("T")[1].split(".")[0]}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/frequent-edit/${quiz.frequent_id}`}>
                          <Button
                            style={{
                              backgroundColor: "#fff",
                              color: "#5376FF",
                              padding: "8px 16px",
                              outline: "none",
                              border: "1px solid #5376FF"
                            }}
                          >
                            초기화
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
              setAdmin={(question) => setQuestion(question)}
              getList={getAllQuestions}
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
    </div>
  );
}
