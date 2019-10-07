import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

let blocks = [
  {
    blockId: 1,
    iconLabel: 'GG',
    x: 20,
    y: 10
  },
  {
    blockId: 2,
    iconLabel: 'GF',
    x: 120,
    y: 10
  },
  {
    blockId: 3,
    iconLabel: 'Po',
    x: 220,
    y: 10
  },
  // {
  //   blockId: 4,
  //   iconLabel: 'KK',
  //   x: 320,
  //   y: 10
  // },
]


export default new Vuex.Store({
// export const store = new Vuex.Store({
  state: {
    // blocks: {},
    blocks: blocks,
    links: [],
    nextBlockId: 4,
    nextLinkId: 1
  },

  mutations: {
    addBlock(state, block){
      state.blocks.push(block)
      // state.blocks[state.nextBlockId] = block // Hash に追加の場合は算術プロパティが発火しない this.$set?
      ++state.nextBlockId
    },

    selectedBlock: function(state, blockId) {
      return state.blocks.find(block => block.blockId === blockId)
    },

    removeBlock(state, blockId){
      let index = state.blocks.findIndex(block => block.blockId === blockId)
      if(index >= 0) {
        state.blocks.splice(index, 1)
      }
    },

    updateBlockPosition(state, blockInfo){
      let selectedBlock = state.blocks.find(block => block.blockId === blockInfo.blockId)
      selectedBlock.x = blockInfo.x;
      selectedBlock.y = blockInfo.y;
    },

    incrementNextLinkId(state){
      ++state.nextLinkId
    }
  },

  getters: {
    getNextBlockId(state) {
      return state.nextBlockId
    },

    getNextLinkId(state){
      return state.nextLinkId
    },

    getBlock: function(state) {
      return function(blockId) {
        return state.blocks.find(block => block.blockId === blockId)
      }
    },
  },

  // modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
