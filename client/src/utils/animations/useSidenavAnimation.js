import { useEffect } from 'react'

const useCartToggleAnimation = tl => {
  useEffect(() => {
    tl.to('html', {
      duration: 0,
      css: { overflowY: 'hidden'}
    })
    .from('.sidenav-layout', {
      x: '50',
      duration: 0.3,
      autoAlpha: 0,
    }).reverse()
    // eslint-disable-next-line
  }, [])
}

export default useCartToggleAnimation
