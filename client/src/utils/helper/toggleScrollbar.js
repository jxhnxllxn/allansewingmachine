import { gsap } from 'gsap'

// hides and shows scrollbar
const toggleScrollbar = (isO) => {
  setTimeout(
    () => {
      gsap.to('html', {
        duration: 0,
        css: { overflowY: isO ? 'auto' : 'hidden' },
      })
    },
    isO ? 500 : 0
  )
}

export default toggleScrollbar
