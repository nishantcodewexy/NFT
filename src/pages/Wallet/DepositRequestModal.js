import React, { useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    TableBody,
    TableRow,
    TableCell,
    Button
} from '@material-ui/core';

// import component
import CustomInput from "components/CustomInput/CustomInput.js";

// import action
import { approvedDepositRequest } from './../../actions/wallet';

// import lib
import { toastAlert } from '../../lib/toastAlert'
import isEmpty from '../../lib/isEmpty'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const initialFormValue = {
    'amount': ''
}

const DepositRequestModal = (props) => {
    const classes = useStyles();

    const { handleModal, openModal, data, fetchDepositRequest } = props;

    // state
    const [modalStyle] = useState(getModalStyle);
    const [isApprovedLoading, setApprovedLoading] = useState(false);
    const [formValue, setFormValue] = useState(initialFormValue);

    const { amount } = formValue;

    // function
    const handeRejectWithdraw = async (transactionId) => {
        setApprovedLoading(true)
        try {
            let reqData = {
                transactionId
            }
            const { status, loading, error, result } = await approvedDepositRequest(reqData);
            setApprovedLoading(loading)
            handleModal({})
            fetchDepositRequest()
            if (status == 'success') {
                toastAlert('success', result.messages, 'depositRequest')
            } else {
                toastAlert('error', error.messages, 'depositRequest')
            }
        } catch (err) {
            setApprovedLoading(false)
        }
    }

    const handeAcceptWithdraw = async (transactionId) => {
        setApprovedLoading(true)
        try {
            let reqData = {
                transactionId,
                amount
            }
            const { status, loading, error, result } = await approvedDepositRequest(reqData);
            setApprovedLoading(loading)
            handleModal({})
            fetchDepositRequest()
            if (status == 'success') {
                toastAlert('success', result.messages, 'depositRequest')
            } else {
                toastAlert('error', error.messages, 'depositRequest')
            }
        } catch (err) {
            setApprovedLoading(false)
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name == 'amount') {
            if (isNaN(value) || isEmpty(value)) {
                return
            }
        }

        const formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    let buttonDisable = false;
    if (isApprovedLoading) {
        buttonDisable = true
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <TableBody>
                        <TableRow key={'Email'}>
                            <TableCell align="right">{"Email :"}</TableCell>
                            <TableCell align="right">{data.email}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Currency Symbol :"}</TableCell>
                            <TableCell align="right">{data.currencySymbol}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Actual Amount :"}</TableCell>
                            <TableCell align="right">{data.amount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Amount :"}</TableCell>
                            <TableCell align="right">
                                <CustomInput
                                    labelText="Enter amount"
                                    onChange={handleChange}
                                    name="amount"
                                    value={amount}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            {/* <Button
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeRejectWithdraw(data._id)}
                            >
                                Reject
                            </Button> */}

                            <Button
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeAcceptWithdraw(data._id)}
                            >
                                Submit
                            </Button>
                        </TableRow>
                    </TableBody>
                </div>
            </Modal>
        </div >
    );
}

DepositRequestModal.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string.isRequired,
        currencySymbol: PropTypes.string.isRequired,
        toaddress: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        commissionFee: PropTypes.number.isRequired,
    }),
};

DepositRequestModal.defaultProps = {
    data: {
        email: '',
        currencySymbol: '',
        toaddress: '',
        amount: 0,
        commissionFee: 0,
    }
};

export default DepositRequestModal
