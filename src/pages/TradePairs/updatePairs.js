
import React, { useState, useEffect } from "react";

// import material ui
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, NativeSelect } from '@material-ui/core';

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

// import action
import { getSingleSpotPair, editSpotPair } from '../../actions/tradePair';
import { getCurrencyDropDown } from '../../actions/currency';

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
    'maxquantity': "",
    'minquantity': "",
    'second_currency': "",
    'first_currency': "",
    'maker_rebate': "",
    'taker_fees': "",
    "botstatus": "",
    "mark_price": "",
    'markup': "",
    'minimumValue': '',
    "botstatus": "Off"
}

const useStyles = makeStyles(styles);

export default function UpdatePair(props) {
    const classes = useStyles();
    const history = useHistory();
    const { pairId } = useParams();

    // state
    const [currencyOption, setCurrencyOption] = useState([])
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});


    const {
        maxquantity,
        minquantity,
        mark_price,
        maker_rebate,
        taker_fees,
        botstatus,
        firstCurrencyId,
        secondCurrencyId,
        markup,
        minimumValue
    } = formValue


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let reqData = {
            maxquantity,
            minquantity,
            mark_price,
            firstCurrencyId,
            secondCurrencyId,
            maker_rebate,
            taker_fees,
            botstatus,
            spotPairId: pairId,
            markup,
            minimumValue
        }

        let { status, loading, error, result } = await editSpotPair(reqData);
        if (status == 'success') {
            toastAlert('success', 'Updated Pairs', 'updateSpotPair')
            history.push('/tradePairs')
        } else {
            setValidateError(error);
        }
    }

    // function
    const fetchSingleSpotPair = async () => {
        try {
            const { status, loading, error, result } = await getSingleSpotPair(pairId);
            if (status == 'success') {
                setFormValue(result)
            } else {
            }
        } catch (err) { }
    }

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


    useEffect(() => {
        fetchSingleSpotPair();
        fetchCurrency();
    }, [])


    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>
                                    Edit Trade Pair
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4} >
                                        <CustomInput
                                            labelText="Taker Fees"
                                            onChange={handleChange}
                                            value={taker_fees}
                                            name="taker_fees"
                                            formControlProps={{
                                                fullWidth: true
                                            }}

                                        />

                                        {
                                            validateError.taker_fees && <span className={classes.textDanger}>{validateError.taker_fees}</span>
                                        }
                                    </GridItem>

                                    {/* <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Market Price"
                                            onChange={handleChange}
                                            value={mark_price}
                                            name="mark_price"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {
                                            validateError.mark_price && <span className={classes.textDanger}>{validateError.mark_price}</span>
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
                                            validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
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
                                            validateError.maker_rebate && <span className={classes.textDanger}>{validateError.maker_rebate}</span>
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
                                            validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
                                        }
                                    </GridItem>
         {/*                        </GridContainer>
                                <GridContainer> */}
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">First Currency</InputLabel>
                                            <NativeSelect
                                                className="d-block"
                                                labelText="First Currency"
                                                name="firstCurrencyId"
                                                onChange={handleChange}
                                                value={firstCurrencyId}
                                            >
                                                {
                                                    currencyOption && currencyOption.length > 0 && currencyOption.map((item, key) => {
                                                        return (
                                                            <option
                                                                key={key}
                                                                value={item._id}
                                                            >
                                                                {item.currencySymbol}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </NativeSelect>
                                        </div>
                                        {
                                            validateError.firstCurrencyId && <span className={classes.textDanger}>{validateError.firstCurrencyId}</span>
                                        }

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">Second Currency</InputLabel>
                                            <NativeSelect
                                                className="d-block"
                                                labelText="Second Currency"
                                                name="secondCurrencyId"
                                                onChange={handleChange}
                                                value={secondCurrencyId}
                                            >
                                                {
                                                    currencyOption && currencyOption.length > 0 && currencyOption.map((item, key) => {
                                                        return (
                                                            <option
                                                                key={key}
                                                                value={item._id}
                                                            >
                                                                {item.currencySymbol}
                                                            </option>
                                                        )
                                                    })
                                                }

                                            </NativeSelect>
                                        </div>

                                        {
                                            validateError.secondCurrencyId && <span className={classes.textDanger}>{validateError.secondCurrencyId}</span>
                                        }
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={4}>
                                        <div className="custom_select">
                                            <InputLabel id="demo-controlled-open-select-label">Binance Integration</InputLabel>
                                            <NativeSelect
                                                className="d-block"
                                                labelText="Binance Integration"
                                                name="botstatus"
                                                onChange={handleChange}
                                                value={botstatus}
                                            >
                                                <option value='On'>ON</option>
                                                <option value="Off">OFF</option>
                                            </NativeSelect>
                                        </div>
                                        {
                                            validateError.botstatus && <span className={classes.textDanger}>{validateError.botstatus}</span>
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
                                                validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
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
                                <Button color="primary" type="submit">Update</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
