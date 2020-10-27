import { gsap } from 'gsap'

// hides and shows scrollbar
const toggleScrollbar = menuIsOpen => {
  setTimeout(
    () => {
      gsap.to('body', {
        duration: 0,
        css: { overflowY: menuIsOpen ? 'auto' : 'hidden' }
      })
    },
    menuIsOpen ? 800 : 0
  )
}

export default toggleScrollbar
