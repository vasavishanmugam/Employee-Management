import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) =>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWxhQHR3aXR0ZXIuY29tIiwiaWF0IjoxNzg1NDY2NDI0LCJleHAiOjE3ODU0NzAwMjR9.YM7xQAvbSiZgGdmxwDPySlmte7-GKYeeC_LevmcA-yg";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default api;