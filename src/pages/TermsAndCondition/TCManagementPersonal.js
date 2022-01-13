import { getAllTerms } from "actions/term.action";
import React, { useState, useEffect } from "react";
import Button from "components/CustomButtons/Button.js";
import { EditATerm } from "../../actions/term.action";
import { Link } from "react-router-dom";

export default function TCManagementPersonal() {
  const [terms, setTerms] = useState({
    service: "",
    personal: ""
  });

  const id = terms.term_id;

  useEffect(() => {
    getAllTerms().then((res) => {
      setTerms(res[0]);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let term = { ...terms, ...{ [name]: value } };
    setTerms(term);
    console.log(term);
  };

  const handleClick = () => {
    EditATerm(terms, id).then((res) => {
      res.status === "success" && alert("Success");
    });
  };
  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>
        서비스 이용약관 관리
      </div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 특정 IP 차단</label> <br />
          <div
            className="px-3 py-3"
            style={{ border: "1px solid #000", borderRadius: "8px" }}
          >
            <textarea
              name="personal"
              value={terms.personal}
              onChange={handleChange}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                height: "200px",
                border: "1px solid #000",
                borderRadius: "8px"
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-1">
          <Button
            onClick={handleClick}
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto",
              outline: "none",
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
    </div>
  );
}
