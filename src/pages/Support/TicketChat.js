import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Paper, Button } from '@material-ui/core';
import {
    Edit as EditIcon,
    Visibility as VisibilityIcon
} from '@material-ui/icons';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// import action
import { getTicketData, getTicketMessage, replyMessage } from '../../actions/support';

// import lib
import { replyValidation } from './validation';
import { firstLetterCase } from '../../lib/capitalize';
import isEmpty from '../../lib/isEmpty';

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
const useStyles = makeStyles(styles);

const initialFormValue = {
    'message': '',
}

const TicketChat = (props) => {
    const classes = useStyles();
    const { ticketId } = useParams();

    // state
    const [detail, setDetail] = useState([])
    const [messageList, setMessageList] = useState([])
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});

    const { message } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        setValidateError(replyValidation(formData))
    }

    const fetchTicketChart = async () => {
        try {
            let reqData = {
                ticketId
            }
            const { status, loading, error, result } = await getTicketMessage(reqData)
            if (status == 'success') {
                setMessageList(result)
            }
        } catch (err) { }
    }

    const fetchTicketData = async () => {
        try {
            const { status, loading, error, result } = await getTicketData(ticketId)
            if (status == 'success') {
                setDetail(result)
            }
        } catch (err) { }
    }

    const handleSubmit = async () => {
        let reqData = {
            message,
            'receiverId': detail.userId,
            'ticketId': ticketId
        }

        try {
            const { status, loading, error, result } = await replyMessage(reqData);
            if (status == 'success') {
                setFormValue(initialFormValue)
                setMessageList(result);
                setValidateError(replyValidation(initialFormValue))
            }
        } catch (err) { }
    }

    useEffect(() => {
        if (!isEmpty(ticketId)) {
            fetchTicketChart();
            fetchTicketData();
        }
        setValidateError(replyValidation(formValue))
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>{detail && detail.categoryName}</h4>
                            <p>{detail && detail.status}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ul className="ticketComments">
                            {
                                messageList && messageList.length > 0 && messageList.map((item, key) => {
                                    let name = item.senderId.toString() == detail.userId ? detail.userName : detail.adminName;
                                    return (
                                        <li key={key}>
                                            <div className="ticketUserDetails">
                                                <div className="userImg">{firstLetterCase(name)}</div>
                                                <p>{name}</p>
                                            </div>
                                            <div className="ticketDetails">
                                                <p className="metaChatDetails">Created  on {item.createdAt}</p>
                                                <p>{item.message}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                        {
                            detail && detail.status != 'closed' && <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Reply to user"
                                    onChange={handleChange}
                                    value={message}
                                    name="message"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        }

                        {
                            detail && detail.status != 'closed' && <GridItem xs={12} sm={12} md={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    Reply
                                </Button>
                            </GridItem>
                        }


                    </CardBody>
                </Card>
            </Paper>
        </div >
    )
}

export default TicketChat;