import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5500/shapoval/test-task-backend/v2',
    contentType: "multipart/form-data"
})

// instance.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     if (error.response.status === 401) {
//         console.log('Token просрочен')
//         alert('Token просрочен')
//         return
//     }
//     return Promise.reject(error)
// });


export default instance