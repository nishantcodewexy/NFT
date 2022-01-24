import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastAlert } from "../../lib/toastAlert";

import { getcategory, updatecategory } from "../../actions/users";

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
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  phonenumber: "",
  phoneCode: "",
};

const useStyles = makeStyles(styles);

export default function Categoryedit(props) {
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

  const { category } = formValue;

  useEffect(() => {
    getcategorys();
  }, []);

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
    //console.log("saran");
    e.preventDefault();
    console.log(formValue);

    let reqData = {
      category,
      userId,
    };
    console.log(reqData);
    var data = await updatecategory(reqData);
    toastAlert("success", data.result.data.message, "category");
    window.location = "//categorylist";
  };

  let formdata = {};
  const getcategorys = async () => {
    var data = {
      id: userId,
    };
    var test = await getcategory(data);
    formdata["category"] = test.result.data.category;
    setFormValue(formdata);
  };

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
                <h4 className={classes.cardTitleWhite}>Update Category</h4>
                {/* <p className={classes.cardCategoryWhite}>Create a new user</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      onChange={onChange}
                      id="category"
                      value={category}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">
                  Update
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
