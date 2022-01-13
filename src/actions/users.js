import axios from "axios";

// import action
import { decodeJwt } from "./jsonWebToken";

// import lib
import setAuthToken from "../lib/setAuthToken";

import { SET_CURRENT_USER } from "../constant";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

// import constant
// import {
//     SET_CURRENT_USER
// } from '../constant';

export const getsinglecms = async (currencyId) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getsinglecms/` + currencyId
    });
    console.log(respData.data.data, "ddddd");
    return {
      status: "success",
      loading: false,
      result: respData.data.data
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getSingleAdmin = async (currencyId) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getSingleAdmin/`,
      data: currencyId
    });
    console.log(respData.data.data, "ddddd");
    return {
      status: "success",
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const editAdmin = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/editAdmin`,
      data: data
    });
    return {
      status: "success",
      loading: false,
      result: respData.data.result
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getuserdet = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getuserdet`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const addNewAdmin = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addNewAdmin`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const gettokenreportsingledetails = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/gettokenreportsingledetails`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getreportsingledetails = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getreportsingledetails`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getsingledetails = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getsinglequestion`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const updateCms = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updateCms`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData.data.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const login = async (data, dispatch) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/login`,
      data
    });

    localStorage.setItem("token", respData.data.token);
    setAuthToken(respData.data.token);
    decodeJwt(respData.data.token, dispatch);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getAllPairs = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getPairs`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

// Update Currency Id
// export const updateCurrency = async (data,headers) => {
//     console.log(data,"dataaaaaaaaaaaaaaaaaaaa")
//     try {
//         let bodyFormData = new FormData();
//         bodyFormData.append('currencyName', data.currencyName);
//         bodyFormData.append('currencySymbol', data.currencySymbol);
//         bodyFormData.append('currencyType', data.currencyType);
//         bodyFormData.append('photo', data.photo);
//         bodyFormData.append('decimals', data.decimals);
//         bodyFormData.append('fee', data.fee);
//         bodyFormData.append('minimum', data.minimum);
//         bodyFormData.append('contractAddress',data.contractAddress);
//         bodyFormData.append('userId', data.userId);
//         var headersDefault = {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': localStorage.token
//         };
//         var finalHeaders = Object.assign(headersDefault, headers);

//         console.log(bodyFormData,"checking body formdata");
//         console.log(finalHeaders,"finalHeaders");

//         let respData = await axios({
//             'method': 'post',
//             'url': `${config.API_URL}/adminapi/updateCurrency`,
//             headers: finalHeaders,
//             data: bodyFormData
//         });

//     /* Merge defaults and options, without modifying defaults */
//         console.log(respData,'checking ResponseData');
//         return {
//             loading: true,
//             result: respData.data.result
//         }

//     }
//     catch (err) {
//         return {
//             loading: false,
//             error: err
//         }
//     }
// }

export const addFaq = async (data) => {
  try {
    console.log(data, "checking data");
    console.log(config.API_URL, "url");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addFaq`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData.data.result
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const updateFaq = async (data) => {
  try {
    console.log(data, "checking data");
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updateFaq`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData.data.result
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getquestionlist = async (filterData, dispatch) => {
  console.log("yes");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getquestionlist`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const gettokenreportlist = async (filterData, dispatch) => {
  console.log("yes");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/gettokenreportlist`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getreportlist = async (filterData, dispatch) => {
  console.log("yes");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getreportlist`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getBidslist = async (filterData, dispatch) => {
  console.log("yes");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getBidslist`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const gettokenlist = async (filterData, dispatch) => {
  console.log("yes");
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/gettokenlist`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
    console.log("not ok");
  }
};

export const getcatory = async (filterData, dispatch) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getcatory`,
      params: filterData
    });
    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const gettokendata = async (id) => {
  console.log("yes", id);
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/gettokendata/` + id
    });

    return {
      loading: false,
      result: respData.data
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const deleteToken = async (id, dispatch) => {
  //console.log('yes');
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deleteToken/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    return {
      loading: false,
      userValue: respData
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
      error: sendErr
    };
  }
};

export const getAllverifylist = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/getAllverifylist`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const rejectreq = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/rejectreq`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const acceptreq = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/acceptreq`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const getAllnoties = async (data) => {
  try {
    console.log(data, "result of Datadfdsfdsfdsfdsfa");

    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/notieslist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData.data);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const getAlladmin = async (data) => {
  try {
    console.log(data, "result of Datadfdsfdsfdsfdsfa");

    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getAlladmin`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData.data);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const getAllprohibited = async (data) => {
  try {
    console.log(data, "result of Datadfdsfdsfdsfdsfa");

    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/prohibitedlist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData.data);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const addnoties = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addnoties`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const addProhibited = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addprohibited`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const getsinglenoties = async (data) => {
  try {
    console.log("confirmmmm", data);
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/singlenoties`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData.data.data);
    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const getsingleword = async (data) => {
  try {
    console.log("confirmmmm", data);
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/singleprohibited`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData.data.data);
    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const updatenoties = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updatenoties`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData.data.data);
    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const updateWord = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updateWord`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData.data.data);
    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const deletenoties = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deletenoties`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData.data.message, "successsss");
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const deleteadmin = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deleteadmin`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData.data.message, "successsss");
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const deleteWord = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deleteword`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log(respData.data.message, "successsss");
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const getAllcategory = async (data) => {
  try {
    console.log(data, "result of Datadfdsfdsfdsfdsfa");

    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/categorylist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const getAllCms = async (data) => {
  try {
    console.log(data, "cmslistttt");

    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/cmslist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const getAllSetting = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/settinglist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

export const addcategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/addcategory`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const sendreply = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/sendreply`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const updatecategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updatecategory`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const getcategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/categorydetail`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData.data
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
      error: sendErr
    };
  }
};

//Get Currency id currency management module

export const getCurrencyId = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getCurrencyId?userid=` + data,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getFaqId = async (id) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getFaq/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};
export const getPairId = async (data) => {
  try {
    console.log("data", data);
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getPairId?pairid=` + data,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getUser = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getUsers?userid=` + data,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const updateProfile = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updateprofile`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    return {
      loading: false
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};
export const updateUser = async (data) => {
  try {
    let respData = await axios({
      method: "put",
      url: `${config.API_URL}/adminapi/updateUser`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data update Profile", respData);
    return {
      loading: false
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const updateEmail = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/updateEmailTemplate`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data update Profile", respData);
    return {
      loading: false
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};
export const forgotPassword = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.API_URL}/adminapi/forgotPassword`,
      // headers: {
      //     'Authorization': localStorage.token
      // },
      data
    });

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};
export const changePassword = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.API_URL}/adminapi/resetPassword`,
      // headers: {
      //     'Authorization': localStorage.token
      // },
      data
    });

    return {
      loading: false
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getLoginHistory = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getLoginHistory`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getemaillist = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getemaillist`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};
export const getFaqList = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getFaqList`,
      headers: {
        Authorization: localStorage.token
      },
      params: data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const getAddressProof = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/proof/getAllAddress`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getEmailid = async (id) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/getemailid/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};
export const getBankDetails = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/proof/getAllBank`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};
export const UpdateStatus = async (data) => {
  try {
    console.log("result of Data---", data);
    let respData = await axios({
      method: "put",
      url: `${config.API_URL}/adminapi/proof/updateStatus`,
      headers: {
        Authorization: localStorage.token
      },
      data
      // data = {
      //     id:"check",
      //     status:3,
      //     role:1
      //     }
    });
    console.log("result of Data", respData);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const getadminUsers = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.baseUrl}/api/adminprofile`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("aaaww", respData);

    return {
      loading: false,
      result: respData.data.data
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
      error: sendErr
    };
  }
};

export const get2faCode = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/get2faCode`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};
export const update2faCode = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.API_URL}/adminapi/update2faCode`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    console.log(data, "------------checkData");

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};
export const disable2faCode = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/diabled2faCode`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    console.log(data, "------------checkData");

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};

export const deletequestion = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deletequestion`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const deletecategory = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deletecategory`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

export const deleteFaq = async (data) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.baseUrl}/api/deleteFaq`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);
    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

//Support page
export const getSupportList = async (data) => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/supportList`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    console.log("result of Data", respData);

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData
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
      error: sendErr
    };
  }
};

//Using post method only Support page Pass id using delete api

export const deleteSupport = async (id) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.API_URL}/adminapi/supportDelete/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    console.log("result of Data", respData);
    console.log(id, "------------checkData");

    // localStorage.setItem('token', respData.data.token);

    return {
      loading: false,
      result: respData.data.result
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
      error: sendErr
    };
  }
};
export const getSupportId = async (id, dispatch) => {
  console.log("id", id);

  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/getSupportId/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    return {
      loading: false,
      userValue: respData.data.userValue
    };
  } catch (err) {
    console.log(err, "err");
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};
export const closeticket = async (id, dispatch) => {
  //console.log('yes')
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API}/adminapi/closeticket/` + id,
      headers: {
        Authorization: localStorage.token
      }
    });
    return {
      loading: false,
      userValue: respData.data.userValue
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const savereply = async (data, dispatch) => {
  try {
    let respData = await axios({
      method: "post",
      url: `${config.API}/adminapi/savereply`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });

    // console.log(respData.data.result,"hsdjfhjksdhfjkdhfjhdsjkghdfjkghjkdfhgjkdfhgjkdfhgjkdhfgjkhdfk");

    return {
      loading: false,
      result: respData.data.result
    };
  } catch (err) {
    return {
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const getSetting = async () => {
  try {
    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/setting`,
      headers: {
        Authorization: localStorage.token
      }
    });
    return {
      status: "success",
      loading: false,
      result: respData.data.result
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const updateSetting = async (data) => {
  try {
    let respData = await axios({
      method: "put",
      url: `${config.API_URL}/adminapi/setting`,
      headers: {
        Authorization: localStorage.token
      },
      data
    });
    return {
      status: "success",
      loading: false,
      messages: respData.data.messages,
      result: respData.data.result
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const getAllUsers = async () => {
  try {
    let respData = await axios.get(
      "http://139.64.237.139:4000/api/admin-users/all",
      config
    );
    return respData.data;
  } catch (err) {
    localStorage.removeItem("token");
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};
