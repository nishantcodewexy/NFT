import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { FormControlLabel } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AvatarRegistration() {
  const [avatar, setAvatar] = useState({
    name: "",
    image: "",
    status: ""
  });

  const [image, setImage] = useState();

  const [id, setId] = useState();

  const [preview, setPreview] = useState(null);

  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formData = { ...avatar, ...{ [name]: value } };
    setAvatar(formData);
    setMessage("");
  };

  function onUpload(e) {
    e.preventDefault();

    console.log(image.length);

    var formData = new FormData();
    formData.append("name", avatar.name);
    formData.append("status", avatar.status);
    for (let key = 0; key < image.length; key++) {
      formData.append("image", image[key]);
    }

    axios
      .post("http://139.64.237.139:4000/api/avatar/register", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((res) => {
        console.log(res);
        setId(res.data.data.avatar.avatar_id);
      });
  }

  const onSubmit = () => {
    if (!avatar.name) {
      setMessage("Fill the name");
    } else if (!avatar.status) {
      setMessage("Fill the status");
    } else {
      var formData = new FormData();
      formData.append("name", avatar.name);
      formData.append("status", avatar.status);
      if (image) {
        for (let key = 0; key < image.length; key++) {
          formData.append("image", image[key]);
        }
      } else {
        setMessage("Fill the image");
      }

      axios
        .put(`http://139.64.237.139:4000/api/avatar/edit/${id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((res) => {
          alert("Success");
          setMessage("");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

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
              <i class="fas fa-caret-right"></i> Avata name
            </label>
            <br />
            <TextField
              required
              id="filled-select-currency"
              placeholder="아바타명을 입력해주세요."
              variant="outlined"
              name="name"
              value={avatar.value}
              onChange={handleChange}
              fullwidth
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <label
              style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}
            >
              {" "}
              <i class="fas fa-caret-right"></i> Avata image File
            </label>
            <div>
              <TextField
                type="file"
                id="filled-select-currency"
                placeholder="선택된 파일 없음"
                variant="outlined"
                required
                name="image"
                onChange={(e) => {
                  setImage(e.target.files);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                fullwidth
                style={{ width: "300px" }}
              />
            </div>
            <div className="mt-4">
              <Button
                onClick={onUpload}
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
            <i class="fas fa-caret-right"></i> Preview
          </label>
          {preview != null ? (
            <img
              style={{
                height: "200px",
                width: "200px",
                border: "0.5px solid #000",
                borderRadius: "4px",
                fontSize: "16px"
              }}
              src={preview}
              className="d-flex justify-content-center align-items-center"
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "200px",
                width: "200px",
                border: "0.5px solid #000",
                borderRadius: "8px",
                fontSize: "16px"
              }}
            >
              none
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 row">
        <div className="col-lg-6"></div>
        <div className="col-lg-6">
          <label style={{ color: "#000", fontWeight: "700", fontSize: "16px" }}>
            {" "}
            <i class="fas fa-caret-right"></i> Status
          </label>{" "}
          <RadioGroup required>
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
      <div>{message}</div>
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
            onClick={onSubmit}
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
        </div>
        <div className="col-lg-1">
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
        <div className="col-lg-10"></div>
      </div>
    </div>
  );
}
