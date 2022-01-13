// import axios
import axios from "axios";

// import lib
import setAuthToken from "../lib/setAuthToken";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllAvatars = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/avatar/pagination?page=${id}`,
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

export const addNewnotice = async (data) => {
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/notice/register`,
      data,
      config
    );

    return {
      status: "success",
      loading: false,
      result: respData.data.result
    };
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.message
    };
  }
};

export const EditANotice = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/notice/edit/${id}`,
      data,
      config
    );

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

export const getAAvatar = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/avatar/${id}`,
      config
    );
    return respData.data.data;
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};
