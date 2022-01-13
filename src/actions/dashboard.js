// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const getDashboardCount = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.baseUrl}/api/dashboardCount`,
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

export const getTradeCount = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.TRADE_URL}/totalCount`,
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
            // error: err.response.data.errors
        }
    }
}