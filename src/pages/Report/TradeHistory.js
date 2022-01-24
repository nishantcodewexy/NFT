import React, { useEffect, useState } from 'react';

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import action
import { getTradeHistory } from './../../actions/report';



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


const TradeHistory = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([])

    const columns = ([
        {
            field: 'contracts',
            headerName: 'Contracts',
            width: 150,
            renderCell: (params: valueGetter) => {
                return params.getValue('firstCurrency') + params.getValue('secondCurrency')
            }
        },
        { field: 'initialQuantity', headerName: 'Quantity', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'orderValue', headerName: 'Order Value', width: 200 },
        { field: 'quantity', headerName: 'Remaining', width: 200 },
        { field: 'orderType', headerName: 'Order Type', width: 150 },
        { field: 'tradeid', headerName: 'Trade Id', width: 200 },
        { field: 'orderDate', headerName: 'Order Date', width: 200 }
    ])

    // function
    const fetchTradeHistory = async () => {
        try {
            const { status, loading, error, result } = await getTradeHistory();
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


    useEffect(() => {
        fetchTradeHistory()
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Trade History</h4>
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

export default TradeHistory;