import type { Module } from 'vuex'
import type { RootState } from './index'

export interface Tab {
  name: string
  id: number
  active: boolean
}

export interface TabsState {
  logsTabs: Tab[]
}

export const tabsModule: Module<TabsState, RootState> = {
  namespaced: true,

  state: (): TabsState => ({
    logsTabs: [
      { name: 'Clickhouse V2', id: 1, active: true },
    ],
  }),

  getters: {
    getLogsTabs: (state) => state.logsTabs,
  },

  mutations: {
    setActiveLogsTab(state, index: number) {
      state.logsTabs = state.logsTabs.map((t, i) => ({ ...t, active: i === index }))
    },
  },
}
