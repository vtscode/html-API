import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import speech from "./speech";

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false });

const store = new Vuex.Store({
  modules:{
    speech
  },
  plugins: [
    createPersistedState({
      key: 'vuex-store',
      storage: {
        getItem: key => {
          if (process.env.NODE_ENV === 'production') {
            return ls.get(key)
          }
          return localStorage.getItem(key)
        },
        setItem: (key, value) => {
          if (process.env.NODE_ENV === 'production') {
            return ls.set(key, value)
          }
          return localStorage.setItem(key, value)
        },
        removeItem: key => {
          if (process.env.NODE_ENV === 'production') {
            return ls.remove(key)
          }
          return localStorage.removeItem(key)
        },
      },
    })
  ],
  strict: process.env.DEV,
})

export default store;