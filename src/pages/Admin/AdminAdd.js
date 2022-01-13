// import package
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, InputLabel } from "@material-ui/core";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from "@material-ui/icons";

// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

import CheckboxesTags from "./test";

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from "../../lib/isEmpty";

// import action
import { addNewAdmin } from "../../actions/admin";

// import lib
import routes from "../../routes";
import { toastAlert } from "../../lib/toastAlert";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const initialFormValue = {
  name: "",
  mobile: "",
  email: "",
  department: "",
  password: "",
  confirm_password: "",
  status: "",
  notes: ""
};

const useStyles = makeStyles(styles);

const AdminAdd = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);

  // function
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addNewAdmin(formValue);
      console.log(
        result,
        "==========================================savedresult"
      );
      if (result && result.status == "success") {
        toastAlert("success", "Saved Successfully", "addAdmin");
        window.location = "/admin-list";
      } else {
        toastAlert("error", "Email already Exist", "addAdmin");
      }
    } catch (err) {
      toastAlert("error", "Error occured Try again Later", "addAdmin");
    }
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>
        관리자 등록 & 수정
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="mt-5 row"
          style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
        >
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 아이디</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="아이디를 입력해주세요."
              variant="outlined"
              fullwidth
              name="email"
              required
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 이름</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="이름을 입력해주세요."
              variant="outlined"
              fullwidth
              name="name"
              required
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 휴대폰 번호</label> <br />
            <PhoneInput
              inputProps={{ required: true }}
              specialLabel=""
              country={"us"}
              onChange={(e) => (formValue.mobile = e)}
              style={{
                borderRadius: "8px",
                backgroundColor: "transparent",
                padding: "0% 0",
                height: "40px"
              }}
            />
          </div>
        </div>

        <div
          className="row mt-5"
          style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
        >
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 담당부서 </label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="영업부"
              variant="outlined"
              fullwidth
              name="department"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 비밀번호</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth
              type="password"
              name="password"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4" style={{ width: "300px" }}>
            <label style={{ color: "#000" }}> 비밀번호 확인</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth
              type="password"
              name="confirm_password"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
        </div>

        <div
          className="row mt-5"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4">
            <FormLabel style={{ color: "#000" }} component="legend">
              관리자 담당상태
            </FormLabel>
            <RadioGroup>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="활성 "
                  control={<Radio />}
                  label="활성"
                  name="status"
                  onChange={handleChange}
                />
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="비활성"
                  control={<Radio />}
                  label="비활성"
                  name="status"
                  onChange={handleChange}
                />
              </div>
            </RadioGroup>
          </div>
          <div className="col-lg-7">
            <label style={{ color: "#000" }}> 관리자 메모 </label> <br />
            <textarea
              name="notes"
              onChange={handleChange}
              style={{
                height: "100px",
                width: "95%",
                backgroundColor: "transparent",
                borderRadius: "6px"
              }}
            />
          </div>
        </div>

        <div
          className="row mt-5"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-1">
            <Button
              type="submit"
              style={{
                backgroundColor: "#5376FF",
                width: "100px",
                height: "auto",
                outline: "none"
              }}
              variant="contained"
              color="primary"
            >
              저장
            </Button>
          </div>
          <div className="col-lg-1">
            <Link to="/admin-list">
              <Button
                style={{
                  border: "1px solid #5376FF",
                  color: "#5376FF",
                  width: "100px",
                  height: "auto",
                  backgroundColor: "transparent",
                  outline: "none"
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
      </form>
    </div>
  );
};

export default AdminAdd;
