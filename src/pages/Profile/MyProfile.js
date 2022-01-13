import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import Button from "@material-ui/core/Button";
import { getAnAdmin } from "actions/admin";
import { editAdmin } from "actions/admin";

export default function MyProfile() {
  const [admin, setAdmin] = useState({
    admin_id: "",
    name: "",
    mobile: "",
    department: "",
    password: ""
  });

  useEffect(() => {
    getAnAdmin(localStorage.getItem("admin")).then((res) => {
      setAdmin(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...admin, ...{ [name]: value } };
    setAdmin(formData);
  };

  const editUser = () => {
    editAdmin(admin, localStorage.getItem("admin"));
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>내 프로필</div>
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
            value={admin.admin_id}
            disabled
            onChange={handleChange}
            fullwidth
            style={{ width: "300px" }}
          />
        </div>
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 관리자 이름</label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="이름을 입력해주세요."
            variant="outlined"
            value={admin.name}
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
            onChange={(e) => (admin.mobile = e)}
            value={admin.mobile}
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
            name="department"
            onChange={handleChange}
            fullwidth
            value={admin.department}
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
            type="password"
            onChange={handleChange}
            //value={admin.password}
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
        <div className="col-lg-1">
          <Button
            onClick={editUser}
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto"
            }}
            variant="contained"
            color="primary"
          >
            저장
          </Button>
        </div>
        <div className="col-lg-1">
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
        </div>
        <div className="col-lg-10"></div>
      </div>
    </div>
  );
}
