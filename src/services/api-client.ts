import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {        
        key: '88b532ed13c541429b0fb7b42562968d'
    }
})