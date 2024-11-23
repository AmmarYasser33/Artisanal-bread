import axios from "axios";
import { BASE_API_URL } from "./Globals";

const baseServerUrl = BASE_API_URL;

// Auth

export const authFormsHandler = async ({ type, formData, method }) => {
  try {
    let response = null;
    if (method === "put") {
      response = await axios.put(
        // `${baseServerUrl}auth/resetPassword`,
        `${baseServerUrl}auth/${type}`,
        formData,
      );
    } else {
      response = await axios.post(`${baseServerUrl}auth/${type}`, formData);
    }
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error.message;
  }
};

// Categories

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseServerUrl}categories`);

    return response.data;
  } catch (error) {
    return error;
  }
};

// Products

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseServerUrl}products`);

    return response.data;
  } catch (error) {
    return error;
  }
};

// Cart

export const getCart = async (token) => {
  try {
    const response = await axios.get(`${baseServerUrl}cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addToCart = async (token, productId) => {
  try {
    const response = await axios.post(
      `${baseServerUrl}cart`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCartItem = async (token, itemId) => {
  try {
    const response = await axios.delete(`${baseServerUrl}cart/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCartItem = async (token, itemId, quantity) => {
  try {
    const response = await axios.put(
      `${baseServerUrl}cart/${itemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
