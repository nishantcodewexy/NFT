// import package
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// @material-ui/core

import { FormControlLabel } from "@material-ui/core";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon
} from "@material-ui/icons";

// import InputLabel from "@material-ui/core/InputLabel";
// core components
import Button from "components/CustomButtons/Button.js";

//import avatar from "assets/img/faces/marc.jpg";

// import action
import { editAdmin } from "../../actions/admin";

// import lib
import { toastAlert } from "../../lib/toastAlert";

import TextField from "@material-ui/core/TextField";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

import { getAnAdmin } from "./../../actions/admin";
import TransferList from "./TransferMat";

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

const AdminEdit = (props) => {
  // state

  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    name: "",
    mobile: "",
    email: "",
    department: "",
    password: "",
    confirm_password: "",
    status: "",
    notes: ""
  });

  const [menu, setMenu] = useState({
    admin_list: null,
    category_list: null,
    nft_list: null,
    nft_settings: null,
    transaction_history: null
  });

  useEffect(() => {
    getAnAdmin(id)
      .then((res) => {
        setFormValue(res);
        console.log(res.menu);
        setMenu(res.menu);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await editAdmin(formValue, id);
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
    <div className="mx-3 mx-md-5 admin_edit">
      <div style={{ fontWeight: "700", fontSize: "30px" }}>
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
              name="email"
              value={formValue.email}
              fullwidth="true"
              inputProps={{ readOnly: true }}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ??????</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="????????? ??????????????????."
              variant="outlined"
              value={formValue.name}
              name="name"
              onChange={handleChange}
              fullwidth="true"
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ????????? ??????</label> <br />
            <PhoneInput
              specialLabel=""
              country={"us"}
              value={formValue.mobile}
              onChange={(e) => {
                formValue.mobile = e;
                console.log(formValue.mobile);
              }}
              style={{
                borderRadius: "8px",
                backgroundColor: "transparent",
                padding: "0% 0",
                height: "40px"
              }}
            />
            {/*<OutlinedInput
                        id="outlined-adornment-amount"
                        
                        startAdornment={
                        <InputAdornment position="start">
                            <TextField
                                id="filled-select-currency"
                                placeholder="KOR +82"
                                select
                                variant="outlined"
                                fullwidth="true"
                                style={{width:"80px"}}
                            >
                                <MenuItem>
                                    KOR +82
                                </MenuItem>
                                <MenuItem>
                                    SL +94
                                </MenuItem>

                            </TextField>

                            </InputAdornment>}
                        labelWidth={80}
                    />
                   */}
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
              value={formValue.department}
              onChange={handleChange}
              name="department"
              fullwidth="true"
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> ????????? ????????????</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth="true"
              name="password"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4" style={{ width: "300px" }}>
            <FormLabel style={{ color: "#000" }} component="legend" className="label_trangle">
              ????????? ????????????
            </FormLabel>
            <RadioGroup className="cm_radio_btn">
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="????????? "
                  control={<Radio />}
                  label="??????"
                  name="status"
                  onChange={handleChange}
                />
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="????????????"
                  control={<Radio />}
                  label="?????????"
                  name="status"
                  onChange={handleChange}
                />
              </div>
            </RadioGroup>
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
          <div className="col-lg-6">
            <label style={{ color: "#000" }}> ????????? ???????????? </label> <br />
            <textarea
              name="notes"
              value={formValue.notes}
              onChange={handleChange}
              style={{
                height: "100px",
                width: "100%",
                backgroundColor: "transparent",
                borderRadius: "6px"
              }}
            />
          </div>
          <div className="col-lg-6"></div>
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
          <div className="col cm_edit_btn">
            <div >
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
            <div>
              <Link to="/admin-list">
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
                  ??????
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ fontWeight: "700", fontSize: "30px" }} className="mt-5 mb-3">
          ????????? ?????? ??????
        </div>
        <TransferList menu={menu} id={id} />

        {/* <div className="mt-5" style={{ fontWeight: "700", fontSize: "30px" }}>
        ????????? ?????? ??????
      </div>

      <div className="mt-2" style={{ fontWeight: "700", fontSize: "30px" }}>
        <div className="mt-2 row">
          <div className="col-lg-4">
            <div style={{ border: "1px solid #C4C4C4", borderRadius: "12px" }}>
              <div
                className="mb-2 d-flex align-items-center"
                style={{
                  backgroundColor: "#C4C4C4",
                  height: "50px",
                  borderRadius: "12px 12px 0 0",
                  color: "183B56",
                  fontSize: "20px",
                  paddingLeft: "5%",
                }}
              >
                ????????? ??????
              </div>

              <div className="px-4 mt-4">
                <div className="mt-2">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    ????????? ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ????????? ??????
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    NFT ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      NFT ??????
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      NFT ????????????
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      NFT ???????????? ??????
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      NFT ??????
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    ????????? ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ?????? ??????????????? ??????
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{  
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ??????????????? ?????? ?????? ??????
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ?????? ????????? ??????
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            //Second column start
          }
          <div className="col-lg-8">
            <div style={{ border: "1px solid #C4C4C4", borderRadius: "12px" }}>
              <div
                className="mb-2 d-flex align-items-center"
                style={{
                  backgroundColor: "#C4C4C4",
                  height: "50px",
                  borderRadius: "12px 12px 0 0",
                  color: "183B56",
                  fontSize: "20px",
                  paddingLeft: "5%",
                }}
              >
                ?????? ??????
              </div>

              <div className="px-4 mt-4">
                <div className="mt-2">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    ?????? ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ?????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ????????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    NFT ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ???????????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ???????????? ?????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ????????? ?????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    style={{
                      color: "#183B56",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    ????????? ??????{" "}
                  </label>{" "}
                  <br />
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ????????? ???????????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <Checkbox />
                    </div>
                    <div
                      className="my-2"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "2%",
                        flex: "4",
                      }}
                    >
                      ???????????? ???????????? ??????
                    </div>
                    <div
                      className="my-2 d-flex"
                      style={{
                        border: "1px solid #C4C4C4",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "0.5% 2%",
                        flex: "4",
                      }}
                    >
                      <RadioGroup>
                        <div style={{ display: "flex" }}>
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                          />
                        </div>
                      </RadioGroup>
                      <div style={{ flex: "2", textAlign: "right" }}>
                        <Button
                          style={{
                            backgroundColor: "#5376FF",
                            width: "100px",
                            height: "auto",
                          }}
                          variant="contained"
                          color="primary"
                        >
                          ??????
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Add New Admin</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Name"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                                        }
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
                                        }
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
                                        }
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel>Restriction</InputLabel>
                                        {renderRestrictionList()}

                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" type="submit">ADD</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
            */}

            <p className="message_red">?????? ????????? ??????????????? ????????? ?????? ????????? ?????? ????????? ?????? ?????? ?????????????????????.</p>
      </form>
    </div>
  );
};

export default AdminEdit;
