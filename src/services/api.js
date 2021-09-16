// import axios from 'axios';

// const api = axios.create({ 
//     baseURL: 'https://fcam-booking.herokuapp.com/'
// });

// export default api;

import axios from 'axios';
const BASE_URL = 'http://fcam-booking.herokuapp.com';


const doRequest = ({ method = 'GET', url, data, params }) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params
    });
}

export default doRequest;