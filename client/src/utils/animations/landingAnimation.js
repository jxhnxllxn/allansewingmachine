import { gsap } from 'gsap'
const tl = gsap.timeline()

const landingAnimation = () =>
  tl
  .to('.dark-screen', {
    delay: 0.4,
    duration: 1,
    autoAlpha: 0,
    ease: 'power4.in',
    // onComplete: () => gsap.to('body', { css: { overflowY: 'auto' } })
  }).reverse()

export default landingAnimation
