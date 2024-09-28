import Vue from 'vue'
import Vuex from 'vuex'
import ai from './modules/ai'
import position from './modules/position'
import settings from './modules/settings'
import { checkSharedArrayBufferSupport } from '@/ai/util'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ai,
    position,
    settings,
  },
  state: {
    screenWidth: document.documentElement.clientWidth, // Chiều rộng màn hình
    screenHeight: document.documentElement.clientHeight, // Chiều cao màn hình
    isOnIOSBrowser:
      (/iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !window.MSStream,
    hardwareConcurrency: checkSharedArrayBufferSupport() ? navigator.hardwareConcurrency : 1,
  },
  getters: {
    boardCanvasWidth(state) {
      const MinBoardWidth = 300
      const BottomPadding = 200
      return Math.max(
        Math.min(state.screenWidth, state.screenHeight - BottomPadding),
        MinBoardWidth
      )
    },
  },
  mutations: {
    setScreenSize(state, payload) {
      state.screenWidth = payload.width
      state.screenHeight = payload.height
    },
  },
  actions: {},
  strict: process.env.NODE_ENV !== 'production',
})
