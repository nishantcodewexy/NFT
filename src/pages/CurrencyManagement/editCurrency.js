import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import material ui
import { Select } from '@material-ui/core';

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
import { MenuItem, InputLabel } from '@material-ui/core';


// import action
import { updateCurrency, getSingleCurrency } from '../../actions/currency'

// import lib
import fileObjectUrl from '../../lib/fileObjectUrl';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';

const styles = theme => ({
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
});

const initialFormValue = {
  'currencyType': '',
  'currencyName': '',
  'currencySymbol': '',
  'withdrawFee': '',
  'minabi': '',   // if token
  'contractAddress': '',  // if token
  'bankName': '',  // if fiat
  'name': '',  // if fiat
  'accountNo': '', // if fiat
  'routingNo': '', // if fiat
  'photo': "",
  // 'currencyId':''
}
const useStyles = makeStyles(styles);

const EditCurrency = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { currencyId } = useParams();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const {
    currencyType,
    currencyName,
    currencySymbol,
    withdrawFee,
    minabi,
    contractAddress,
    bankName,
    name,
    accountNo,
    routingNo,
    photo,
  } = formValue


  // function

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleFile = (event) => {
    const { name, files } = event.target;
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let reqData = new FormData();
      reqData.append('currencyId', currencyId);
      reqData.append('currencyType', currencyType);
      reqData.append('currencyName', currencyName);
      reqData.append('currencySymbol', currencySymbol);
      reqData.append('withdrawFee', withdrawFee);
      reqData.append('minabi', minabi);
      reqData.append('contractAddress', contractAddress);
      reqData.append('bankName', bankName);
      reqData.append('name', name);
      reqData.append('accountNo', accountNo);
      reqData.append('routingNo', routingNo);
      reqData.append('photo', photo);

      const { status, loading, messages, error } = await updateCurrency(reqData);
      if (status == 'success') {
        toastAlert('success', messages, 'addCurrency')
        history.push('/currency')
      } else {
        setValidateError(error);
      }
    }
    catch (err) {
    }
  }

  const fetchSingleCurrency = async () => {
    try {
      const { status, loading, error, result } = await getSingleCurrency(currencyId);
      if (status == 'success') {
        let data = {
          'currencyType': result.type,
          'currencyName': result.currencyName,
          'currencySymbol': result.currencySymbol,
          'withdrawFee': result.withdrawFee,
          'minabi': result.minABI,
          'contractAddress': result.contractAddress,
          'bankName': result.bankDetails.bankName,
          'name': result.bankDetails.name,
          'accountNo': result.bankDetails.accountNo,
          'routingNo': result.bankDetails.routingNo,
          'photo': result.currencyimage,
        }
        setFormValue(data)
      } else { }
    } catch (err) { }
  }

  useEffect(() => {
    fetchSingleCurrency();
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form method="POST" className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Update Currency</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="custom_select">
                      <InputLabel id="demo-controlled-open-select-label">currencyType</InputLabel>
                      <Select
                        className="d-block"
                        labelText="Currency Symbol"
                        name="currencyType"
                        value={currencyType}
                        onChange={handleChange}
                      >
                        <MenuItem value="fiat">Fiat</MenuItem>
                        <MenuItem value="crypto">Crypto</MenuItem>
                        <MenuItem value="token">Token</MenuItem>
                      </Select>
                    </div>

                    {
                      validateError.type && <span className={classes.textDanger}>{validateError.type}</span>
                    }

                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Currency Name"
                      name="currencyName"
                      value={currencyName}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.currencyName && <span className={classes.textDanger}>{validateError.currencyName}</span>
                    }
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Currency Symbol"
                      name="currencySymbol"
                      value={currencySymbol}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.currencySymbol && <span className={classes.textDanger}>{validateError.currencySymbol}</span>
                    }
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Withdraw Fee"
                      name="withdrawFee"
                      value={withdrawFee}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.withdrawFee && <span className={classes.textDanger}>{validateError.withdrawFee}</span>
                    }
                  </GridItem>

                  {
                    currencyType == 'token' && (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Min ABI"
                          name="minabi"
                          value={minabi}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.minabi && <span className={classes.textDanger}>{validateError.minabi}</span>
                        }
                      </GridItem>
                    )
                  }

                  {
                    currencyType == 'token' && (
                      <GridItem xs={12} sm={12} md={4} >
                        <CustomInput
                          labelText="Contract Address"
                          name="contractAddress"
                          value={contractAddress}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.contractAddress && <span className={classes.textDanger}>{validateError.contractAddress}</span>
                        }
                      </GridItem>

                    )
                  }


                  {
                    currencyType == 'fiat' && (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Bank Name"
                          name="bankName"
                          value={bankName}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.bankName && <span className={classes.textDanger}>{validateError.bankName}</span>
                        }
                      </GridItem>
                    )
                  }

                  {
                    currencyType == 'fiat' && (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                        }
                      </GridItem>
                    )
                  }

                  {
                    currencyType == 'fiat' && (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Account Number"
                          name="accountNo"
                          value={accountNo}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.accountNo && <span className={classes.textDanger}>{validateError.accountNo}</span>
                        }
                      </GridItem>
                    )
                  }

                  {
                    currencyType == 'fiat' && (
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Routing Number"
                          name="routingNo"
                          value={routingNo}
                          onChange={handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        {
                          validateError.routingNo && <span className={classes.textDanger}>{validateError.routingNo}</span>
                        }
                      </GridItem>
                    )
                  }

                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Currency Image"
                      onChange={handleFile}
                      name="photo"
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <img src={fileObjectUrl(photo)} width="50" height="50" />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  type="submit"
                >
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

export default EditCurrency;