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

// import action
import { acceptFiatWithdraw, rejectFiatWithdraw } from './../../actions/wallet';

// import lib
import { toastAlert } from '../../lib/toastAlert'

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

const WithdrawFiatModal = (props) => {
    const classes = useStyles();

    const { handleModal, openModal, data, fetchWithdrawRequest } = props;

    // state
    const [modalStyle] = useState(getModalStyle);
    const [isApprovedLoading, setApprovedLoading] = useState(false);

    // function
    const handeRejectWithdraw = async (transactionId) => {
        setApprovedLoading(true)
        try {
            let reqData = {
                transactionId
            }
            const { status, loading, error, result } = await rejectFiatWithdraw(reqData);
            setApprovedLoading(loading)
            handleModal({})
            fetchWithdrawRequest()
            if (status == 'success') {
                toastAlert('success', result.messages, 'withdrawModal')
            } else {
                toastAlert('error', error.messages, 'withdrawModal')
            }
        } catch (err) {
            setApprovedLoading(false)
        }
    }

    const handeAcceptWithdraw = async (transactionId) => {
        setApprovedLoading(true)
        try {
            let reqData = {
                transactionId
            }
            const { status, loading, error, result } = await acceptFiatWithdraw(reqData);
            setApprovedLoading(loading)
            handleModal({})
            fetchWithdrawRequest()
            if (status == 'success') {
                toastAlert('success', result.messages, 'withdrawModal')
            } else {
                toastAlert('error', error.messages, 'withdrawModal')
            }
        } catch (err) {
            setApprovedLoading(false)
        }
    }

    let buttonDisable = false;
    if (isApprovedLoading) {
        buttonDisable = true
    }

    return (
        <div>
            <Modal
                className="primary_modal"
                open={openModal}
                onClose={handleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div  className={classes.paper + " primary_modal_body"}>
                    <h2>FIAT Withdraw</h2>
                    <TableBody>
                        <TableRow key={'Email'}>
                            <TableCell align="left">{"Email :"}</TableCell>
                            <TableCell align="left">{data.email}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Currency Symbol :"}</TableCell>
                            <TableCell align="left">{data.currencySymbol}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Bank Name :"}</TableCell>
                            <TableCell align="left">{data.bankDetail && data.bankDetail.bankName}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Account Holder :"}</TableCell>
                            <TableCell align="left">{data.bankDetail && data.bankDetail.holderName}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Routing No :"}</TableCell>
                            <TableCell align="left">{data.bankDetail && data.bankDetail.bankcode}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Branch :"}</TableCell>
                            <TableCell align="left">{data.bankDetail && data.bankDetail.branch}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Account No :"}</TableCell>
                            <TableCell align="left">{data.bankDetail && data.bankDetail.accountNo}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Actual Amount :"}</TableCell>
                            <TableCell align="left">{data.amount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Commission Fee :"}</TableCell>
                            <TableCell align="left">{data.commissionFee}{" "}%</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">{"Amount :"}</TableCell>
                            <TableCell align="left">{data.actualAmount}</TableCell>
                        </TableRow>

                        <TableRow>
                        <TableCell align="center" colSpan="2">
                            <Button
                                className="mr-2"
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeRejectWithdraw(data._id)}
                            >
                                Reject
                            </Button>

                            <Button
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeAcceptWithdraw(data._id)}
                            >
                                Approved
                            </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </div>
            </Modal>
        </div >
    );
}

WithdrawFiatModal.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string.isRequired,
        currencySymbol: PropTypes.string.isRequired,
        toaddress: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        commissionFee: PropTypes.number.isRequired,
    }),
};

WithdrawFiatModal.defaultProps = {
    data: {
        email: '',
        currencySymbol: '',
        toaddress: '',
        amount: 0,
        commissionFee: 0,
    }
};

export default WithdrawFiatModal
