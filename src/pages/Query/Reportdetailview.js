import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { getreportsingledetails } from "../../actions/users";
import ReactHtmlParser from "react-html-parser";
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

const initialFormValue = {};

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
  const [index, setindex] = React.useState(-1);
  const [categoryname, setCategoryname] = useState("");
  const [catdata, setcatdata] = useState("");
  const [list, setlist] = useState([]);
  const [selectedOption, setselectedOption] = useState(null);
  const { Id, reportid } = useParams();

  useEffect(() => {
    getdetails();
  }, []);

  async function getdetails() {
    var input = {
      id: Id
    };
    var data = await getreportsingledetails(input);
    console.log(data, "=============================getgetget");
    setlist(data.result.data);
    if (
      data &&
      data.result &&
      data.result.data &&
      data.result.data.report &&
      data.result.data.report.length > 0
    ) {
      var indee = data.result.data.report.findIndex(
        (ele) => ele._id == reportid
      );
      console.log(indee, "===============index");
      setindex(indee);
    }
  }

  function editR(id) {
    if (id != "") {
      window.location = "//replymail/" + id;
    }
  }

  const back = async () => {
    window.location.href = "//report";
  };

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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      value={
                        list &&
                        list.report &&
                        list.report.length > 0 &&
                        index != -1 &&
                        list.report[index].address
                          ? list.report[index].address
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      value={
                        list &&
                        list.report &&
                        list.report.length > 0 &&
                        index != -1 &&
                        list.report[index].mail
                          ? list.report[index].mail
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

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Report On"
                      id="report"
                      value={list && list.curraddress ? list.curraddress : ""}
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
                      labelText="Report"
                      id="report"
                      value={
                        list &&
                        list.report &&
                        list.report.length > 0 &&
                        index != -1 &&
                        list.report[index].message
                          ? ReactHtmlParser(list.report[index].message)
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
                list.report &&
                list.report.length > 0 &&
                index != -1 &&
                list.report[index].mail && (
                  <CardFooter>
                    <Button
                      color="primary"
                      onClick={() =>
                        editR(
                          list &&
                            list.report &&
                            list.report.length > 0 &&
                            index != -1 &&
                            list.report[index].mail
                            ? list.report[index].mail
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
