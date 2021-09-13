import axios from "axios";

const instance=axios.create({
    baseURL:"http://api.openweathermap.org/data/2.5/",
});

const mainAxios = axios.create({
    baseURL: 'http://api.openweathermap.org/geo/1.0/'
});

export {instance,mainAxios};