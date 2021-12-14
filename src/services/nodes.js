const { default: axios } = require('axios');


export default { getNodes };
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
