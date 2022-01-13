// import axios
import axios from "axios";

// import lib
import config from "../lib/config";
import { getAuthToken } from "../lib/localStorage";

axios.defaults.headers.common["Authorization"] = getAuthToken();

export const getEmailTemplateList = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getEmailList`,
    });

    return {
      status: "success",
      loading: false,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

export const getAllartlist = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getAllartlist`,
    });

    return {
      status: "success",
      loading: false,
      result: respData.data,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

export const adminburntoken = async (data, dispatch) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/adminburntoken`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    return {
      loading: false,
      result: respData,
    };
  } catch (err) {
    var sendErr = "";
    if (err) {
      sendErr = err;
      if (err.response) {
        sendErr = err.response;
        if (err.response.data) {
          sendErr = err.response.data;
          if (err.response.data.errors) {
            sendErr = err.response.data.errors;
          }
        }
      }
    }
    return {
      loading: false,
      error: sendErr,
    };
  }
};

export const getproductdetails = async (data, dispatch) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getproductdetails`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    return {
      loading: false,
      result: respData,
    };
  } catch (err) {
    var sendErr = "";
    if (err) {
      sendErr = err;
      if (err.response) {
        sendErr = err.response;
        if (err.response.data) {
          sendErr = err.response.data;
          if (err.response.data.errors) {
            sendErr = err.response.data.errors;
          }
        }
      }
    }
    return {
      loading: false,
      error: sendErr,
    };
  }
};

export const removebannerlist = async (data, dispatch) => {
  //console.log('yes');
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/removebannerlist`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    return {
      loading: false,
      userValue: respData,
    };
  } catch (err) {
    var sendErr = "";
    if (err) {
      sendErr = err;
      if (err.response) {
        sendErr = err.response;
        if (err.response.data) {
          sendErr = err.response.data;
          if (err.response.data.errors) {
            sendErr = err.response.data.errors;
          }
        }
      }
    }
    return {
      loading: false,
      error: sendErr,
    };
  }
};

export const setbannerlist = async (data, dispatch) => {
  //console.log('yes');
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/setbannerlist`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    return {
      loading: false,
      userValue: respData,
    };
  } catch (err) {
    var sendErr = "";
    if (err) {
      sendErr = err;
      if (err.response) {
        sendErr = err.response;
        if (err.response.data) {
          sendErr = err.response.data;
          if (err.response.data.errors) {
            sendErr = err.response.data.errors;
          }
        }
      }
    }
    return {
      loading: false,
      error: sendErr,
    };
  }
};

export const getbannerlist = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getbannerlist`,
    });

    return {
      status: "success",
      loading: false,
      result: respData.data,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

export const getauctionlist = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getauctionlist`,
    });

    return {
      status: "success",
      loading: false,
      result: respData.data,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

export const getcmslist = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getcmslist`,
    });

    return {
      status: "success",
      loading: false,
      result: respData.data,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

// deletecms

export const deletecms = async (id, dispatch) => {
  //console.log('yes');
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deletecms/` + id,
      headers: {
        Authorization: localStorage.token,
      },
    });
    return {
      loading: false,
      userValue: respData,
    };
  } catch (err) {
    var sendErr = "";
    if (err) {
      sendErr = err;
      if (err.response) {
        sendErr = err.response;
        if (err.response.data) {
          sendErr = err.response.data;
          if (err.response.data.errors) {
            sendErr = err.response.data.errors;
          }
        }
      }
    }
    return {
      loading: false,
      error: sendErr,
    };
  }
};

export const AddCms = async (data) => {
  try {
    console.log(data, "data  ");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addcms`,
      data,
    });
    return {
      status: "success",
      loading: true,
      messages: respData.data.messages,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};

export const updatecms = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updatecms`,
      data,
    });
    return {
      status: "success",
      loading: true,
      messages: respData.data.messages,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors,
    };
  }
};
