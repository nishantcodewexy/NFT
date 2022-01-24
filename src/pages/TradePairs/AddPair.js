import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputLabel, Select } from '@material-ui/core';

// import InputLabel from "@material-ui/core/InputLabel";
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
import { addSpotPair } from '../../actions/tradePair';
import { getCurrencyDropDown } from '../../actions/currency';


// import lib
import { toastAlert } from '../../lib/toastAlert'

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
    'maxquantity': "",
    'minquantity': "",
    'secondCurrencyId': "",
    'firstCurrencyId': "",
    'maker_rebate': "",
    'taker_fees': "",
    'markup': "",
    'minimumValue': '',
    "botstatus": "Off"
}

const useStyles = makeStyles(styles);

const AddPair = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const [currencyOption, setCurrencyOption] = useState([])

    const {
        maxquantity,
        minquantity,
        mark_price,
        secondCurrencyId,
        firstCurrencyId,
        maker_rebate,
        taker_fees,
        botstatus,
        markup,
        minimumValue
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

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let reqData = {
            maxquantity,
            minquantity,
            mark_price,
            secondCurrencyId,
            firstCurrencyId,
            maker_rebate,
            taker_fees,
            botstatus,
            markup,
            minimumValue
        }
        let { status, loading, error, result } = await addSpotPair(reqData);

        if (status == 'success') {
            toastAlert('success', 'New Currency Details added', 'addSpotPair')
            history.push('/tradePairs')
        } else {
            setValidateError(error);
        }
    }

    useEffect(() => {
        fetchCurrency()
    }, [])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Add Spot Pair</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4} >

                                        <CustomInput
                                            labelText="Taker Fees"
                                            name="taker_fees"
                                            onChange={handleChange}
                                            value={taker_fees}
                                            formControlProps={{
                                                fullWidth: true
                                            }}

                                        />

                                        {
                                            validateError.taker_fees && <p className={'error-message'}>{validateError.taker_fees}</p>
                                        }
                                    </GridItem>

                                    {/*                                     <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Market Price"
                                            name="mark_price"
                                            onChange={handleChange}
                                            value={mark_price}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.mark_price && <p className={'error-message'}>{validateError.mark_price}</p>
                                        }
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Maker Rebate"
                                            onChange={handleChange}
                                            value={maker_rebate}
                                            name="maker_rebate"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.maker_rebate && <p className={'error-message'}>{validateError.maker_rebate}</p>
                                        }
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Max Order Quantity"
                                            onChange={handleChange}
                                            value={maxquantity}
                                            name="maxquantity"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.currencyName && <p className={'error-message'}>{validateError.currencyName}</p>
                                        }
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Min Order Quantity"
                                            onChange={handleChange}
                                            value={minquantity}
                                            name="minquantity"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.minquantity && <p className={'error-message'}>{validateError.minquantity}</p>
                                        }
                                    </GridItem>

                                    {/*                       </GridContainer>
                                <GridContainer> */}
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">First Currency</InputLabel>
                                            <Select
                                                className="d-block"
                                                labelText="First Currency"
                                                name="firstCurrencyId"
                                                onChange={handleChange}
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
                                            validateError.firstCurrencyId && <p className={'error-message'}>{validateError.firstCurrencyId}</p>
                                        }

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">Second Currency</InputLabel>
                                            <Select
                                                className="d-block"
                                                labelText="Second Currency"
                                                name="secondCurrencyId"
                                                onChange={handleChange}
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
                                            validateError.secondCurrencyId && <p className={'error-message'}>{validateError.secondCurrencyId}</p>
                                        }
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">Binance Integration</InputLabel>
                                            <Select
                                                className="d-block"
                                                labelText="Binance Integration"
                                                name="botstatus"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="On">ON</MenuItem>
                                                <MenuItem value="Off">OFF</MenuItem>
                                            </Select>
                                        </div>
                                        {
                                            validateError.botstatus && <p className={'error-message'}>{validateError.botstatus}</p>
                                        }
                                    </GridItem>

                                    {
                                        botstatus == 'On' && <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText="Binance Markup(%)"
                                                onChange={handleChange}
                                                value={markup}
                                                name="markup"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                            {
                                                validateError.markup && <p className={'error-message'}>{validateError.markup}</p>
                                            }
                                        </GridItem>
                                    }

                                    {
                                        botstatus == 'On' && <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText="Binance Min Value"
                                                onChange={handleChange}
                                                value={minimumValue}
                                                name="minimumValue"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />

                                            {
                                                validateError.minimumValue && <p className={'error-message'}>{validateError.minimumValue}</p>
                                            }
                                        </GridItem>
                                    }
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary" type="submit">CREATE</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default AddPair;