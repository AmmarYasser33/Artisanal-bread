import { createSlice } from "@reduxjs/toolkit";

const configsSlice = createSlice({
  name: "configs",
  initialState: {
    shippingPrice: 0,
    introVideo: "",
    aboutVideo: "",
    achievementsExperience: "",
    achievementsProfessionals: "",
    achievementsProducts: "",
    achievementsOrders: "",
    arAddress: "",
    enAddress: "",
    arOpeningHours: "",
    enOpeningHours: "",
    phone: "",
    email: "",
    locationLink: "",
    xCoordinate: "",
    yCoordinate: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
  },
  reducers: {
    setShippingPrice(state, action) {
      state.shippingPrice = action.payload;
    },
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
    setArAddress(state, action) {
      state.arAddress = action.payload;
    },
    setEnAddress(state, action) {
      state.enAddress = action.payload;
    },
    setArOpeningHours(state, action) {
      state.arOpeningHours = action.payload;
    },
    setEnOpeningHours(state, action) {
      state.enOpeningHours = action.payload;
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
    setTiktok(state, action) {
      state.tiktok = action.payload;
    },
  },
});

export default configsSlice;
export const configActions = configsSlice.actions;
