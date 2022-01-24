import React, {useEffect, useState } from 'react';

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import action
import { getWithdrawList } from './../../actions/report';

// import lib
import { transactionStatus } from '../../lib/statusCode'

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


const WithdrawList = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(1)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const columns = ([
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'currencySymbol', headerName: 'Curreny Symbol', width: 200 },
        {
            field: 'toaddress',
            headerName: 'To Address',
            width: 200,
            renderCell: (params: CellParams) => {
                let paymentStatus = params.getValue('paymentType')
                if (paymentStatus == 2) {
                    return params.getValue('toaddress')
                } else if (paymentStatus == 4) {
                    let bankDetail = params.getValue('bankDetail')
                    return bankDetail.accountNo
                }
                return ''
            }
        },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'createdAt', headerName: 'Date', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: CellParams) => {
                return (
                    <p>{transactionStatus(params.getValue('status'))}</p>
                )
            }
        },
    ])

    // function
    const fetchWithdraw = async (reqData) => {
        try {
            setLoading(true)
            const { status, loading, error, result } = await getWithdrawList(reqData);
            setLoading(loading)
            if (status == 'success') {
                let respData = result.data.map((item, key) => {
                    return {
                        id: key,
                        ...item
                    }
                })
                setData(respData)
                setRowCount(result.count)
            } else { }
        } catch (err) { }
    }

    const handlePagination = ({ page, pageCount, pageSize, paginationMode, rowCount }) => {
        // setPage(pageCount);
        let reqData = {
            page: pageCount,
            limit
        }
        fetchWithdraw(reqData)
    }

    useEffect(() => {
        let reqData = {
            page,
            limit
        }
        fetchWithdraw(reqData)
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Withdraw List</h4>
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

export default WithdrawList;