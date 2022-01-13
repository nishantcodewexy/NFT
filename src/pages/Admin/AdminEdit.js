// import package
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Transfer } from "antd";

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
import { editAdmin } from "../../actions/admin";

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

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { getAnAdmin } from "./../../actions/admin";
import { Transfefr } from "./TransferComponent";
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
              name="email"
              value={formValue.email}
              fullwidth
              inputProps={{ readOnly: true }}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 이름</label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="이름을 입력해주세요."
              variant="outlined"
              value={formValue.name}
              name="name"
              onChange={handleChange}
              fullwidth
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 휴대폰 번호</label> <br />
            <PhoneInput
              specialLabel=""
              country={"us"}
              value={formValue.mobile}
              onChange={(e) => (formValue.mobile = e)}
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
                                fullwidth
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
            <label style={{ color: "#000" }}> 관리자 담당부서 </label> <br />
            <TextField
              id="filled-select-currency"
              placeholder="영업부"
              variant="outlined"
              value={formValue.department}
              onChange={handleChange}
              name="department"
              fullwidth
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4">
            <label style={{ color: "#000" }}> 관리자 비밀번호</label> <br />
            <TextField
              id="filled-select-currency"
              variant="outlined"
              fullwidth
              name="password"
              onChange={handleChange}
              style={{ width: "300px" }}
            />
          </div>
          <div className="col-lg-4" style={{ width: "300px" }}>
            <FormLabel style={{ color: "#000" }} component="legend">
              관리자 담당상태
            </FormLabel>
            <RadioGroup>
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="활성화 "
                  control={<Radio />}
                  label="활성"
                  name="status"
                  onChange={handleChange}
                />
                <FormControlLabel
                  style={{ color: "#000" }}
                  value="비활성화"
                  control={<Radio />}
                  label="비활성"
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
            <label style={{ color: "#000" }}> 관리자 담당부서 </label> <br />
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

        <TransferList menu={menu} id={id} />

        {/* <div className="mt-5" style={{ fontWeight: "700", fontSize: "30px" }}>
        관리자 메뉴 관리
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
                비권한 메뉴
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
                    관리자 관리{" "}
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
                      관리자 목록
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
                    NFT 관리{" "}
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
                      NFT 목록
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
                      NFT 거래내역
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
                      NFT 카테고리 목록
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
                      NFT 설정
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
                    사이트 관리{" "}
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
                      인기 크리에이터 목록
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
                      메인페이지 노출 상품 목록
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
                      단어 필터링 목록
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
                권한 메뉴
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
                    회원 관리{" "}
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
                      회원 목록
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                      아바타 목록
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                    NFT 관리{" "}
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
                      공지사항 목록
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                      자주하는 질문 목록
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                      일대일 문의 목록
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                    사이트 관리{" "}
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
                      서비스 이용약관 관리
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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
                      개인정보 처리방침 관리
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
                            value="읽기"
                            control={<Radio color="primary" />}
                            label="읽기"
                          />
                          <FormControlLabel
                            style={{ color: "#000" }}
                            value="쓰기"
                            control={<Radio color="primary" />}
                            label="쓰기"
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
                          저장
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

            <p className="message_red">본인 계정의 메뉴정보를 수정한 경우 변경된 권한 적용을 위해 다시 로그인해주세요.</p>
      </form>
    </div>
  );
};

export default AdminEdit;
