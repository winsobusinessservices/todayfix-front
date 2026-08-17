import api from "./axiosClient";

export const getAddresses = async () => {
  return await api.get("/api/auth/addresses/").then((data) => data.data);
};

export const getSingleAddress = async (addressId) => {
  return await api
    .get(`/api/auth/addresses/${addressId}/`)
    .then((data) => data.data);
};

export const deleteAddress = async (addressId) => {
  return await api
    .delete(`/api/auth/addresses/${addressId}/delete/`)
    .then((data) => data.data);
};

export const updateAddress = async ({ addressId, addressData }) => {
  return await api
    .post(`/api/auth/addresses/${addressId}/update/`, addressData)
    .then((data) => data.data);
};

export const createAddress = async (addressData) => {
  return await api
    .post(`/api/auth/addresses/create/`, addressData)
    .then((data) => data.data);
};
