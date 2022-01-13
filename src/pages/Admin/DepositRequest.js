import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Paper, Button } from '@material-ui/core';
import {
    Visibility as VisibilityIcon
} from '@material-ui/icons';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import component
import DepositRequestModal from './DepositRequestModal';

// import action
import { getDepositRequest, approvedDepositRequest } from './../../actions/wallet';

// import lib
import { transactionStatus } from '../../lib/statusCode';
import { toastAlert } from '../../lib/toastAlert';

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


const DepositRequest = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([])
    const [rowCount, setRowCount] = useState(1)
    const [page, setPage] = useState(1)
    const [modalData, setModalData] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const columns = ([
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'currencySymbol', headerName: 'Curreny Symbol', width: 200 },
        { field: 'userAssetId', headerName: 'User Id', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'createdAt', headerName: 'Date', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: CellParams) => {
                return (
                    <a onClick={() => handleModal(params.row)}><VisibilityIcon /></a>
                    // <Fragment>
                    //     <Button>Rejected</Button>
                    //     <Button onClick={() => handleApproved(params.getValue('_id'))}>Approved</Button>
                    // </Fragment>
                )
            }
        },
    ])


    // function
    const fetchDepositRequest = async () => {
        try {
            const { status, loading, error, result } = await getDepositRequest();
            if (status == 'success') {
                let respData = result.data.map((item, key) => {
                    return {
                        id: key,
                        ...item
                    }
                })
                setRowCount(result.count)
                setData(respData)
            } else { }
        } catch (err) { }
    }

    const handleApproved = async (transactionId) => {
        try {
            let reqData = {
                transactionId
            }
            const { status, loading, error, result } = await approvedDepositRequest(reqData)
            if (status == 'success') {
                fetchDepositRequest();
                toastAlert('success', result.messages, 'depositRequest')
            } else {
                toastAlert('error', error.messages, 'depositRequest')
            }
        } catch (err) { }
    }

    const handlePagination = (params) => {
        setPage(params.page);
    }

    const handleModal = (data) => {
        setOpenModal(!openModal)
        if (!openModal) {
            setModalData(data)
        }
    }

    useEffect(() => {
        fetchDepositRequest()
    }, [])

    return (
        <div className={classes.root}>
            <DepositRequestModal
                handleModal={handleModal}
                openModal={openModal}
                data={modalData}
                fetchDepositRequest={fetchDepositRequest}
            />
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Fiat Deposit Request List</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div style={{ height: 600, width: '100%' }}>
                            <DataGrid
                                pageSize={10}
                                pagination
                                rows={data}
                                columns={columns}
                                rowCount={rowCount}
                                page={page}
                                onPageChange={handlePagination}
                                paginationMode={'server'}
                                pagination
                            />
                        </div>
                    </CardBody>
                </Card>
            </Paper>
        </div >
    )
}

export default DepositRequest;