import type { Module } from 'vuex'
import type { RootState } from './index'
import { httpService } from '../services/httpservices'

export interface AccessLogState {
  clickhouseV2LogDetails: any
  clickhouseV2Loader: boolean
}

export const accessLogModule: Module<AccessLogState, RootState> = {
  namespaced: true,

  state: (): AccessLogState => ({
    clickhouseV2LogDetails: '',
    clickhouseV2Loader: false,
  }),

  getters: {
    getClickhouseV2LogDetails: (state) => state.clickhouseV2LogDetails,
    getClickhouseV2Loader: (state) => state.clickhouseV2Loader,
  },

  mutations: {
    setClickhouseV2LogDetails(state, payload: any) {
      state.clickhouseV2LogDetails = payload
    },
    setClickhouseV2Loader(state, payload: boolean) {
      state.clickhouseV2Loader = payload
    },
  },

  actions: {
    async getClickhouseV2LogDetails({ commit }, payload: any) {
      commit('setClickhouseV2Loader', true)
      try {
        const { status, data } = await httpService.getClickhouseAccessLogV2(payload)
        if (status === 200 && data.status?.toString().trim() === 'Ok' && data.result?.length > 0) {
          commit('setClickhouseV2LogDetails', data.result)
        } else {
          commit('setClickhouseV2LogDetails', data.message || 'No Records Found')
        }
      } catch (error: any) {
        console.error('[accessLog]', error)
      } finally {
        commit('setClickhouseV2Loader', false)
      }
    },
  },
}
