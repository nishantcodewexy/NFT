// import axios
import axios from "axios";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllTerms = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/terms/all`,
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

/*
export const addNewnotice = async (data) => {
  try {
    let respData = await axios.post(
      "http://localhost:4000/api/notice/register",
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
*/
export const EditATerm = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/terms/edit/${id}`,
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

export const getANotice = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/notice/${id}`,
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
