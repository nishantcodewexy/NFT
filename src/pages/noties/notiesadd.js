import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PhoneInput from "react-phone-input-2";
import { MenuItem } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastAlert } from "../../lib/toastAlert";
import Select from "@material-ui/core/Select";
import { Editor } from "@tinymce/tinymce-react";
//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from "../../lib/isEmpty";

import { getcategory, addnoties } from "../../actions/users";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const initialFormValue = {
  title: "",
  category: "",
  message: "",
  email: "",
  phonenumber: "",
  phoneCode: "",
};

const useStyles = makeStyles(styles);

export default function Categoryadd(props) {
  const classes = useStyles();
  const history = useHistory();
  const [toched, setToched] = useState({});

  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { userId } = useParams();
  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } };
    setFormValue(formData);
    console.log(formValue);
  };

  const { title, category, message } = formValue;

  useEffect(() => {}, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const onchangeeditor = (e) => {
    let formData = { ...formValue, ...{ ["message"]: e } };
    setFormValue(formData);
    console.log(formValue);
  };

  const handlePhoneNumber = (value, country) => {
    const { dialCode } = country;
    let phoneNo = value;
    let formData = formValue;
    if (dialCode) {
      formData = {
        ...formData,
        ...{
          phoneCode: dialCode,
          phoneNo: phoneNo.slice(dialCode.length),
        },
      };
    } else if (value) {
      formData = { ...formData, ...{ phoneNo } };
    }
    setFormValue(formData);
  };
  const handleBlurPhone = (e) => {
    setToched({ ...toched, ...{ phoneNo: true, phoneCode: true } });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue, "================formvalue");
    let reqData = {
      title,
      category,
      message,
    };
    console.log(reqData);
    var data = await addnoties(reqData);

    toastAlert("success", "Added Successfully", "success");
    window.location = "//noties";
  };

  let formdata = {};

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleFormSubmit}
            >
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Noties</h4>
                {/* <p className={classes.cardCategoryWhite}>Create a new user</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      onChange={onChange}
                      id="title"
                      value={title}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={3}>
                    <InputLabel id="demo-controlled-open-select-label">Token Type</InputLabel>
                      <Select
                        className="d-block"
                        name="category"
                        value={category}
                        onChange={handleChange}
                      >
                        <MenuItem value="Art">Art</MenuItem>
                        <MenuItem value="Music">Music</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                        <MenuItem value="Picture">Picture</MenuItem>
                        <MenuItem value="Spot Market">Spot Market</MenuItem>
                        <MenuItem value="Virtual Estate">Virtual Estate</MenuItem>
                        <MenuItem value="Game">Game</MenuItem>
                        <MenuItem value="Webtoon">Webtoon</MenuItem>
                        <MenuItem value="Animation">Animation</MenuItem>
                      </Select>
                  </GridItem> */}
                </GridContainer>
                <GridContainer>
                  <Editor
                    apiKey="j2crzkts7ankhknggcx4ku2xkuiaxsiruhwg1e01cfwvmbpq"
                    initialValue="<p>This is the initial content of the editor</p>"
                    value={message}
                    onEditorChange={onchangeeditor}
                    id="content"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo code | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                    }}
                  />
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
