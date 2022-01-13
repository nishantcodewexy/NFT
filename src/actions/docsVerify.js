// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const getIdProof = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/proof/getAllIdProof`,
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

export const UpdateStatus = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `${config.API_URL}/adminapi/proof/updateStatus`,
            data
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

export const getAllSelfiId = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/proof/getAllSelfiId`,
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

export const getAddressProof = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/proof/getAllAddress`,
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