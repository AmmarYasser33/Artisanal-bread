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

export const createCategory = async (token, formData) => {
  try {
    const response = await axios.post(`${baseServerUrl}categories`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (token, categoryId) => {
  try {
    const response = await axios.delete(
      `${baseServerUrl}categories/${categoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${baseServerUrl}products/${productId}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (token, formData) => {
  try {
    const response = await axios.post(`${baseServerUrl}products`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (token, productId, formData) => {
  try {
    const response = await axios.patch(
      `${baseServerUrl}products/${productId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    const response = await axios.delete(
      `${baseServerUrl}products/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

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
    throw error.response
      ? error.response.data
      : error.message || "An unexpected error occurred.";
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

// Orders

export const getOrders = async (token) => {
  try {
    const response = await axios.get(`${baseServerUrl}orders?sort=orderDate`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOrder = async (token, orderId) => {
  try {
    const response = await axios.get(`${baseServerUrl}orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (token, cartId, formData) => {
  try {
    const response = await axios.post(
      `${baseServerUrl}orders/${cartId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateOrderStatus = async (token, orderId, status) => {
  try {
    const response = await axios.put(
      `${baseServerUrl}orders/${orderId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const orderAgain = async (token, orderId) => {
  try {
    const response = await axios.post(
      `${baseServerUrl}orders/${orderId}/again`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const cancelOrder = async (token, orderId) => {
  try {
    const response = await axios.delete(`${baseServerUrl}orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Users

export const getMe = async (token) => {
  try {
    const response = await axios.get(`${baseServerUrl}users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateMe = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${baseServerUrl}users/updateMe`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${baseServerUrl}users/updateMyPassword`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// Users (Admin)

export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`${baseServerUrl}users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (token, userId) => {
  try {
    const response = await axios.get(`${baseServerUrl}users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(`${baseServerUrl}users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addAdmin = async (token, formData) => {
  try {
    const response = await axios.post(`${baseServerUrl}users/admin`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

// Courses

export const getCourses = async () => {
  try {
    const response = await axios.get(`${baseServerUrl}courses`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMyCourses = async (token) => {
  try {
    const response = await axios.get(`${baseServerUrl}courses/my-courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCourse = async (courseId) => {
  try {
    const response = await axios.get(`${baseServerUrl}courses/${courseId}`);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCompletedCourse = async (token, courseId) => {
  try {
    const response = await axios.get(
      `${baseServerUrl}courses/${courseId}/completed`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCourse = async (token, formData) => {
  try {
    const response = await axios.post(`${baseServerUrl}courses`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCourse = async (token, courseId, formData) => {
  try {
    const response = await axios.patch(
      `${baseServerUrl}courses/${courseId}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCourse = async (token, courseId) => {
  try {
    const response = await axios.delete(`${baseServerUrl}courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const enrollUser = async (token, courseId, formData) => {
  try {
    const response = await axios.post(
      `${baseServerUrl}courses/${courseId}/enroll`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
