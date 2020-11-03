import { useEffect } from 'react'

const useMenuToggleAnimation = tl => {
  useEffect(() => {
    tl.to(
      'body, header',
      {
        duration: 0.6,
        background: 'rgb(34,34,34)'
      },
      0
    )
      .to(
        '.menu span',
        {
          y: 0
        },
        0
      )

      .to(
        'svg',
        {
          filter: 'invert(100%)'
        },
        0
      )

      .to(
        'header, .brand',
        {
          color: 'white'
        },
        0
      )

      .to(
        '.page-wrapper, footer',
        {
          autoAlpha: 0
        },
        0
      )
      .from(
        '.menu-content',
        {
          autoAlpha: 0
        },
        0
      )

      .reverse()
    // eslint-disable-next-line
  }, [])
}

export default useMenuToggleAnimation
