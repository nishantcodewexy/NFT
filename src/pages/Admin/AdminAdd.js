// import package
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel } from "@material-ui/core";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js"

// import action
import { addNewAdmin } from "../../actions/admin";

// import lib
import { toastAlert } from "../../lib/toastAlert";

import TextField from "@material-ui/core/TextField";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

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
        ????????? ?????? & ??????
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="mt-5 row"
          style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
        >
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ?????????</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="???????????? ??????????????????."
              variant="outlined"
              fullwidth="true"
              name="email"
              required
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ??????</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="????????? ??????????????????."
              variant="outlined"
              fullwidth="true"
              name="name"
              required
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ????????? ??????</label> <br />
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
            <label style={{ color: "#000" }}> ????????? ???????????? </label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="?????????"
              variant="outlined"
              fullwidth="true"
              name="department"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ????????????</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth="true"
              type="password"
              name="password"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4" style={{ width: "300px" }}>
            <label style={{ color: "#000" }}> ???????????? ??????</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth="true"
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
              ????????? ????????????
            </FormLabel>
            <RadioGroup>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="?????? "
                  control={<Radio />}
                  label="??????"
                  name="status"
                  onChange={handleChange}
                />
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="?????????"
                  control={<Radio />}
                  label="?????????"
                  name="status"
                  onChange={handleChange}
                />
              </div>
            </RadioGroup>
          </div>
          <div className="col-lg-7">
            <label style={{ color: "#000" }}> ????????? ?????? </label> <br />
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
              ??????
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
                ??????
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
