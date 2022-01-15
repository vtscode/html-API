import { LISTVOICELANG, OBJSPEECH } from "./mutation-types";
export default {
  namespaced: true,
  state: {
    optSpeech: {
      volume: 1, // 0.1 sampai 1
      rate: 0.7, // 0.1 sampai 10
      pitch: 1, // 0 sampai 2
      voice: 'id-ID',
      text: ''
    },
    listVoiceLang: []
  },
  getters: {},
  mutations: {
    [OBJSPEECH] (state, payload) {
      console.log('payload ', payload)
      state.optSpeech = payload
    },
    [LISTVOICELANG] (state, payload) {
      console.log('payload ', payload)
      state.listVoiceLang = payload
    }
  },
  actions: {
    actionsObjSpeech ({ commit, state }, obj) {
      commit(OBJSPEECH, {...state.optSpeech, ...obj})
    },
    actionListVoicesLang ({ commit }, obj) {
      commit(LISTVOICELANG, obj.voices)
    },
  },
}
