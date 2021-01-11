import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__icons'>
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-brand-facebook'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
          </svg>
        </div>
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-brand-github'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5' />
          </svg>
        </div>
      </div>
      <div className='sidebar__contact'>
        <span>call at (+63) 935 221 3921</span>
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-phone-call'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
            <path d='M15 7a2 2 0 0 1 2 2' />
            <path d='M15 3a6 6 0 0 1 6 6' />
          </svg>
        </div>
      </div>
      <div className='sidebar__email'>
        <span>johnallendechavez23@gmail.com</span>
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='icon icon-tabler icon-tabler-mail'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#ffffff'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <rect x='3' y='5' width='18' height='14' rx='2' />
            <polyline points='3 7 12 13 21 7' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
