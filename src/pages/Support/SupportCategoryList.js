import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// import action
import { getAllSupportCategory } from '../../actions/support';

// import 
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
const useStyles = makeStyles(styles);


const SuppotCategoryList = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([])

    const columns = ([
        { field: 'categoryName', headerName: 'Category Name', width: 600 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params: valueGetter) => {
                return (
                    <Fragment>
                        <Link to={'/support/category/edit/' + params.getValue('_id')}>
                            <EditIcon style={{ color: "#109ebf" }} />
                        </Link>
                        {/* <Link onClick={() => handleDelete(params.getValue('_id'))}>
                            <DeleteIcon style={{ color: "#109ebf" }} />
                        </Link> */}
                    </Fragment>
                )
            }
        },
    ])

    // function
    const fetchSupportCategory = async () => {
        try {
            const { status, loading, error, result } = await getAllSupportCategory();
            if (status == 'success') {
                let respData = result.data.map((item, key) => {
                    return {
                        id: key,
                        ...item
                    }
                })
                setData(respData)
            } else { }
        } catch (err) { }
    }

    const handleDelete = async (currencyId) => {
        // try {
        //     const { status, loading, error, result } = await deleteCurrency(currencyId);
        //     if (status == 'success') {
        //         fetchSupportCategory()
        //         toastAlert('success', result.messages, 'currency')
        //     } else {
        //         toastAlert('error', error.messages, 'currency')
        //     }
        // } catch (err) { }
    }

    useEffect(() => {
        fetchSupportCategory()
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Support Category List</h4>
                            <Link to={'/support/category/add'} className={classes.btnPrimary}>Add Support Category</Link>
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

export default SuppotCategoryList;