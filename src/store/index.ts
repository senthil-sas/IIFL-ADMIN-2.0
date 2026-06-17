import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { TweaksState, AuthState } from '../types'
import { authModule } from './auth'
import { accessLogModule } from './accesslog'
import { tabsModule } from './tabs'
import { contractsModule } from './contracts'
import type { AccessLogState } from './accesslog'
import type { TabsState } from './tabs'
import type { ContractsState } from './contracts'

export interface RootState {
  tweaks: TweaksState
  auth: AuthState
  accessLog: AccessLogState
  tabs: TabsState
  contracts: ContractsState
}

export const key: InjectionKey<Store<RootState>> = Symbol('store')

export const store = createStore<RootState>({
  modules: {
    tweaks: {
      namespaced: true,
      state: (): TweaksState => ({
        range: '24H',
        showAvg: true,
        fillToday: true,
        smooth: true,
        accent: '#4762E3',
        windowMin: 60,
        showRolling: true,
      }),
      mutations: {
        setTweak<K extends keyof TweaksState>(
          state: TweaksState,
          payload: { key: K; value: TweaksState[K] }
        ) {
          state[payload.key] = payload.value
        },
      },
    },
    auth: authModule,
    accessLog: accessLogModule,
    tabs: tabsModule,
    contracts: contractsModule,
  },
})

export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
