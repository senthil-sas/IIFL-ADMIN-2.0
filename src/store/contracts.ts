import { httpService } from '../services/httpservices'

export interface ContractsState {
  contractDetails: Record<string, unknown>[]
  isLoading: boolean
}

export const contractsModule = {
  namespaced: true,
  state: (): ContractsState => ({
    contractDetails: [],
    isLoading: false,
  }),
  mutations: {
    setContractDetails(state: ContractsState, payload: Record<string, unknown>[]) {
      state.contractDetails = payload
    },
    setIsLoading(state: ContractsState, val: boolean) {
      state.isLoading = val
    },
  },
  actions: {
    async getContractDetails({ commit }: { commit: (m: string, p?: unknown) => void }) {
      commit('setIsLoading', true)
      try {
        const resp = await httpService.contractDetails()
        const result = resp.data?.result
        if (
          resp.status === 200 &&
          Array.isArray(result) &&
          result.length &&
          Array.isArray(result[0]?.result) &&
          result[0].result.length
        ) {
          commit('setContractDetails', result[0].result)
        } else {
          commit('setContractDetails', [])
        }
      } catch {
        commit('setContractDetails', [])
      } finally {
        commit('setIsLoading', false)
      }
    },
  },
  getters: {
    getContractDetails: (state: ContractsState) => state.contractDetails,
    getIsLoading: (state: ContractsState) => state.isLoading,
  },
}
