import { gsap } from 'gsap'

// hides and shows scrollbar
const toggleScrollbar = menuIsOpen => {
  setTimeout(
    () => {
      gsap.to('html', {
        duration: 0,
        css: { overflowY: menuIsOpen ? 'visible' : 'hidden'}
      })
    },
    menuIsOpen ? 800 : 0
  )
}

export default toggleScrollbar
