import axios from "axios";
// const baseServerUrl = process.env.REACT_APP_Base_API_URl;
const baseServerUrl = "http://localhost:3001/api/v1/";

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
