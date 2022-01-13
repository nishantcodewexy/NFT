// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const addSpotPair = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${config.API_URL}/adminapi/spotPair`,
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

export const getAllSpotPair = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/spotPair`,
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

export const deleteSpotPair = async (spotPairId) => {
    try {
        let respData = await axios({
            'method': 'delete',
            'url': `${config.API_URL}/adminapi/spotPair/${spotPairId}`,
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

export const getSingleSpotPair = async (spotPairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/getSingleSpotPair/${spotPairId}`,
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

export const editSpotPair = async (data) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `${config.API_URL}/adminapi/spotPair`,
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