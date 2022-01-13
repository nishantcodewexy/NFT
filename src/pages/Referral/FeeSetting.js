import React, { useEffect, useState } from "react";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, MenuItem, InputLabel, Select } from '@material-ui/core';

// import component
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";

// import action
import { getCurrencyDropDown } from '../../actions/currency';
import { getSetting, updateSetting } from '../../actions/users';

// import lib
import { toastAlert } from '../../lib/toastAlert'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  flexHeader: {
    display: "flex !important",
    justifyContent: "space-between !important",
    alignItems: "center !important"
  },
  btnPrimary: {
    backgroundColor: "#b462c5",
    color: "#ffffff !important",
    padding: "7px 15px",
    fontSize: "12px",
    fontWeight: "700"
  }
};

const initialFormValue = {
  "bonusFee": 0,
  'bonusCurrencyId': ''
}

const useStyles = makeStyles(styles);

const FeeSetting = () => {
  const classes = useStyles();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [currencyOption, setCurrencyOption] = useState([])
  const [validateError, setValidateError] = useState({});

  const {
    bonusFee,
    bonusCurrencyId,
  } = formValue

  // function
  const fetchCurrency = async () => {
    try {
      const { status, loading, error, result } = await getCurrencyDropDown();
      if (status == 'success') {
        setCurrencyOption(result)
      } else { }
    } catch (err) { }
  }

  const fetchSetting = async () => {
    try {
      const { status, loading, error, result } = await getSetting();
      if (status == 'success') {
        setFormValue({
          'bonusFee': result.bonus.amount,
          'bonusCurrencyId': result.bonus.currencyId,
        })
      } else { }
    } catch (err) { }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reqData = {
      bonusFee,
      bonusCurrencyId,
    }
    let { status, loading, error, messages, result } = await updateSetting(reqData);
    if (status == 'success') {
      toastAlert('success', messages, 'feeSetting')
      setFormValue({
        'bonusFee': result.bonus.amount,
        'bonusCurrencyId': result.bonus.currencyId,
      })
    } else {
      setValidateError(error);
    }
  }

  useEffect(() => {
    fetchCurrency();
    fetchSetting();
  }, [])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.flexHeader}>
              <h4 className={classes.cardTitleWhite}>Bonus</h4>
            </div>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} >

                <CustomInput
                  labelText="Amount"
                  name="bonusFee"
                  onChange={handleChange}
                  value={bonusFee}
                  formControlProps={{
                    fullWidth: true
                  }}

                />

                {
                  validateError.bonusFee && <p className={'error-message'}>{validateError.bonusFee}</p>
                }
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <div className="custom_select">
                  <InputLabel id="demo-controlled-open-select-label">Currency</InputLabel>
                  <Select
                    className="d-block"
                    labelText="Currency"
                    name="bonusCurrencyId"
                    onChange={handleChange}
                    value={bonusCurrencyId}
                  >
                    {
                      currencyOption && currencyOption.length > 0 && currencyOption.map((item, key) => {
                        return (
                          <MenuItem
                            key={key}
                            value={item._id}
                          >
                            {item.currencySymbol}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </div>

                {
                  validateError.bonusCurrencyId && <p className={'error-message'}>{validateError.bonusCurrencyId}</p>
                }

              </GridItem>
            </GridContainer>

          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Paper>
    </div >
  )
}

export default FeeSetting;
