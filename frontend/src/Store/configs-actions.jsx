import axios from "axios";
import { configActions } from "./configs-slice";
import { BASE_API_URL } from "../util/Globals";

const findConfigByKey = (arr, targetKey) => {
  return Array.isArray(arr)
    ? arr.find((config) => config.key === targetKey)
    : undefined;
};

const fetchConfigs = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_API_URL}configs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = response.data;

      dispatch(
        configActions.setIntroVideo(
          findConfigByKey(res?.data, "INTRO_VIDEO_URL")?.value,
        ),
      );
      dispatch(
        configActions.setAboutVideo(
          findConfigByKey(res?.data, "ABOUT_VIDEO_URL")?.value,
        ),
      );
      dispatch(
        configActions.setAchievementsExperience(
          findConfigByKey(res?.data, "ACHIEVEMENTS_EXPERIENCE")?.value,
        ),
      );
      dispatch(
        configActions.setAchievementsProfessionals(
          findConfigByKey(res?.data, "ACHIEVEMENTS_PROFESSIONALS")?.value,
        ),
      );
      dispatch(
        configActions.setAchievementsProducts(
          findConfigByKey(res?.data, "ACHIEVEMENTS_PRODUCTS")?.value,
        ),
      );
      dispatch(
        configActions.setAchievementsOrders(
          findConfigByKey(res?.data, "ACHIEVEMENTS_ORDERS")?.value,
        ),
      );
      dispatch(
        configActions.setAddress(findConfigByKey(res?.data, "ADDRESS")?.value),
      );
      dispatch(
        configActions.setPhone(findConfigByKey(res?.data, "PHONE")?.value),
      );
      dispatch(
        configActions.setEmail(findConfigByKey(res?.data, "EMAIL")?.value),
      );
      dispatch(
        configActions.setLocationLink(
          findConfigByKey(res?.data, "LOCATION_LINK")?.value,
        ),
      );
      dispatch(
        configActions.setXCoordinate(
          findConfigByKey(res?.data, "X_COORDINATE")?.value,
        ),
      );
      dispatch(
        configActions.setYCoordinate(
          findConfigByKey(res?.data, "Y_COORDINATE")?.value,
        ),
      );
      dispatch(
        configActions.setFacebook(
          findConfigByKey(res?.data, "FACEBOOK")?.value,
        ),
      );
      dispatch(
        configActions.setWhatsapp(
          findConfigByKey(res?.data, "WHATSAPP")?.value,
        ),
      );
      dispatch(
        configActions.setInstagram(
          findConfigByKey(res?.data, "INSTAGRAM")?.value,
        ),
      );
      dispatch(
        configActions.setYoutube(findConfigByKey(res?.data, "YOUTUBE")?.value),
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export default fetchConfigs;
