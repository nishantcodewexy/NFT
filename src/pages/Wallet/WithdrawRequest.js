import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Paper, Button } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@material-ui/icons';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import component
import WithdrawFiatModal from './WithdrawFiatModal';

// import action
import { getWithdrawRequest } from './../../actions/wallet';

// import lib
import { transactionStatus } from '../../lib/statusCode';

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


const WithdrawRequest = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const columns = ([
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'currencySymbol', headerName: 'Curreny Symbol', width: 200 },
        {
            field: 'accountNo',
            headerName: 'Account No',
            width: 200,
            renderCell: (params: CellParams) => {
                let bankDetail = params.getValue('bankDetail') 
                return bankDetail.accountNo
            }
        },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'createdAt', headerName: 'Date', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: CellParams) => {
                if (params.getValue('status') == 1) {
                    return (
                        <p>{transactionStatus(params.getValue('status') == 1)}</p>
                    )
                } else if (params.getValue('status') == 2) {
                    return (
                        <a onClick={() => handleModal(params.row)}><VisibilityIcon /></a>
                    )
                }
                return ''
            }
        },
    ])

    // function
    const fetchWithdrawRequest = async () => {
        try {
            const { status, loading, error, result } = await getWithdrawRequest();
            if (status == 'success') {
                let respData = result.map((item, key) => {
                    return {
                        id: key,
                        ...item
                    }
                })
                setData(respData)
            } else { }
        } catch (err) { }
    }

    const handleModal = (data) => {
        setOpenModal(!openModal)
        if (!openModal) {
            setModalData(data)
        }
    }

    useEffect(() => {
        fetchWithdrawRequest()
    }, [])

    return (
        <div className={classes.root}>
            <WithdrawFiatModal
                handleModal={handleModal}
                openModal={openModal}
                data={modalData}
                fetchWithdrawRequest={fetchWithdrawRequest}
            />
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Withdraw Request List</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div style={{ height: 600, width: '100%' }}>
                            <DataGrid pageSize={10} pagination rows={data} columns={columns} />
                        </div>
                    </CardBody>
                </Card>
            </Paper>
        </div >
    )
}

export default WithdrawRequest;