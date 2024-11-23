import axios from "axios";
import { profileActions } from "./profileInfo-slice";
import { BASE_API_URL } from "../util/Globals";

const fetchProfileData = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_API_URL}users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = response.data;
      dispatch(profileActions.setProfileInfo(res.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default fetchProfileData;
