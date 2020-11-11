import { useEffect } from 'react'

const useCartToggleAnimation = tl => {
  useEffect(() => {
    tl.from('.nav-icons', {
      x: '50',
      duration: 0.3,
      autoAlpha: 0,
    }).reverse()
    // eslint-disable-next-line
  }, [])
}

export default useCartToggleAnimation
