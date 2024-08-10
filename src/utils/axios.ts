import axios from 'axios';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
