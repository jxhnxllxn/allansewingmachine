import { useEffect } from 'react'
const useSideNavToggleAnimation = (tl) => {
  useEffect(() => {
    tl.to('html', {
      duration: 0,
      css: { overflowY: 'hidden' },
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

export default useSideNavToggleAnimation
