import { createStore, Store, useStore as baseUseStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { TweaksState } from '../types'

export interface RootState {
  tweaks: TweaksState
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
  },
})

// Typed convenience hook — components call useStore() with no args.
export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
