import axios from "axios";
import config from "../../lib/config";
import { toast } from "react-toastify";

toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export const postCall = async (updData = {}, headers = null) => {
  try {
    var headersDefault = {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    };
    var finalHeaders = Object.assign(headersDefault, headers);

    // console.log("headersDefault : ",headersDefault);
    // console.log("finalHeaders : ",finalHeaders);
    // console.log('updData : ',updData);

    let respData = await axios({
      method: "post",
      url: `${config.API_URL}/adminapi/updateCurrency`,
      headers: finalHeaders,
      data: updData,
    });
    console.log(respData, "checking ResponseData");

    var getResp = respData.data;
    console.log(getResp, "getResp");

    if (typeof getResp.toast != "undefined") {
      if (
        typeof getResp.toast.msg != "undefined" &&
        typeof getResp.toast.type != "undefined"
      ) {
        if (getResp.toast.type == "error") {
          toast.error(getResp.toast.msg, toasterOption);
        } else if (getResp.toast.type == "success") {
          toast.success(getResp.toast.msg, toasterOption);
        }
      }
    } else if (typeof getResp.error != "undefined") {
      toast.error(toast.error, toasterOption);
    }
    return {
      loading: true,
      result: getResp,
    };
  } catch (err) {
    return {
      loading: false,
      error: err,
    };
  }
};

export const getCall = async (headers = null) => {
  try {
    var headersDefault = {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    };
    var finalHeaders = Object.assign(headersDefault, headers);

    console.log("headersDefault : ", headersDefault);
    console.log("finalHeaders : ", finalHeaders);

    let respData = await axios({
      method: "get",
      url: `${config.API_URL}/adminapi/updateCurrency`,
      headers: finalHeaders,
    });
    console.log(respData, "checking ResponseData");
    return {
      loading: true,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      loading: false,
      error: err,
    };
  }
};
