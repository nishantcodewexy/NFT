import axios from "axios";

// import action
import { decodeJwt } from "./jsonWebToken";

// import lib
import config from "./config";
import setAuthToken from "../lib/setAuthToken";

import { SET_CURRENT_USER } from "../constant";

// import constant
// import {
//     SET_CURRENT_USER
// } from '../constant';

export const getAllcategory = async (data) => {
  console.log("asauydfsafdhsavfjhsdgvfhsd");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/api/communitycategorylist`,
      headers: {
        Authorization: localStorage.token,
      },
      params: data,
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data,
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
export const getAllusers = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getAllusers`,
      headers: {
        Authorization: localStorage.token,
      },
      params: data,
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data,
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

export const addcategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/communityaddcategory`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
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

export const addusers = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/communityaddusers`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
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
export const updatecategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/communityupdatecategory`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
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

export const getsettings = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getsettingsdata`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData.data,
    };
  } catch (err) {}
};

export const updateSetting = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updatesetting`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData.data,
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

export const getcategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/communitycategorydetail`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData.data,
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

export const deletecategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/communitydeletecategory`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
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

export const deleteuser = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deleteuser`,
      headers: {
        Authorization: localStorage.token,
      },
      data,
    });
    console.log("result of Data", respData);
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
