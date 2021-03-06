import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { getAAvatar } from "../../actions/avatar.action";
import axios from "axios";

export default function AvatarEdit() {
  const { id } = useParams();
  const [avatar, setAvatar] = useState({
    name: "",
    image: "",
    status: ""
  }); 

  const [image, setImage] = useState();

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getAAvatar(id).then((res) => {
      setAvatar(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formData = { ...avatar, ...{ [name]: value } };
    console.log('formData', formData);
    setAvatar(formData);
  };

  console.log(avatar);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(avatar.status);
    console.log(avatar.name);

    if (image) {
      var formData = new FormData();
      formData.append("name", avatar.name);
      formData.append("status", avatar.status);

      console.log(formData);
      for (let key = 0; key < image.length; key++) {
        formData.append("image", image[key]);
      }

      axios
        .put(`http://139.64.237.139:4000/api/avatar/edit/${id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log(res);
          //setId(res.data.data.avatar.avatar_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://139.64.237.139:4000/api/avatar/edit/${id}`, avatar, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log(res);
          //setId(res.data.data.avatar.avatar_id);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(avatar);
    }
  }

  console.log("Avatar image " + image);

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px", lineHeight: "40px" }}>
        Avata registration & Edit
      </div>

      <div
        className="mt-5 row"
        style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
      >
        <div className="col-lg-6">
          <div>
            <label
              style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}
            >
              {" "}
              <i className="fas fa-caret-right"></i> Avata name
            </label>{" "}
            <br />
            <TextField
              id="filled-select-currency"
              placeholder="??????????????? ??????????????????."
              variant="outlined"
              name="name"
              value={avatar.name}
              onChange={handleChange}
              fullwidth="true"
              style={{ width: "300px" }}
            />
          </div>
          
          <div className="mt-4">
            <label
              style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}
            >
              {" "}
              <i className="fas fa-caret-right"></i> Avata image File
            </label>{" "}
            <br />
            <div>
              <TextField
                type="file"
                id="filled-select-currency"
                placeholder="????????? ?????? ??????"
                variant="outlined"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                fullwidth="true"
                style={{ width: "300px" }}
              />
            </div>
            <div className="mt-4">
              <Button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#5376FF",
                  width: "200px",
                  height: "auto"
                }}
                variant="contained"
                color="primary"
              >
                Select file
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <label style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}>
            {" "}
            <i className="fas fa-caret-right"></i> Preview
          </label>{" "}
          {preview == null ? (
            <img
              src={avatar.image}
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "200px",
                width: "200px",
                border: "1px solid #000",
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          ) : (
            <img
              style={{
                height: "200px",
                width: "200px",
                border: "1px solid #000",
                borderRadius: "4px",
                fontSize: "16px"
              }}
              src={preview}
              className="d-flex justify-content-center align-items-center"
            />
          )}
        </div>
      </div>
      <div className="mt-5 row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <label style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}>
            {" "}
            <i className="fas fa-caret-right"></i> Status
          </label>{" "}
          <RadioGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                style={{ color: "#000" }}
                value="true"
                name="status"
                onChange={handleChange}
                control={<Radio />}
                label="used"
              />
              <FormControlLabel
                style={{ color: "#000" }}
                value="false"
                name="status"
                onChange={handleChange}
                control={<Radio />}
                label="not used"
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
        }}
      >
        <div className="col">
          <div className="ne_save_btn_wrap">
            <Link to="/admin-list">
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#5376FF",
                width: "100px",
                height: "auto"
              }}
              variant="contained"
              color="primary"
            >
              save
            </Button>
          </Link>
          <Link to="/avatar-list">
            <Button
              style={{
                border: "1px solid #5376FF",
                color: "#5376FF",
                width: "100px",
                height: "auto",
                backgroundColor: "transparent"
              }}
              variant="contained"
              color="primary"
            >
              List
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
