import React from 'react'
import { useEffect } from 'react'
import { lazyload } from 'react-lazyload'

const Footer = () => {
  useEffect(() => {
    lazyload({
      height: 200,
      once: true,
      offset: 100,
    })
  }, [])
  return (
    <footer className='footer-wrapper'>
      <div className='footer__credits'>
        <span>Allan Sewing Machines</span>
        <span>
          &copy;{new Date().getFullYear()}{' '}
          <a
            href='https://github.com/jhhhn'
            target='_blank'
            rel='noreferrer noopener'
          >
            jhhhn
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
