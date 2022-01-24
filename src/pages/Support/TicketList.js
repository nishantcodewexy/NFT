import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';
import {
    Edit as EditIcon,
    Visibility as VisibilityIcon
} from '@material-ui/icons';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import action
import { getTicketList } from './../../actions/support';

// import lib

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

const TicketList = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState(1)
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const columns = ([
        { field: 'userName', headerName: 'Name', width: 200 },
        { field: 'categoryName', headerName: 'Category Name', width: 200 },
        { field: 'createdAt', headerName: 'Date', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        {
            field: 'View',
            headerName: 'View',
            width: 200,
            renderCell: (params: CellParams) => {
                return (
                    <Link to={'/support/ticket/chat/' + params.row._id}><VisibilityIcon style={{ color: "#109ebf" }} /></Link>
                )
            }
        },
    ])

    // function
    const fetchTicketList = async (reqData) => {
        try {
            setLoading(true)
            const { status, loading, error, result } = await getTicketList(reqData);
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
        fetchTicketList(reqData)
    }

    useEffect(() => {
        let reqData = {
            page,
            limit
        }
        fetchTicketList(reqData)
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Ticket List</h4>
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

export default TicketList;