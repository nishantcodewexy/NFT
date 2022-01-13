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
import { acceptCoinWithdraw } from './../../actions/wallet';

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

const WithdrawCoinModal = (props) => {
    const classes = useStyles();

    const { handleModal, openModal, data, fetchWithdrawRequest } = props;

    // state
    const [modalStyle] = useState(getModalStyle);
    const [isApprovedLoading, setApprovedLoading] = useState(false);

    // function
    const handeRejectWithdraw = (transactionId) => {

    }

    const handeAcceptWithdraw = async (transactionId) => {
        setApprovedLoading(true)
        try {
            let reqData = {
                transactionId
            }
            const { status, loading, error, result } = await acceptCoinWithdraw(reqData);
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
                            <TableCell align="right">{"To Address :"}</TableCell>
                            <TableCell align="right">{data.toaddress}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Actual Amount :"}</TableCell>
                            <TableCell align="right">{data.amount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Commission Fee :"}</TableCell>
                            <TableCell align="right">{data.commissionFee}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="right">{"Amount :"}</TableCell>
                            <TableCell align="right">{data.amount + data.commissionFee}</TableCell>
                        </TableRow>

                        <TableRow>
                            <Button
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeRejectWithdraw(data._id)}
                            >
                                Rejecte
                            </Button>

                            <Button
                                variant="contained"
                                disabled={buttonDisable}
                                onClick={() => handeAcceptWithdraw(data._id)}
                            >
                                Approved
                            </Button>
                        </TableRow>
                    </TableBody>
                </div>
            </Modal>
        </div >
    );
}

WithdrawCoinModal.propTypes = {
    data: PropTypes.shape({
        email: PropTypes.string.isRequired,
        currencySymbol: PropTypes.string.isRequired,
        toaddress: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        commissionFee: PropTypes.number.isRequired,
    }),
};

WithdrawCoinModal.defaultProps = {
    data: {
        email: '',
        currencySymbol: '',
        toaddress: '',
        amount: 0,
        commissionFee: 0,
    }
};

export default WithdrawCoinModal
