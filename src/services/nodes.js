const { default: axios } = require('axios');


export default { getNodes, getGasPrice, getUpTime, getInitNodes, getCountryInit};
async function getNodes() {
  return axios
    .get("http://3.88.252.78:3000/node")
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


async function getGasPrice() {
  return axios
    .get("http://3.88.252.78:3000/getGasPrice")
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getUpTime(data) {
  return axios
    .get(`http://3.88.252.78:3000/uptime/${data}`)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


async function getCountryInit() {
  return axios
    .get(`http://3.88.252.78:3000/getInit`)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getInitNodes() {
  return axios
      .get(`http://3.88.252.78:3000/get-table-nodes`)
      .then((res) => {
          return Promise.resolve(res.data);
      })
      .catch(function (err) {
          return Promise.reject(err);
      });
}