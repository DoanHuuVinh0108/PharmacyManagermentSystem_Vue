import { createStore } from "vuex";
import axios from "axios";
import VueCookies from 'vue-cookies'; // Import vue-cookies

const baseURL = "https://localhost:7194/api/Auth";

export default createStore({
  state: {
    accessToken: VueCookies.get("accessToken") || "", // Access token from cookies
    userId: localStorage.getItem("userId") || null,
    fullName: localStorage.getItem("fullName") || null,
    pharmacyId: localStorage.getItem("pharmacyId") || null,
    roles: JSON.parse(localStorage.getItem("roles")) || [], // JSON parse for roles array
  },
  mutations: {
    setAuthTokens(state, accessToken) {
      state.accessToken = accessToken;
      // Store in cookies
      VueCookies.set("accessToken", accessToken, "1d"); // Expiration for 1 day
    },
    clearAuthTokens(state) {
      state.accessToken = "";
      state.userId = null;
      state.fullName = null;
      state.roles = [];
      state.pharmacyId = null;
      // Clear cookies and localStorage
      VueCookies.remove("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("fullName");
      localStorage.removeItem("pharmacyId");
      localStorage.removeItem("roles");
    },
    setUserData(state, { userId, roles, pharmacyId, fullName }) {
      state.userId = userId;
      state.fullName = fullName;
      state.roles = roles;
      state.pharmacyId = pharmacyId;
      // Persist in localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("pharmacyId", pharmacyId);
      localStorage.setItem("roles", JSON.stringify(roles)); // Store array as JSON
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(baseURL + "/login", credentials, {
          withCredentials: true,
        });
        const { accessToken, userId, roles, pharmacyId, fullName } = response.data;

        // Store tokens and user data
        commit("setAuthTokens", accessToken);
        commit("setUserData", { userId, roles, pharmacyId, fullName });
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearAuthTokens");
    },
    initializeStore({ commit }) {
      // This can be used in the main Vue app entry to rehydrate the store if needed
      const accessToken = VueCookies.get("accessToken");
      if (accessToken) {
        commit("setAuthTokens", accessToken);
      }

      const userId = localStorage.getItem("userId");
      const fullName = localStorage.getItem("fullName");
      const pharmacyId = localStorage.getItem("pharmacyId");
      const roles = JSON.parse(localStorage.getItem("roles"));

      if (userId && roles && pharmacyId && fullName) {
        commit("setUserData", { userId, roles, pharmacyId, fullName });
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    accessToken: (state) => state.accessToken,
    userId: (state) => state.userId,
    roles: (state) => state.roles,
    fullName: (state) => state.fullName,
    pharmacyId: (state) => state.pharmacyId,
  },
});
