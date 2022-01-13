// import axios
import axios from 'axios';

// import lib
import config from '../lib/config';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.headers.common['Authorization'] = getAuthToken();

export const getReferralHistory = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${config.API_URL}/adminapi/referralHistory`,
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