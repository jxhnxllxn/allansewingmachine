import { gsap } from 'gsap'
const toggleScrollbar = y => {
  setTimeout(
    () => {
      gsap.to('html', {
        duration: 0,
        css: { overflowY: y ? 'auto' : 'hidden' }
      })
    },
    y ? 800 : 0
  )
}

export default toggleScrollbar
