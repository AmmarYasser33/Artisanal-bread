import { createSlice } from "@reduxjs/toolkit";

const configsSlice = createSlice({
  name: "configs",
  initialState: {
    introVideo: "",
    achievementsExperience: "",
    achievementsProfessionals: "",
    achievementsProducts: "",
    achievementsOrders: "",
  },
  reducers: {
    setIntroVideo(state, action) {
      state.introVideo = action.payload;
    },
    setAchievementsExperience(state, action) {
      state.achievementsExperience = action.payload;
    },
    setAchievementsProfessionals(state, action) {
      state.achievementsProfessionals = action.payload;
    },
    setAchievementsProducts(state, action) {
      state.achievementsProducts = action.payload;
    },
    setAchievementsOrders(state, action) {
      state.achievementsOrders = action.payload;
    },
  },
});

export default configsSlice;
export const configActions = configsSlice.actions;
