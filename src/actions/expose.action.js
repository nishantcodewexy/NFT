// import axios
import axios from "axios";

// import lib
import setAuthToken from "../lib/setAuthToken";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllExposes = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/expose/all`,
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

export const addNewExpose = async (data) => {
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/expose/register`,
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

export const deleteAExpose = async (id) => {
  try {
    let respData = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/expose/delete/${id}`,
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
