import axios from "axios";
class fetchs {
  post(api, body) {
    //post с токеном
    return axios.post(api, body, { headers: { "access-token": localStorage.getItem("access-token") } });
  }
  get(api) {
    //get с токеном
    return axios.get(api, { headers: { "access-token": localStorage.getItem("access-token") } });
  }
  put(api, body) {
    //изменение с токеном
    return axios.put(api, body, { headers: { "access-token": localStorage.getItem("access-token") } });
  }
  remove(api) {
    //удаление
    return axios.delete(api);
  }
}

export default new fetchs();
