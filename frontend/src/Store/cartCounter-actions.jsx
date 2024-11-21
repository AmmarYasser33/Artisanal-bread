import axios from "axios";
import { cartActions } from "./cartCounter-slice";
import { BASE_API_URL } from "../util/Globals";

const fetchCartCounter = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_API_URL}cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(cartActions.setCounter(response.data.numberOfItems || 0));
    } catch (error) {
      dispatch(cartActions.setCounter(0));
      // console.error("fetchCartCounter error:", error);
    }
  };
};

export default fetchCartCounter;
