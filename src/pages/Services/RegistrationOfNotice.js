import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { addNewnotice } from "actions/notice.action";
import { Link } from "react-router-dom";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function RegistrationOfNotice() {
  // const [open, setOpen] = React.useState(false);

  const [notice, setNotice] = useState({
    title: "",
    usage: "",
    content: "",
    views: null
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleAutoClose = () => {
  //   setOpen(false);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...notice, ...{ [name]: value } };
    setNotice(formData);
  };

  const handleSubmit = () => {
    addNewnotice(notice).then((res) => {
      res.status === "success" && alert("Success");
    });
  };

  return (
    <div className="mx-3 mx-md-5 RegistrationOfNotice_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px", color: "#000" }}>고시 등록</div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 제목</label> <br />
          <TextField
            variant="outlined"
            name="title"
            value={notice.title}
            onChange={handleChange}
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
            variant="outlined"
            id="date"
            name="views"
            value={notice.views}
            onChange={handleChange}
            type="number"
            style={{ width: "100%" }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 내용</label> <br />
          <textarea
            name="content"
            value={notice.content}
            onChange={handleChange}
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
          <FormLabel style={{ color: "#000" }} component="legend" className="label_trangle">
            사용여부
          </FormLabel>
          <RadioGroup className="cm_radio_btn">
            <div style={{ display: "flex" }}>
              <FormControlLabel
                style={{ color: "#000" }}
                value="사용함"
                name="usage"
                onChange={handleChange}
                control={<Radio />}
                label="사용함"
              />
              <FormControlLabel
                style={{ color: "#000" }}
                value="사용안함"
                name="usage"
                onChange={handleChange}
                control={<Radio />}
                label="사용안함"
              />
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <div className="ne_save_btn_wrap">
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

          <Link to="/notice-list">
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
        </div>
      </div>
    </div>
  );
}
