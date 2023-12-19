import axios from "axios";
import { CHANGE_PASSWORD_URL, CREATE_CAR_URL, CREATE_PRODUCT_URL, CREATE_WORKER_URL, DELETE_CAR_URL, DELETE_PRODUCT_URL, DELETE_WORKER_URL, GET_ALL_PRODUCTS_URL, GET_ALL_RESOURCE_CARS_URL, GET_ALL_WORKERS_URL, GET_CALENDAR_URL, GET_FREE_EVENTS_URL, GET_ORDERS_URL, GET_SPECIFIC_PRODUCT_URL } from "./endpoints";

export const getProductDetails = (productId, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_SPECIFIC_PRODUCT_URL + `${productId}`, config);
};

export const createProduct = (formData, token) => {
  for(const pair of formData.entries()){
    console.log("formData", pair[0], pair[1])
  }
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.post(CREATE_PRODUCT_URL, formData, config);
};

export const deleteProduct = (productId, token) => {
  console.log(token)
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.delete(DELETE_PRODUCT_URL + productId, config);
};

export const getAllProducts = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_ALL_PRODUCTS_URL, config);
};

export const getAllWorkers = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_ALL_WORKERS_URL, config);
};

export const getAllResourceCars = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_ALL_RESOURCE_CARS_URL, config);
};

export const createWorker = (formData, token) => {
  for(const pair of formData.entries()){
    console.log("formData", pair[0], pair[1])
  }
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.post(CREATE_WORKER_URL, formData, config);
};

export const createCar = (formData, token) => {
  for(const pair of formData.entries()){
    console.log("formData", pair[0], pair[1])
  }
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.post(CREATE_CAR_URL, formData, config);
};

export const deleteWorker = (workerId, token) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.delete(DELETE_WORKER_URL + workerId, config);
};

export const deleteCar = (carId, token) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.delete(DELETE_CAR_URL + carId, config);
};

export const getOrders = (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_ORDERS_URL + userId, config);
};

export const changePassword = (formData, token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  return axios.post(CHANGE_PASSWORD_URL, formData, config);
};


export const getFreeEvents = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_FREE_EVENTS_URL, config);
};


export const getCalendar = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(GET_CALENDAR_URL, config);
};