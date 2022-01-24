import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { getANotice, EditANotice } from "actions/notice.action";

export default function EditNotice() {
  const { id } = useParams();

  const [notices, setNotices] = useState({
    title: "",
    usage: "",
    views: null,
    content: ""
  });

  useEffect(() => {
    getANotice(id).then((res) => {
      setNotices(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let noticeData = { ...notices, ...{ [name]: value } };
    setNotices(noticeData);
  };

  const handleSubmit = () => {
    EditANotice(notices, id).then((res) => {
      res.status === "success" && alert("Sucessfully updated.");
    });
  };

  return (
    <div className="mx-3 mx-md-5 EditNotice_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px", color: "#000" }}>공지의 편집</div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 공지사항 제목</label> <br />
          <TextField
            variant="outlined"
            id="date"
            name="title"
            onChange={handleChange}
            value={notices.title}
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
            value={notices.views}
            variant="outlined"
            onChange={handleChange}
            id="date"
            name="views"
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
            onChange={handleChange}
            name="content"
            value={notices.content}
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
