import { useEffect } from 'react'
const useCartToggleAnimation = (tl) => {
  useEffect(() => {
    tl.to('.nav__listBottom ul li', {
      autoAlpha: 0,
      x: -100,
      ease: 'power5.in',
      stagger: {
        amount: 0.2,
      },
    })

      .from('.sidenav', {
        x: '200',
        duration: 0.3,
        autoAlpha: 0,
      })

      .reverse()
    // eslint-disable-next-line
  }, [])
}

export default useCartToggleAnimation
