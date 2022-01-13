// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const addCurrency = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/currency`,
            data
        });
        return {
            status: "success",
            loading: true,
            messages: respData.data.messages,
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

export const updateCurrency = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `${config.API_URL}/adminapi/currency`,
            data
        });
        return {
            status: "success",
            loading: false,
            messages: respData.data.messages,
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

export const deleteCurrency = async (currencyId) => {
    try {
        let respData = await axios({
            'method': 'delete',
            'url': `${config.API_URL}/adminapi/currency/` + currencyId,
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

export const getSingleCurrency = async (currencyId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/getSingleCurrency/` + currencyId,
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

export const getCurrencyDropDown = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/getCurrency`,
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

export const getAllCurrencies = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/currency`,
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