import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getACategory } from "actions/nft.action";
import { editCategory } from "actions/nft.action";
import './style.css';

export default function NFTCategoryRegistration() {
  const { id } = useParams();

  const [category, setCategory] = useState({
    category: "",
    usage: ""
  });

  useEffect(() => {
    getACategory(id).then((res) => {
      setCategory(res);
    });
  }, []);

  console.log(category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...category, ...{ [name]: value } };
    setCategory(formData);
  };

  const handleubmit = () => {
    editCategory(category, id).then(() => {
      alert("Updated successfully.");
      window.location.reload();
    });
  };

  return (
    <div className="mx-3 mx-md-5 nftcategoryedit_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px" }} className="nftcategoryedit_title">
        NFT 수정 (카테고리 정보만 변경 가능합니다.)
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <label style={{ color: "#000" }}> 카테고리명</label> <br />
          <TextField
            variant="outlined"
            id="date"
            name="category"
            value={category.category}
            onChange={handleChange}
            className="nft_cat_input"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-12">
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
            onClick={handleubmit}
          >
            저장
          </Button>
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
      </div>
    </div>
  );
}
