// import axios
import axios from "axios";

// import lib
import setAuthToken from "../lib/setAuthToken";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllNFT = async () => {
  /*try {
    let respData = await axios.get(
      "http://139.64.237.139:4000/api/user/art-work?page=1&limit=20"
    );
    console.log(respData);
  } catch (err) {
    localStorage.removeItem("token");
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }*/
};
/*
export const addNewAdmin = async (data) => {
  console.log(data);
  try {
    let respData = await axios.post(
      "http://localhost:4000/api/admin/register",
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
*/
export const EditNFT = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/nft/edit/${id}`,
      data,
      config
    );
    console.log(respData);

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

export const getANFT = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/nft/${id}`,
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

export const stoppedChange = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/nft/isStopped/${id}`,
      data,
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

export const allCategory = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/user/art-work/category`
    );
    return respData.data.data.data;
  } catch (err) {
    return {
      status: "failed",
      loading: false,
      error: err.response.data.errors
    };
  }
};

export const addCategory = async (data) => {
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/nft/category/add`,
      data,
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

export const getACategory = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/user/art-work/details?art_work_id=${id}`,
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

export const editCategory = async (data, id) => {
  try {
    let respData = await axios.put(
      `${process.env.REACT_APP_SERVER}/api/nft/category/edit/${id}`,
      data,
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
