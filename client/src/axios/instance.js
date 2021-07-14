import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5500/shapoval/test-task-backend/v2',
    contentType: "multipart/form-data"
})

export default instance
