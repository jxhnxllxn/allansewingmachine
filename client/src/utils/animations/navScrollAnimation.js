import { useEffect } from 'react'

const NavScrollAnimation = (tl) => {
  useEffect(() => {
    tl.from('.header', {
      duration: 0.5,
      x: '200',
    })
    // eslint-disable-next-line
  }, [])
}

export default NavScrollAnimation
