import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import { getAQuestion } from "actions/frequentQuestions";
import { useParams } from "react-router-dom";
import { EditAQuestion } from "actions/frequentQuestions";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditFrequance() {
  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState({
    questions: "",
    category: "",
    answer: "",
    usage: ""
  });

  const { id } = useParams();

  useEffect(() => {
    getAQuestion(id).then((res) => {
      setQuestion(res);
    });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    const questionData = { ...question, ...{ [name]: value } };
    setQuestion(questionData);
  };

  const handleSubmit = () => {
    EditAQuestion(question, id).then((res) => {
      res.status === "success" && alert("Success");
      setQuestion({
        questions: "",
        category: "",
        answer: "",
        usage: ""
      });
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>공지사항 등록</div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 제목</label> <br />
          <TextField
            variant="outlined"
            id="date"
            name="questions"
            value={question.questions}
            onChange={onChange}
            style={{ width: "100%" }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 조회수</label> <br />
          <TextField
            id="filled-select-currency"
            select
            name="category"
            placeholder="=상태="
            variant="outlined"
            value={question.category}
            onChange={onChange}
            style={{ width: "100%" }}
          >
            <MenuItem value="">=카테고리==</MenuItem>
            <MenuItem value="일반">일반</MenuItem>
            <MenuItem value="서포트">서포트</MenuItem>
            <MenuItem value="거래">거래</MenuItem>
            <MenuItem value="수수료">수수료</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 내용</label> <br />
          <textarea
            name="answer"
            value={question.answer}
            onChange={onChange}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              height: "200px",
              boder: "1px solid #000",
              borderRadius: "8px"
            }}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-6">
          <FormLabel style={{ color: "#000" }} component="legend">
            사용여부
          </FormLabel>
          <RadioGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                style={{ color: "#000" }}
                value="사용함"
                name="usage"
                onChange={onChange}
                control={<Radio />}
                label="사용함"
              />
              <FormControlLabel
                style={{ color: "#000" }}
                value="사용안함"
                name="usage"
                onChange={onChange}
                control={<Radio />}
                label="사용안함"
              />
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-1">
          <Button
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto",
              outline: "none"
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            저장
          </Button>
        </div>
        <div className="col-lg-1">
          <Link to="/frequent-list">
            <Button
              style={{
                border: "1px solid #5376FF",
                color: "#5376FF",
                width: "100px",
                height: "auto",
                outline: "none",
                backgroundColor: "transparent"
              }}
              variant="contained"
              color="primary"
            >
              목록
            </Button>
          </Link>
        </div>
        <div className="col-lg-10"></div>
      </div>
    </div>
  );
}
