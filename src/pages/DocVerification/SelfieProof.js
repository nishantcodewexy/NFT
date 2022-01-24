import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import {
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// import action
import { getAllSelfiId, UpdateStatus } from '../../actions/docsVerify';

// import lib
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

const initialFormValue = {
    'reason': "",
}
let currentUser = {};
const SelfieProof = (props) => {
    const classes = useStyles();

    // state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [formValue, setFormValue] = useState(initialFormValue);

    const { reason } = formValue;
    const columns = ([
        { field: 'email', headerName: 'Email', width: 300 },
        {
            field: 'frontImage',
            headerName: 'Front Image',
            width: 300,
            renderCell: (params: CellParams) => {
                let img = params.getValue('frontImage')
                return (
                    <Fragment>
                        <img src={img}/*  height="100px" */ width="30px" />
                        <a href={img} target="_blank">View Image</a>
                    </Fragment>
                )
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: CellParams) => {
                return (
                    <Fragment>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit(params.row)}
                        >
                            Approve
                    </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleClickOpen(params.row)}
                        >
                            Reject
                    </Button>
                    </Fragment>
                )
            }
        },
    ])

    // function
    const fetchProof = async () => {
        try {
            setLoading(true)
            const { status, loading, error, result } = await getAllSelfiId();
            setLoading(loading)
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

    const handleSubmit = async (record) => {
        let reqData = {
            id: record._id,
            status:'3',
            role:'4'
        }

        try {
            const { status, loading, error, result } = await UpdateStatus(reqData);
            if (status == 'success') {
                fetchProof();
                toastAlert('success', result.messages, 'idProof')
            } else {
                toastAlert('error', error.messages, 'idProof')
            }
        } catch (err) { }
    }

    const handleClickOpen = (record) => {
        setModalOpen(true);
        currentUser = record;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    const handleRejection = async () => {
        let reqData = {
            id: currentUser._id,
            status: '4',
            role: '4',
            reason
        }
        try {
            const { status, loading, error, result } = await UpdateStatus(reqData);
            if (status == 'success') {
                fetchProof();
                setModalOpen(false)
                toastAlert('success', result.messages, 'idProof')
            } else {
                toastAlert('error', error.messages, 'idProof')
            }
        } catch (err) { }
    };

    useEffect(() => {
        fetchProof()
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Card>
                    <Dialog open={modalOpen} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogContentText>
                                Please enter input here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <CustomInput
                                labelText="Reason for Reject"
                                type="text"
                                onChange={handleChange}
                                name="reason"
                                value={reason}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => handleRejection()}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <CardHeader color="primary">
                        <div className={classes.flexHeader}>
                            <h4 className={classes.cardTitleWhite}>Selfie Proof List</h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div style={{ height: 600, width: '100%' }}>
                            <DataGrid
                                pageSize={10}
                                pagination
                                rows={data}
                                columns={columns}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Paper>
        </div >
    )
}

export default SelfieProof;