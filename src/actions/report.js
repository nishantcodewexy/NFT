// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const getTradeHistory = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.TRADE_URL}/getOrderHistory`,
            data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const getWithdrawList = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/getWithdraw`,
            'params': data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}

export const getFundTransferHistory = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/fundTransferHistory`,
            'params': data
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            error: err.response.data.errors
        }
    }
}