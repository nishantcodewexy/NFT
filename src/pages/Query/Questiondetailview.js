import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
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
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import isEmpty from "../../lib/isEmpty";
import { getsingledetails } from "../../actions/users";
import config from "../../lib/config";

const Smartcontract = config.Smartcontract;
const OwnerAddr = config.OwnerAddr;
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

const useStyles = makeStyles(styles);

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

const initialFormValue = {
  address: "",
  email: "",
  question: ""
};

export default function EditCategory() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  const [accounts, setaccount] = React.useState(0);
  const [tokenbalance, setTokenbalance] = React.useState(0);
  const [bnbbalance, setBNBbalance] = React.useState(0);
  const [categoryurl, setImage] = React.useState("");
  const [list, setlist] = useState([]);
  const [categoryname, setCategoryname] = useState("");
  const [catdata, setcatdata] = useState("");

  const [selectedOption, setselectedOption] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    getdetails();
  }, []);

  function editR(id) {
    if (id != "") {
      window.location = "//replymail/" + id;
    }
  }

  async function getdetails() {
    var inputdata = {
      id: Id
    };
    var data = await getsingledetails(inputdata);
    console.log(data.result.data, "=============================getgetget");
    setlist(data.result.data);
  }

  const back = async () => {
    window.location.href = "//question";
  };
  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } };
    setFormValue(formData);
  };

  const { address, email, question } = formValue;

  return (
    <div>
      <div className="page_header">
        <button className="btn btn-success mr-3" onClick={() => back()}>
          Back
        </button>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>View Token</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      value={
                        list && list[0] && list[0].address
                          ? list[0].address
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Emil"
                      id="email"
                      value={
                        list &&
                        list[0] &&
                        list[0].emailinfo &&
                        list[0].emailinfo &&
                        list[0].emailinfo.email
                          ? list[0].emailinfo.email
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Question"
                      id="question"
                      value={
                        list && list[0] && list[0].question
                          ? ReactHtmlParser(list[0].question)
                          : ""
                      }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              {list &&
                list[0] &&
                list[0].emailinfo &&
                list[0].emailinfo &&
                list[0].emailinfo.email &&
                list[0].emailinfo.email != "" &&
                list[0].emailinfo.email != null &&
                list[0].emailinfo.email != undefined && (
                  <CardFooter>
                    <Button
                      color="primary"
                      onClick={() =>
                        editR(
                          list &&
                            list[0] &&
                            list[0].emailinfo &&
                            list[0].emailinfo &&
                            list[0].emailinfo.email
                            ? list[0].emailinfo.email
                            : ""
                        )
                      }
                      type="button"
                    >
                      Reply
                    </Button>
                  </CardFooter>
                )}
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
