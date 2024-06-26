import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL + "?key=" + import.meta.env.VITE_API_KEY,
});

export default axiosClient;
