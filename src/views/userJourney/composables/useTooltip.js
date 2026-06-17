import { ref, reactive } from 'vue'

export function useTooltip() {
  const ttVisible = ref(false)
  const ttPos = reactive({ x: 0, y: 0 })
  const ttEvent = ref(null)
  const ttSeq = ref(0)

  function showTooltip(mouseEvt, event, seq) {
    ttEvent.value = event
    ttSeq.value = seq
    ttVisible.value = true
    positionTooltip(mouseEvt)
  }

  function hideTooltip() { ttVisible.value = false }

  function positionTooltip(mouseEvt) {
    const x = mouseEvt.clientX
    const y = mouseEvt.clientY
    let l = x + 20
    let t = y - 60
    if (l + 310 > window.innerWidth) l = x - 325
    if (t < 8) t = y + 18
    if (t + 250 > window.innerHeight) t = window.innerHeight - 258
    ttPos.x = l
    ttPos.y = t
  }

  return { ttVisible, ttPos, ttEvent, ttSeq, showTooltip, hideTooltip, positionTooltip }
}
