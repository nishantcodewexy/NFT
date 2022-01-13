import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import action
import { addCurrency } from '../../actions/currency';

// import lib
import { toastAlert } from '../../lib/toastAlert';

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
}

const useStyles = makeStyles(styles);

const AddCurrency = () => {
  const classes = useStyles();
  const history = useHistory();

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

      const { status, loading, messages, error } = await addCurrency(reqData);
      if (status == 'success') {
        toastAlert('success', messages, 'addCurrency')
        history.push('/currency')
      } else {
        setValidateError(error);
      }
    } catch (err) {
    }
  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>New Currency</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="custom_select">
                      <InputLabel id="demo-controlled-open-select-label">Currency Type</InputLabel>
                      <Select
                        className="d-block"
                        name="currencyType"
                        value={currencyType}
                        onChange={handleChange}
                      >
                        <MenuItem value="fiat">Fiat</MenuItem>
                        <MenuItem value="crypto">Crypto</MenuItem>
                        <MenuItem value="token">Token</MenuItem>
                      </Select>

                      {
                        validateError.currencyType && <span className={classes.textDanger}>{validateError.currencyType}</span>
                      }
                    </div>
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
                      onChange={handleChange}
                      value={withdrawFee}
                      name="withdrawFee"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.withdrawFee && <span className={classes.textDanger}>{validateError.withdrawFee}</span>
                    }
                  </GridItem>


                  {currencyType == 'token' && (
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Min ABI"
                        name="minabi"
                        onChange={handleChange}
                        value={minabi}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      {
                        validateError.minabi && <span className={classes.textDanger}>{validateError.minabi}</span>
                      }
                    </GridItem>
                  )}
                  {currencyType == 'token' && (
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

                  )}

                  {currencyType == 'fiat' && (
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
                  )}
                  {currencyType == 'fiat' && (
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
                  )}
                  {currencyType == 'fiat' && (
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
                  )}
                  {currencyType == 'fiat' && (
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
                  )}
                  {/* </div> */}
                </GridContainer>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Currency Image"
                      name="photo"
                      onChange={handleFile}
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.photo && <span className={classes.textDanger}>{validateError.photo}</span>
                    }
                    {/* <img src={image.photo} width="50" height="30" /> */}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">ADD</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default AddCurrency;