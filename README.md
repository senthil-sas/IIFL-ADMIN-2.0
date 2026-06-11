# Aliceblue / CodiFi Admin Portal — Vue 3 + TypeScript + Vuex

This is the working **foundation** ported from the original React prototype. The app
shell, routing, store, layout, and icon system are complete and the project builds
clean (`vue-tsc` + Vite). The 11 view bodies are stubbed and ready to port one by one.

## Stack
- Vue 3 (`<script setup lang="ts">`)
- Vite 5
- Vue Router 4
- Vuex 4 (typed `InjectionKey` pattern)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (vue-tsc) + production build
```

You should see the sidebar, topbar, working navigation between all 11 routes, the
Space Grotesk fonts, and the collapse toggle persisting to localStorage.

## What's done

```
src/
  main.ts                       entry; wires router + Vuex store + global CSS
  App.vue                       shell: sidebar + main + topbar, collapse persistence
  vuex-shim.d.ts                makes Vuex 4 types resolve under Bundler moduleResolution
  assets/
    styles.css                  full original stylesheet (token-based), font URLs fixed
    fonts/*.woff2               Space Grotesk (latin / latin-ext / vietnamese)
  types/index.ts                ViewId, NavItem, PageMeta, TweaksState
  data/nav.ts                   NAV_GROUPS + PAGE_TITLES (verbatim from source)
  store/index.ts                Vuex store, namespaced `tweaks` module + typed useStore()
  router/index.ts               11 routes; route `name` === old `active` string
  components/
    Icon.vue                    renders one of 45 icons via v-html
    icon-paths.ts               icon SVG map (auto-converted from the React Icon comp)
    layout/Sidebar.vue          nav + brand + profile chip
    layout/Topbar.vue           breadcrumbs + search + actions
    layout/PageHeader.vue       per-route title/subtitle + `actions` slot
  views/*.vue                   11 STUBS — port these next
```

## Status: all 11 views ported

Every view is fully ported from the original prototype and the project builds clean
(`vue-tsc` + Vite). Nothing remains stubbed.

```
[DONE] Dashboard         (Login Analytics / System Health / Daily Actions tabs,
                          interactive login chart, KPI strip, analytics cards)
[DONE] Login Insights    (funnel, dual-ring device donut, module origin donut,
                          top traders, top F&O, rejection analysis + hover charts)
[DONE] Client Management (filters, search, bulk select, 7-tab detail drawer)
[DONE] Portfolio         (Holdings/Positions/Market Watch, advanced filter modal,
                          range sliders, holdings + positions drawers, upload modal)
[DONE] Funds, SIP, Reports, Operations, Communications, Infrastructure, Settings
```

### Component layout
```
src/
  components/
    charts/   LoginAnalysisChart MinuteLoginBars HourlyHeatmap SystemStatus
              ActivityFeed LoginAnalyticsExtra CustomerFunnelSection DevicesSection
              ModuleOriginSection TopTradersSection TopFnoSection
              RejectionAnalysisSection Gauge
    drawers/  ClientDetailPanel SipDetailDrawer HoldingsDetailDrawer UploadDataModal
    Icon.vue  KpiStrip.vue  CodifiFoot.vue  RangeSlider.vue
  data/       nav clients clientTabs sips portfolio systemStatus loginData avatar
  views/      11 view SFCs
  store/      Vuex tweaks module
  router/     11 routes
```

### Notes on fidelity
- The interactive Login Analysis chart, dual-ring device donut, module-origin donut,
  and rejection hourly-trend chart all keep the original hand-drawn SVG math and
  hover tooltips — no chart library was introduced.
- Where the original used `Math.random()` at render time (Infra uptime, system-health
  tiles, login heatmap), values are generated once so they don't re-jitter on every
  re-render.
- `window.__loginTweaks` reads are served from the Vuex `tweaks` store; the chart's
  Insights button navigates via Vue Router.
- The `_source-reference/` folder retains the original extracted JSX for comparison.
