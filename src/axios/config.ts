import axios from "axios";

const Axios = axios.create({
    baseURL:'https://localhost:7070/'
});
  export default Axios;