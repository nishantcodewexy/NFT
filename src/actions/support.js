// import package
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const addSupportCategory = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/supportCategory`,
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

export const editSupportCategory = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `${config.API_URL}/adminapi/supportCategory`,
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

export const getAllSupportCategory = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/supportCategory`,
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

export const getSingleSupportCategory = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/getSingleSupportCategory/` + data,
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

export const getTicketList = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/ticketList`,
            'params': data
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

export const getTicketData = async (ticketId) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/ticketList/` + ticketId,
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

export const getTicketMessage = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/ticketMessage/`,
            'params': data
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

export const replyMessage = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/ticketMessage`,
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