const axios = require('axios');

export default {getLocation}

async function getLocation(requestData) {

  let url = process.env.REACT_APP_NODE_LOCATIONS + requestData;

  return axios.get(url)
  .then((response) => {
    return Promise.resolve(response.data);
    
  })
  .catch(function (err) {
    return Promise.reject(err);
  });
}