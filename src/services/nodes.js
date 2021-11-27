const { default: axios } = require('axios');

const data = {
  date: '',
  nodes: '',
}

export default { getNodes };
async function getNodes() {
  return axios
    .get("http://localhost:3000/node")
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}

async function saveNodes() {
  return axios
  .post("http://localhost:3000/node", data)
  .then((res) => {
   console.log("post", res);
  })
  .catch(function (err) {
  console.log("err", err);
  })

  }
