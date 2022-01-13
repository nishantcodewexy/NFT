import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Paper, Button } from '@material-ui/core';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import component
// import WithdrawCoinModal from './WithdrawCoinModal';

// import action
import { getFundTransferHistory } from './../../actions/report';

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
    const [limit, setLimit] = useState(10)

    const columns = ([
        { field: 'email', headerName: 'From Email', width: 250 },
        { field: 'currencySymbol', headerName: 'Curreny Symbol', width: 200 },
        { field: 'toUserEmail', headerName: 'To Email', width: 250 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'createdAt', headerName: 'Date', width: 250 },
    ])

    // function
    const fetchFundTransferHistory = async (reqData) => {
        try {
            const { status, loading, error, result } = await getFundTransferHistory(reqData);
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

    const handlePagination = ({ page, pageCount, pageSize, paginationMode, rowCount }) => {
        // setPage(pageCount);
        let reqData = {
            page: pageCount,
            limit
        }
        getFundTransferHistory(reqData)
    }

    useEffect(() => {
        let reqData = {
            page,
            limit
        }
        fetchFundTransferHistory(reqData)
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Fund Transfer History</h4>
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