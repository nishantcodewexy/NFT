import React, { useEffect, useState } from "react";

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
import {
  getAllQuestions,
  addNewQuestion,
  getAQuestion,
  sendEmail
} from "actions/questions.action";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Pagination2 from "components/Paginations/Pagination2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionList() {
  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [pages, setPages] = useState(1);
  const [size, setSize] = useState();
  const [newPage, setNewPage] = useState();

  const [question, setQuestion] = useState();
  const [newQuestion, setNewQuestion] = useState({
    email: "",
    inquiry: "",
    content: "",
    answer: "",
    isAnswer: ""
  });

  const [serach, setSearch] = useState({
    from: "",
    to: "",
    answered: "",
    option: "",
    text: ""
  });

  const handleClickOpen = (id) => {
    setOpen(true);
    getAQuestion(id).then((res) => {
      setNewQuestion(res[0]);
      console.log(res);
    });
  };

  const handleAutoClose = () => {
    setOpen(false);
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
    console.log(formData);
  };

  const clearText = () => {
    setSearch({ ...serach, ...{ text: "", option: "" } });
  };

  const questionChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...newQuestion, ...{ [name]: value } };
    setNewQuestion(formData);
  };

  const submitQuestion = () => {
    sendEmail(newQuestion)
      .then(() => {
        alert("Email sent.");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="mx-3 mx-md-5">
        <div style={{ fontWeight: "700", fontSize: "40px" }}>
          일대일 문의 목록
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
              color: "white",
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
              name="to"
              onChange={handleChange}
              label="종료일"
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
              helperText="=Status="
              variant="outlined"
              name="answered"
              onChange={handleChange}
              style={{ width: "150px", margin: "0 5px" }}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="true">Answered</MenuItem>
              <MenuItem value="false">not answered</MenuItem>
            </TextField>

            <TextField
              id="filled-select-currency"
              select
              helperText="=Option="
              variant="outlined"
              name="option"
              onChange={handleChange}
              style={{ width: "150px" }}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="name">Nickname</MenuItem>
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
                <TableCell align="center">ID / 닉네임</TableCell>
                <TableCell align="center">1 : 1 문의 제목</TableCell>
                <TableCell align="center">내용</TableCell>
                <TableCell align="center">답변 여부</TableCell>
                <TableCell align="center">문의일시 </TableCell>
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
                    if (serach.answered == "") {
                      return val;
                    } else if (val.isAnswer.includes(serach.answered)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.text == "" || serach.option == "") {
                      return val;
                    } else if (serach.option === "title") {
                      if (serach.text == "") {
                        return val;
                      } else if (val.inquiry.includes(serach.text)) {
                        return val;
                      }
                    } else if (
                      serach.option === "id" ||
                      serach.option === "name"
                    ) {
                      if (serach.text == "") {
                        return val;
                      } else if (val.nickname.includes(serach.text)) {
                        return val;
                      }
                    }
                  })
                  .map((quiz, index) => (
                    <TableRow key={quiz.question_id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{quiz.nickname}</TableCell>
                      <TableCell align="center">{quiz.inquiry}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleClickOpen(quiz.question_id)}
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
                      </TableCell>
                      {quiz.isAnswer == "true" ? (
                        <TableCell align="center"> Answered </TableCell>
                      ) : (
                        <TableCell align="center"> Not answered </TableCell>
                      )}
                      <TableCell align="center">
                        {quiz.created_at.split("T")[0]}
                        {"  "}
                        {quiz.created_at.split("T")[1].split(".")[0]}
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
              setAdmin={(question) => setNewQuestion(question)}
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

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> Email</label> <br />
            <input
              type="text"
              name="email"
              value={newQuestion.email}
              disabled
              className="text-fields"
              placeholder="admin03"
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> Title</label> <br />
            <input
              type="text"
              className="text-fields"
              placeholder="This is Dummy Text"
              name="inquiry"
              disabled
              value={newQuestion.inquiry}
              onChange={questionChange}
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> Content</label> <br />
            <input
              type="text"
              name="content"
              onChange={questionChange}
              value={newQuestion.content}
              disabled
              className="text-fields"
              placeholder="This is Dummy Text"
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> Answer</label> <br />
            <textarea
              onChange={questionChange}
              value={newQuestion.answer}
              name="answer"
              style={{
                height: "100px",
                width: "100%",
                backgroundColor: "transparent",
                borderRadius: "6px"
              }}
              placeholder="This is Dummy Text"
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={submitQuestion}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "150px",
              height: "auto"
            }}
          >
            Reply by Email
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
