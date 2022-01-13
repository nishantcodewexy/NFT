let key = {};
// if (process.env.NODE_ENV === "production") {
if (process.env.REACT_APP_MODE !== "production") {
  console.log("Set Production Config");
  //const API_URL = 'https://blockstars.site';
  const API_URL = "http://localhost:4000/api/";
  key = {
    baseUrl: `${API_URL}`,
  };
} else {
  console.log("Set Development Config");

  const API_URL = "http://localhost:4000/api/"; //'http://localhost';
  // const API_URL = 'http://localhost' ;
  key = {
    baseUrl: `${API_URL}`,
  };
}

export default key;
