import { createSlice } from "@reduxjs/toolkit";

const configsSlice = createSlice({
  name: "configs",
  initialState: {
    introVideo: "",
    aboutVideo: "",
    achievementsExperience: "",
    achievementsProfessionals: "",
    achievementsProducts: "",
    achievementsOrders: "",
    address: "",
    phone: "",
    email: "",
    locationLink: "",
    xCoordinate: "",
    yCoordinate: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
    youtube: "",
  },
  reducers: {
    setIntroVideo(state, action) {
      state.introVideo = action.payload;
    },
    setAboutVideo(state, action) {
      state.aboutVideo = action.payload;
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
    setAddress(state, action) {
      state.address = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setXCoordinate(state, action) {
      state.xCoordinate = action.payload;
    },
    setYCoordinate(state, action) {
      state.yCoordinate = action.payload;
    },
    setLocationLink(state, action) {
      state.locationLink = action.payload;
    },
    setFacebook(state, action) {
      state.facebook = action.payload;
    },
    setWhatsapp(state, action) {
      state.whatsapp = action.payload;
    },
    setInstagram(state, action) {
      state.instagram = action.payload;
    },
    setYoutube(state, action) {
      state.youtube = action.payload;
    },
  },
});

export default configsSlice;
export const configActions = configsSlice.actions;
