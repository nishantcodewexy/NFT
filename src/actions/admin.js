// import axios
import axios from "axios";

// import lib
import { getAuthToken } from "../lib/localStorage";
import setAuthToken from "../lib/setAuthToken";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllAdmin = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/admin/pagination?page=${id}`,
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

export const addNewAdmin = async (data) => {
  console.log(data);
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/admin/register`,
      data,
      config
    );
    console.log(respData.data.data);
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

export const editAdmin = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/admin/edit/${id}`,
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

export const getAnAdmin = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/admin/${id}`,
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

export const getAdminPagination = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/admin/pagination?page=1&size=2`,
      config
    );
    return respData.data.data;
  } catch (err) {
    localStorage.removeItem("token");
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const logout = (history) => {
  localStorage.removeItem("token");
  window.location = "/";
  setAuthToken("");
};

export const editAdminMenu = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/admin/menu/${id}`,
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
