import cookie from 'vux/src/tools/cookie/index.js'
import { version } from '@/../package.json'
import { checkSharedArrayBufferSupport } from '@/ai/util'

export const FREESTYLE = 0,
  STANDARD = 1,
  RENJU = 2

export const CONFIGS = ['config-default.toml', 'config-210901.toml', 'config-220723.toml']

function getDefaultThreadNum() {
  return checkSharedArrayBufferSupport()
    ? Math.max(Math.floor(navigator.hardwareConcurrency / 2), 1)
    : 1
}

const state = {
  language: null,
  boardStyle: {
    boardColor: '#F4D03F',
    boardColorXO: 'rgba(255, 255, 255, 0.35)',
    lineColor: '#000000',
    lineWidth: 0.03,
    coordColor: '#000000',
    coordFontStyle: '',
    coordFontFamily: 'sans-serif',
    starRadiusScale: 0.1,
    pieceBlack: '#000000',
    pieceWhite: '#FFFFFF',
    pieceStrokeWidth: 0.021,
    pieceStrokeBlack: '#000000',
    pieceStrokeWhite: '#000000',
    pieceStrokeWidthXO: 0.15,
    pieceStrokeX: '#0000FF',
    pieceStrokeO: '#FF3300',
    pieceScale: 0.95,
    indexColorBlack: '#FFFFFF',
    indexColorWhite: '#000000',
    indexColorX: '#FBE5C8',
    indexColorO: '#000000',
    indexFontStyle: 'bold',
    indexFontFamily: 'sans-serif',
    indexScale: 0.45,
    indexScaleXO: 0.3,
    lastStepColor: '#E74C3C',
    lastStepScale: 0.15,
    winlineWidth: 0.12,
    winlineColor: '#2E86C1',
    bestMoveColor: '#E74C3C',
    thinkingMoveColor: '#3FF476',
    thoughtMoveColor: '#3C5EE7',
    lostMoveColor: '#FDFEFE',
    bestMoveScale: 0.12,
    realtimeMoveScale: 0.09,
    selectionStrokeWidth: 0.08,
    selectionStrokeColor: '#E74C3C',
    forbidStrokeWidth: 0.12,
    forbidStrokeColor: '#E74C3C',
    pvEvalFontStyle: 600,
    pvEvalFontFamily: 'sans-serif',
    pvEvalScale: 0.45,
    pvEvalAlpha: 0.9,
  },
  boardSize: 15,
  boardTheme: 0, // 0 là bàn cờ Caro, 1 là bàn cờ Gomoku
  thinkTimeOption: 1,
  turnTime: 5000,
  matchTime: 9999000,
  maxDepth: 64,
  maxNodes: 0,
  rule: 0, // Quy tắc: 0- Không cấm tay; 1- Không cấm liên tục không thắng; 2, 4- Có cấm tay; 5- Không cấm một lượt trao đổi
  threads: getDefaultThreadNum(), // Số luồng (mặc định là số song song tối đa / 2)
  strength: 100, // Giới hạn sức mạnh (mặc định là 100% sức mạnh)
  nbest: 1, // Phân tích đa điểm MultiPV
  configIndex: CONFIGS.length - 1, // Chỉ số cấu hình: [0, CONFIGS.length)
  candRange: 3, // Phạm vi chọn điểm: {0, 1, 2, 3, 4, 5}
  hashSize: 256, // Kích thước bảng thay thế, đơn vị MiB
  pondering: false, // Tính toán nền
  clickCheck: 0, // Cách nhấp: 0- Đánh trực tiếp; 1- Xác nhận lần hai; 2- Nhấp trượt
  indexOrigin: 0, // Điểm bắt đầu số thứ tự quân cờ
  showCoord: true, // Hiển thị tọa độ
  showAnalysis: true, // Hiển thị phân tích
  showDetail: true, // Hiển thị chi tiết
  showPvEval: 0, // Có hiển thị giá trị ước tính thời gian thực hay không: 0- Không hiển thị; 1- Hiển thị giá trị ước tính; 2- Hiển thị tỷ lệ thắng
  showIndex: true,
  showLastStep: true,
  showWinline: true,
  showForbid: true,
  aiThinkBlack: false,
  aiThinkWhite: false,
}

const propertiesToSave = [
  'language',
  'boardSize',
  'boardTheme',
  'thinkTimeOption',
  'turnTime',
  'matchTime',
  'maxDepth',
  'maxNodes',
  'rule',
  'threads',
  'strength',
  'nbest',
  'configIndex',
  'candRange',
  'hashSize',
  'pondering',
  'clickCheck',
  'showCoord',
  'showAnalysis',
  'showDetail',
  'showPvEval',
  'showIndex',
  'showLastStep',
  'showWinline',
  'showForbid',
  'aiThinkBlack',
  'aiThinkWhite',
]

const boardPropertiesToSave = [
  'boardColor',
  'lastStepColor',
  'winlineColor',
  'bestMoveColor',
  'thinkingMoveColor',
  'thoughtMoveColor',
  'lostMoveColor',
]

const getters = {
  turnTime: (state) => {
    let turn = [state.turnTime, 7000, 40000, -1]
    return turn[state.thinkTimeOption]
  },
  matchTime: (state) => {
    let match = [state.matchTime, 180000, 900000, -1]
    return match[state.thinkTimeOption]
  },
  depth: (state) => {
    return state.thinkTimeOption == 0 ? state.maxDepth : 100
  },
  nodes: (state) => {
    return state.thinkTimeOption == 0 ? state.maxNodes : 0
  },
  gameRule: (state) => {
    switch (state.rule) {
      case 0:
      case 5:
        return FREESTYLE
      case 1:
        return STANDARD
      case 2:
      case 4:
        return RENJU
      default:
        throw Error('unknown rule')
    }
  },
}

function saveCookies() {
  let stateToSave = {}
  for (let p of propertiesToSave) stateToSave[p] = state[p]
  for (let p of boardPropertiesToSave) stateToSave[p] = state.boardStyle[p]
  cookie.set('GMKC_CFG_' + version, JSON.stringify(stateToSave), {
    raw: true,
    expires: 30,
  })
}

const mutations = {
  setValue(state, payload) {
    state[payload.key] = payload.value
    if (propertiesToSave.includes(payload.key)) saveCookies()
  },
  setValueNoSave(state, payload) {
    state[payload.key] = payload.value
  },
  setBoardStyle(state, payload) {
    state.boardStyle[payload.key] = payload.value
    if (boardPropertiesToSave.includes(payload.key)) saveCookies()
  },
  setBoardStyleNoSave(state, payload) {
    state.boardStyle[payload.key] = payload.value
  },
}

const actions = {
  readCookies({ commit }) {
    let json = cookie.get('GMKC_CFG_' + version)
    if (!json) return

    let stateToRead = JSON.parse(json)
    for (let p of propertiesToSave) commit('setValueNoSave', { key: p, value: stateToRead[p] })
    for (let p of boardPropertiesToSave)
      commit('setBoardStyleNoSave', { key: p, value: stateToRead[p] })
  },
  clearCookies() {
    cookie.remove('GMKC_CFG_' + version)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
