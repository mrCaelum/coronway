/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from 'vuex-persist'

// Store functionality
import modules from './modules'
const vuexPersist = new VuexPersist({

  key: 'Coronway',
  storage: localStorage
})

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules,
  plugins: [vuexPersist.plugin]
})

export default store
