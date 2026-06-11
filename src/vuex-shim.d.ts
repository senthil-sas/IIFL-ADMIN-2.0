// Vuex 4 ships types under "types/index.d.ts" but its package.json "exports"
// map doesn't expose them to TypeScript's Bundler/NodeNext resolution.
// This shim points the compiler at the bundled declarations.
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
}
