const { default: axios } = require('axios');


export default { getNodes, getGasPrice, getUpTime};
async function getNodes() {
  return axios
    .get("http://52.15.80.60:3000/node")
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}


async function getGasPrice() {
  return axios
    .get("http://52.15.80.60:3000/getGasPrice")
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function getUpTime(data) {
  return axios
    .get(`http://52.15.80.60:3000/uptime/${data}`)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
