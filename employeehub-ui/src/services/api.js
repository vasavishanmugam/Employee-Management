import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) =>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWxhQHR3aXR0ZXIuY29tIiwiaWF0IjoxNzg1MjkxODQwLCJleHAiOjE3ODUyOTU0NDB9.LQgCP8sMWJKboAlJUOrxVsYCbf_KXzFmPZTkTtbhm7I";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default api;