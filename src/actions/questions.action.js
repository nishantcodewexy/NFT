// import axios
import axios from "axios";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getAllQuestions = async () => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/question/all`,
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

export const addNewQuestion = async (data) => {
  console.log(data);
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/question/register`,
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

export const getAQuestion = async (id) => {
  try {
    let respData = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/question/${id}`,
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

export const sendEmail = async (data) => {
  try {
    let respData = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/question/email`,
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
