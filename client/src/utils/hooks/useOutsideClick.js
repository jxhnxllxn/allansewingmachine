import { useEffect } from 'react'

const useOutsideClick = (ref, event, callback) => {
  const handleClick = e => {
    if (
      e.target.className === 'close-icon' ||
      e.target.id === 'add_icon' ||
      ref.filter(r => r.current.contains(e.target)).length > 0
    ) {
      return
    }

    callback()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)

    // eslint-disable-next-line
  }, [...event])
}

export default useOutsideClick
