// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const getCoinWithdrawRequest = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/withdrawRequest/coin`,
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const acceptCoinWithdraw = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/withdrawAccept/coin`,
            data
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const acceptFiatWithdraw = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/withdraw/fiat`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const rejectFiatWithdraw = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `${config.API_URL}/adminapi/withdraw/fiat`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const getDepositRequest = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/depositRequest/fiat`,
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const approvedDepositRequest = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/depositRequest/fiat`,
            data
        });

        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const getWithdrawRequest = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/withdraw/fiat`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    } catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}
