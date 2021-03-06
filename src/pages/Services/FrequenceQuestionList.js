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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      <div className="mx-3 mx-md-5 noticeList_wrap">
        <div style={{ fontWeight: "700", fontSize: "40px", color: "#000"}}>???????????? ??????</div>

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
                ??????
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
            ????????? ?????? ??????
          </div>
          <div className="col-sm-12 col-lg-2 my-2 registrationdate">
            <TextField
              variant="outlined"
              id="date"
              type="text"
              name="from"
              onChange={handleChange}
              placeholder="?????????"
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
              placeholder="?????????"
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
              <InputLabel id="fre_select_1">=??????=`</InputLabel>
                <Select
                  labelId="fre_select_1"
                  id="fre-select-1"
                  label="=??????=`"
                  name="category"
                  onChange={handleChange}
                >
                  <MenuItem value="">=????????????==</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className="col-sm-12 ml-2 my-2 statusData1">
            <FormControl className="cm_select_box" variant="outlined">
                <InputLabel id="fre_list_select_3">=??????=</InputLabel>
                  <Select
                    labelId="fre_list_select_3"
                    id="fre-simple-select-3"
                    label="=??????="
                    name="usage"
                    onChange={handleChange}
                  >
                    <MenuItem value="">=????????????=</MenuItem>
                    <MenuItem value="?????????">?????????</MenuItem>
                    <MenuItem value="????????????">????????????</MenuItem>
                  </Select>
              </FormControl>
            <TextField
              id="filled-select-currency"
              placeholder="??????????????? ??????????????????."
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
              onClick={handleClickOpen}
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
              onClick={handleClickOpenHistory}
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
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">?????? </TableCell>
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">????????????</TableCell>
                <TableCell align="center">??????</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question &&
                question
                  .filter((val) => {
                    if (serach.from === "") {
                      return val;
                    } else if (val.created_at.includes(serach.from)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.to === "") {
                      return val;
                    } else if (val.updated_at.includes(serach.to)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.category === "") {
                      return val;
                    } else if (val.category.includes(serach.category)) {
                      return val;
                    }
                  })
                  .filter((val) => {
                    if (serach.usage === "") {
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
                            ?????????
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
