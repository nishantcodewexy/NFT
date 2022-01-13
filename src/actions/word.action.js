// import axios
import axios from "axios";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllWords = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/word/all`,
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

export const deleteAWord = async (id) => {
  try {
    let respData = await axios.delete(
      `${process.env.REACT_APP_SERVER}/api/word/delete/${id}`,
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

export const addNewWord = async (data) => {
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/word/register`,
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
