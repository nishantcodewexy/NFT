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
import config from "../../actions/config";

import { getproductdetails } from "./../../actions/emailTemplate";

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

export default function Burnview(props) {
  const classes = useStyles();
  const history = useHistory();
  const [toched, setToched] = useState({});

  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  const [selectitem, setselectitem] = useState("");

  const { tokenId } = useParams();
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

  const handlePhoneNumber = (value, country) => {};
  const handleBlurPhone = (e) => {
    setToched({ ...toched, ...{ phoneNo: true, phoneCode: true } });
  };
  const back = async (e) => {
    e.preventDefault();

    window.location = "//burn";
  };

  let formdata = {};

  async function getcategorys() {
    var data = {
      id: tokenId,
    };
    var res = await getproductdetails(data);
    var item = res.result.data.data[0];
    setselectitem(item);
    console.log(item, "myitem=========================");
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Details</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Name"
                      id="category"
                      value={
                        selectitem &&
                        selectitem.tokendetails &&
                        selectitem.tokendetails.tokenName
                          ? selectitem.tokendetails.tokenName
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Creator"
                      id="category"
                      value={
                        selectitem && selectitem.tokenOwner
                          ? selectitem.tokenOwner
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Owner"
                      id="category"
                      value={
                        selectitem &&
                        selectitem.tokendetails &&
                        selectitem.tokendetails.tokenOwner
                          ? selectitem.tokendetails.tokenOwner
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    {selectitem && selectitem.fixed == 1 && (
                      <CustomInput
                        labelText="Type"
                        id="category"
                        value="Fixed Auction"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        disabled
                      />
                    )}
                    {selectitem && selectitem.timed && selectitem.timed == 1 && (
                      <CustomInput
                        labelText="Type"
                        id="category"
                        value="Timed Auction"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        disabled
                      />
                    )}
                    {selectitem &&
                      selectitem.timerev &&
                      selectitem.timerev == 1 && (
                        <CustomInput
                          labelText="Type"
                          id="category"
                          value="Reverse Auction"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          disabled
                        />
                      )}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Date"
                      id="category"
                      value={
                        selectitem && selectitem.timestamp
                          ? selectitem.timestamp
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <a
                      href={
                        selectitem && selectitem._id
                          ? config.frontUrl + "info/" + selectitem._id
                          : ""
                      }
                    >
                      <CustomInput
                        labelText="Link"
                        id="category"
                        value={
                          selectitem && selectitem._id
                            ? config.frontUrl + "info/" + selectitem._id
                            : ""
                        }
                        formControlProps={{
                          fullWidth: true,
                        }}
                        disabled
                      />
                    </a>
                  </GridItem>
                </GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <img
                    src={
                      selectitem &&
                      selectitem.tokendetails &&
                      selectitem.tokendetails.ipfsimage
                        ? "https://ipfs.io/ipfs/" +
                          selectitem.tokendetails.ipfsimage
                        : ""
                    }
                    width="500"
                    height="500"
                  />
                </GridItem>
                <GridContainer></GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="button" onClick={back}>
                  Back
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
